// Sitemap fetcher — reads sitemap.xml and treats matching URLs as article index.
// Value format: "<sitemap_url>" or "<sitemap_url>#<path_prefix>" to filter.
//
// Example: sitemap:https://attio.com/sitemap.xml#/blog/
//
// For each matching URL it fetches the page and extracts og:title / og:description.

const { inferPublishedAt } = require('./scrape');

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

// Returns [{ url, lastmod }] — lastmod (ISO string or null) is the sitemap's
// own <lastmod> for that <url> block, the most reliable date a sitemap offers.
function parseSitemapUrls(xml) {
  const entries = [];
  const blockRe = /<url>([\s\S]*?)<\/url>/gi;
  let b;
  while ((b = blockRe.exec(xml))) {
    const loc = b[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/i);
    if (!loc) continue;
    const lastmod = b[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i);
    entries.push({ url: loc[1], lastmod: lastmod ? lastmod[1] : null });
  }
  if (entries.length) return entries;
  // Sitemap-index files (and odd generators) may not use <url> blocks — fall
  // back to bare <loc> scanning so we at least keep the previous behaviour.
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) entries.push({ url: m[1], lastmod: null });
  return entries;
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

  let entries = parseSitemapUrls(xml);
  if (prefix) {
    entries = entries.filter(e => {
      try { return new URL(e.url).pathname.startsWith(prefix); }
      catch { return false; }
    });
  }
  // trim index / empty paths
  entries = entries.filter(e => {
    try {
      const p = new URL(e.url).pathname.replace(/\/$/, '');
      return p !== '' && p !== prefix.replace(/\/$/, '');
    } catch { return false; }
  });

  // newest-first: trust <lastmod> ordering when present, else assume the
  // sitemap lists newest last and reverse.
  if (entries.some(e => e.lastmod)) {
    entries.sort((a, b) => Date.parse(b.lastmod || 0) - Date.parse(a.lastmod || 0));
    entries = entries.slice(0, MAX_ITEMS);
  } else {
    entries = entries.reverse().slice(0, MAX_ITEMS);
  }

  const results = await mapLimit(entries, CONCURRENCY, async ({ url, lastmod }) => {
    const html = await fetchText(url);
    const meta = extractMeta(html);
    return {
      title: meta.title,
      url,
      summary: meta.summary,
      // Explicit page meta wins; then the sitemap's own <lastmod>; then a date
      // encoded in the URL or title — so the freshness gate doesn't drop
      // everything as undated.
      publishedAt: meta.publishedAt || lastmod || inferPublishedAt(url, meta.title),
      sourceType: 'sitemap'
    };
  });

  return results.filter(r => r && !r.error && r.title && r.url);
}

module.exports = { fetchSitemap };
