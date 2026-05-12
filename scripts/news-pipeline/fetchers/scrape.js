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

const MAX_ITEMS = Number(process.env.SCRAPE_MAX_ITEMS) || 8;
const CONCURRENCY = 4;
const MIN_CONTENT_LEN = 300;
const MAX_CONTENT_LEN = 3500;
const STATIC_TIMEOUT_MS = 30000;
const DYNAMIC_TIMEOUT_MS = 45000;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function isTransientHttp(err) {
  const msg = String(err && err.message || '');
  return /timeout|aborted|ECONNRESET|socket|network|EAI_AGAIN|ETIMEDOUT|HTTP 5\d\d/i.test(msg);
}

async function fetchHtmlStaticOnce(url) {
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

async function fetchHtmlStatic(url) {
  try {
    return await fetchHtmlStaticOnce(url);
  } catch (err) {
    if (!isTransientHttp(err)) throw err;
    await new Promise(r => setTimeout(r, 1500));
    return await fetchHtmlStaticOnce(url);
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
    // Skip listing loopbacks like /blog/default.aspx, /blog/index.html, /blog/
    const tail = u.pathname.slice(basePath.length + 1);
    if (/^(default\.(aspx|htm|html|php)|index\.(htm|html|php|aspx))$/i.test(tail)) continue;

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

// Infer a publishedAt ISO date from the URL path or article title when the
// source doesn't expose a proper <meta article:published_time>. Handles the
// common patterns used by vendor blogs and forums (Telligent, WordPress, etc.).
const MONTHS = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
  sep: 8, sept: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11
};

function inferPublishedAt(url, title) {
  // 1. URL path: /YYYY/MM/DD/
  let m = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})(?:\/|\b)/);
  if (m) return isoDate(m[1], m[2], m[3]);

  // 2. URL path: /YYYY-MM-DD-   (common in slugs)
  m = url.match(/\/(\d{4})-(\d{2})-(\d{2})[-/]/);
  if (m) return isoDate(m[1], m[2], m[3]);

  // 3. URL path: /YYYY/MM/  → day 01
  m = url.match(/\/(\d{4})\/(\d{2})\//);
  if (m) return isoDate(m[1], m[2], '01');

  // 4. Title: "April 15, 2026" or "April 15th, 2026" (case-insensitive)
  if (title) {
    m = title.match(/([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
    if (m) {
      const mon = MONTHS[m[1].toLowerCase()];
      if (mon !== undefined) return isoDate(m[3], String(mon + 1).padStart(2, '0'), m[2].padStart(2, '0'));
    }
    // 5. Title: "2026-04-15"
    m = title.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) return isoDate(m[1], m[2], m[3]);
  }

  return null;
}

function isoDate(y, mo, d) {
  const dt = new Date(Date.UTC(+y, +mo - 1, +d, 12, 0, 0)); // noon UTC — avoid TZ edge
  return isNaN(dt.getTime()) ? null : dt.toISOString();
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
  // Fallback: <time dateTime="..."> in the article header. Many SPAs (Attio
  // changelog, Linear, Notion) don't emit article:published_time but do render
  // a <time> element. On entry pages the first <time> is the entry's own date.
  const timeDt = pick(/<time[^>]+date[Tt]ime=["']([^"']+)["']/i);
  return { title, summary: metaDesc, publishedAt: pub || timeDt || null };
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

  const title = article.title || meta.title || '';
  return {
    title,
    content: article.content,
    summary: meta.summary || article.excerpt || '',
    publishedAt: meta.publishedAt || inferPublishedAt(url, title)
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
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: DYNAMIC_TIMEOUT_MS });
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
          if (attempt === 0 && /Timeout|net::|ECONNRESET/i.test(err.message)) {
            await new Promise(r => setTimeout(r, 1500));
            continue;
          }
          throw err;
        }
      }
      if (lastErr) throw lastErr;
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
