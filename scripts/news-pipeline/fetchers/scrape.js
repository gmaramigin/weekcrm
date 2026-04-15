// HTML scrape fetcher. Given a listing page URL (blog/changelog index),
// extracts the top N article links, then visits each to pull title + summary.
//
// Returns normalized items: { title, url, summary, publishedAt, sourceType: 'scrape' }
//
// MVP strategy:
//   1. GET listing page
//   2. Collect anchor hrefs that live under the same base path, have an extra
//      path segment, and aren't pagination/anchor/file links.
//   3. Visit up to MAX_ITEMS of them (concurrency 4) and pull og:title/og:description.

const MAX_ITEMS = 8;
const CONCURRENCY = 4;
const UA = 'Mozilla/5.0 (compatible; WeekCRM-news-bot/1.0; +https://weekcrm.com)';

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml' },
    redirect: 'follow'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function absolutize(href, baseUrl) {
  try { return new URL(href, baseUrl).toString(); } catch { return null; }
}

function extractArticleLinks(html, listingUrl) {
  const base = new URL(listingUrl);
  const basePath = base.pathname.replace(/\/$/, '');
  const seen = new Set();
  const links = [];

  const re = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const abs = absolutize(m[1], listingUrl);
    if (!abs) continue;
    let u;
    try { u = new URL(abs); } catch { continue; }
    if (u.host !== base.host) continue;

    // must be deeper than the listing page itself
    if (!u.pathname.startsWith(basePath + '/')) continue;
    if (u.pathname === basePath || u.pathname === basePath + '/') continue;

    // skip obvious non-articles
    if (/\.(xml|rss|json|pdf|jpg|png|webp|svg|ico)$/i.test(u.pathname)) continue;
    if (/\b(page|tag|category|author|feed|rss|sitemap)\b/i.test(u.pathname)) continue;
    if (u.hash) u.hash = '';

    const key = u.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    links.push(key);
    if (links.length >= MAX_ITEMS * 3) break; // grab extras in case some 404
  }
  return links.slice(0, MAX_ITEMS);
}

function extractMeta(html) {
  const pick = re => { const m = html.match(re); return m ? decode(m[1].trim()) : ''; };
  const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
               || pick(/<meta[^>]+name=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  const title = ogTitle || pick(/<title[^>]*>([^<]+)<\/title>/i);
  const ogDesc = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  const metaDesc = ogDesc
    || pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const pub = pick(/<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i);
  return { title, summary: metaDesc, publishedAt: pub || null };
}

function decode(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      try { out[idx] = await fn(items[idx]); }
      catch (e) { out[idx] = { error: e.message, url: items[idx] }; }
    }
  });
  await Promise.all(workers);
  return out;
}

async function fetchScrape(listingUrl) {
  let listingHtml;
  try { listingHtml = await fetchHtml(listingUrl); }
  catch (err) {
    console.warn(`  ⚠ scrape listing failed for ${listingUrl}: ${err.message}`);
    return [];
  }

  const urls = extractArticleLinks(listingHtml, listingUrl);
  if (!urls.length) {
    // Fallback: treat the listing page itself as a single news pointer.
    // Many vendor changelogs/updates pages are JS-rendered SPAs with no
    // crawlable article links — we still want them in the DB so editors
    // can follow the link manually. publishedAt=now so it passes the 24h
    // gate on first run; Notion URL-dedupe prevents repeats after that.
    const meta = extractMeta(listingHtml);
    if (!meta.title) {
      console.warn(`  ⚠ no article links found on ${listingUrl}`);
      return [];
    }
    console.log(`    ↳ using listing page itself as fallback (${listingUrl})`);
    return [{
      title: meta.title,
      url: listingUrl,
      summary: meta.summary || `Latest product updates from ${new URL(listingUrl).host}. Visit the source for details.`,
      publishedAt: new Date().toISOString(),
      sourceType: 'scrape',
      _bypassProductFilter: true
    }];
  }

  const results = await mapLimit(urls, CONCURRENCY, async url => {
    const html = await fetchHtml(url);
    const meta = extractMeta(html);
    return {
      title: meta.title,
      url,
      summary: meta.summary,
      publishedAt: meta.publishedAt,
      sourceType: 'scrape'
    };
  });

  return results.filter(r => r && !r.error && r.title && r.url);
}

module.exports = { fetchScrape };
