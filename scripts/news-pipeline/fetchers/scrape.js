// HTML scrape fetcher. Given a listing page URL (blog/changelog index),
// extracts the top N article links and pulls real article body text for each
// via Mozilla's Readability extractor. Falls back to a headless Chromium
// (Playwright) when static fetch produces thin content — handles SPA sites.
//
// Returns normalized items:
//   { title, url, summary, content, publishedAt, sourceType: 'scrape' }
//
// `content` is the cleaned article body (up to MAX_CONTENT_LEN chars) and
// is what the rewriter actually reasons over. `summary` is kept as a short
// fallback. Items whose extracted body is under MIN_CONTENT_LEN are dropped
// entirely — better to skip than to feed Claude fluff.

const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

const MAX_ITEMS = 8;
const CONCURRENCY = 4;
const MIN_CONTENT_LEN = 300;
const MAX_CONTENT_LEN = 3500;
const STATIC_TIMEOUT_MS = 15000;
const DYNAMIC_TIMEOUT_MS = 25000;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchHtmlStatic(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), STATIC_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml' },
      redirect: 'follow',
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

// Lazy-loaded Playwright. Missing module = graceful skip of dynamic fallback.
let _chromium = null;
async function getChromium() {
  if (_chromium === null) {
    try { _chromium = require('playwright').chromium; }
    catch { _chromium = false; }
  }
  return _chromium || null;
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

    if (!u.pathname.startsWith(basePath + '/')) continue;
    if (u.pathname === basePath || u.pathname === basePath + '/') continue;

    if (/\.(xml|rss|json|pdf|jpg|png|webp|svg|ico)$/i.test(u.pathname)) continue;
    if (/\b(page|tag|category|author|feed|rss|sitemap)\b/i.test(u.pathname)) continue;
    if (u.hash) u.hash = '';

    const key = u.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    links.push(key);
    if (links.length >= MAX_ITEMS * 3) break;
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

// Readability-based article extraction. Returns { title, content, excerpt } or null.
function extractArticle(html, url) {
  try {
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    if (!article) return null;
    const text = String(article.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_CONTENT_LEN);
    return {
      title: (article.title || '').trim(),
      content: text,
      excerpt: (article.excerpt || '').trim()
    };
  } catch {
    return null;
  }
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

// Try static fetch → readability; if body is thin, try a headless-browser
// fetch through the shared Playwright browser (lazy-initialized per run).
async function fetchAndExtract(url, getDynamic) {
  let html = null;
  try { html = await fetchHtmlStatic(url); } catch {}
  let article = html ? extractArticle(html, url) : null;
  let meta = html ? extractMeta(html) : {};

  if (!article || article.content.length < MIN_CONTENT_LEN) {
    try {
      const dyn = await getDynamic(url);
      if (dyn) {
        html = dyn;
        article = extractArticle(html, url);
        meta = extractMeta(html);
      }
    } catch (err) {
      console.warn(`  ⚠ dynamic fetch failed for ${url}: ${err.message}`);
    }
  }

  if (!article || article.content.length < MIN_CONTENT_LEN) return null;

  return {
    title: article.title || meta.title || '',
    content: article.content,
    summary: meta.summary || article.excerpt || '',
    publishedAt: meta.publishedAt || null
  };
}

async function fetchScrape(listingUrl) {
  // Per-run browser lifecycle: launch on first dynamic need, tear down at end.
  let browser = null;
  async function getDynamicHtml(url) {
    const chromium = await getChromium();
    if (!chromium) return null;
    if (!browser) {
      browser = await chromium.launch({ headless: true });
    }
    const context = await browser.newContext({ userAgent: UA });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: DYNAMIC_TIMEOUT_MS });
      // Give client-side rendering a beat to populate article bodies.
      await page.waitForTimeout(1200);
      return await page.content();
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
    }
  }

  try {
    let listingHtml = null;
    try { listingHtml = await fetchHtmlStatic(listingUrl); } catch {}

    let urls = listingHtml ? extractArticleLinks(listingHtml, listingUrl) : [];

    // SPA listing: no crawlable links statically → render with headless browser.
    if (!urls.length) {
      try {
        const dyn = await getDynamicHtml(listingUrl);
        if (dyn) {
          listingHtml = dyn;
          urls = extractArticleLinks(listingHtml, listingUrl);
        }
      } catch (err) {
        console.warn(`  ⚠ scrape listing failed for ${listingUrl}: ${err.message}`);
      }
    }

    if (!urls.length) {
      console.warn(`  ⚠ no article links found on ${listingUrl}`);
      return [];
    }

    const results = await mapLimit(urls, CONCURRENCY, async url => {
      const full = await fetchAndExtract(url, getDynamicHtml);
      if (!full) return null;
      return {
        title: full.title,
        url,
        summary: full.summary,
        content: full.content,
        publishedAt: full.publishedAt,
        sourceType: 'scrape'
      };
    });

    return results.filter(r => r && !r.error && r.title && r.url && r.content);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

module.exports = { fetchScrape };
