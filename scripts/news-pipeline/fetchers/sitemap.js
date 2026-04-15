// Sitemap fetcher — reads sitemap.xml and treats matching URLs as article index.
// Value format: "<sitemap_url>" or "<sitemap_url>#<path_prefix>" to filter.
//
// Example: sitemap:https://attio.com/sitemap.xml#/blog/
//
// For each matching URL it fetches the page and extracts og:title / og:description.

const MAX_ITEMS = 12;
const CONCURRENCY = 4;
const UA = 'Mozilla/5.0 (compatible; WeekCRM-news-bot/1.0; +https://weekcrm.com)';

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xml,application/xhtml+xml' },
    redirect: 'follow'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseSitemapUrls(xml) {
  const urls = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1]);
  return urls;
}

function extractMeta(html) {
  const pick = re => { const m = html.match(re); return m ? decode(m[1].trim()) : ''; };
  const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  const title = ogTitle || pick(/<title[^>]*>([^<]+)<\/title>/i);
  const metaDesc = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
                || pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const pub = pick(/<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i)
           || pick(/<time[^>]*datetime=["']([^"']+)["']/i);
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
      catch (e) { out[idx] = { error: e.message }; }
    }
  });
  await Promise.all(workers);
  return out;
}

async function fetchSitemap(value) {
  const [sitemapUrl, prefix = ''] = value.split('#');
  let xml;
  try { xml = await fetchText(sitemapUrl); }
  catch (err) {
    console.warn(`  ⚠ sitemap fetch failed ${sitemapUrl}: ${err.message}`);
    return [];
  }

  let urls = parseSitemapUrls(xml);
  if (prefix) {
    urls = urls.filter(u => {
      try { return new URL(u).pathname.startsWith(prefix); }
      catch { return false; }
    });
  }
  // trim index / empty paths
  urls = urls.filter(u => {
    try {
      const p = new URL(u).pathname.replace(/\/$/, '');
      return p !== '' && p !== prefix.replace(/\/$/, '');
    } catch { return false; }
  });

  // newest-first heuristic: sitemaps often list newest last; reverse
  urls = urls.reverse().slice(0, MAX_ITEMS);

  const results = await mapLimit(urls, CONCURRENCY, async url => {
    const html = await fetchText(url);
    const meta = extractMeta(html);
    return {
      title: meta.title,
      url,
      summary: meta.summary,
      publishedAt: meta.publishedAt,
      sourceType: 'sitemap'
    };
  });

  return results.filter(r => r && !r.error && r.title && r.url);
}

module.exports = { fetchSitemap };
