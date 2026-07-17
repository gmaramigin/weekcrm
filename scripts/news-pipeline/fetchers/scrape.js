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

// Node fetch() nests the real network cause (ENOTFOUND, ECONNRESET, …) on
// err.cause; err.message is just "fetch failed". Flatten the chain so the
// retry-once in fetchHtmlStatic actually fires on transient failures.
function errorText(err) {
  const parts = [];
  for (let e = err, depth = 0; e && depth < 5; e = e.cause, depth++) {
    if (e.code) parts.push(String(e.code));
    if (e.message) parts.push(String(e.message));
  }
  return parts.join(' ');
}

function isTransientHttp(err) {
  return /timeout|abort|ECONNRESET|ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ETIMEDOUT|UND_ERR|socket|network|fetch failed|HTTP 5\d\d|HTTP 429/i
    .test(errorText(err));
}

// Returns { html, finalUrl }. finalUrl is the URL after redirects — listings
// routinely 301 to another host (goldmine.com → www.goldmine.com,
// liveagent.com/changelog → changelog.liveagent.com), and link extraction
// against the pre-redirect host rejects every article as cross-host.
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
    return { html: await res.text(), finalUrl: res.url || url };
  } finally {
    clearTimeout(t);
  }
}

async function fetchHtmlStatic(url) {
  try {
    return await fetchHtmlStaticOnce(url);
  } catch (err) {
    if (!isTransientHttp(err)) throw err;
    // Rate limits need a real pause; a 1.5s retry just 429s again.
    await new Promise(r => setTimeout(r, /HTTP 429/.test(errorText(err)) ? 8000 : 1500));
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

// Listing-path segments that mark a FILTERED VIEW of a blog (category page,
// tag page, …). Articles on such pages usually live under the parent content
// root (/blog/category/release/ lists articles at /blog/<slug>), so the strict
// prefix rule in tier 1 finds nothing on them.
const FILTER_SEGMENT = /\/(category|categories|tag|tags|topic|topics|label|labels|archive|section)(\/|$)/i;

// Hyphen count of a path's last segment (extension stripped). Real article
// slugs are multi-word ("mail-in-daylite-enhancements"); nav pages are short
// ("features", "product-tours").
function slugHyphens(pathname) {
  const seg = pathname.replace(/\/$/, '').split('/').pop() || '';
  return (seg.replace(/\.[a-z0-9]+$/i, '').match(/-/g) || []).length;
}

function extractArticleLinks(html, listingUrl) {
  const base = new URL(listingUrl);
  const basePath = base.pathname.replace(/\/$/, '');

  // Collect every same-host candidate once; tiers filter this list.
  const seen = new Set();
  const candidates = [];
  const re = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const abs = absolutize(m[1], listingUrl);
    if (!abs) continue;
    let u;
    try { u = new URL(abs); } catch { continue; }
    if (u.host !== base.host) continue;
    if (/\.(xml|rss|json|pdf|jpg|png|webp|svg|ico)$/i.test(u.pathname)) continue;
    if (/\b(page|tag|category|author|feed|rss|sitemap)\b/i.test(u.pathname)) continue;
    if (u.hash) u.hash = '';
    const key = u.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(u);
  }

  // Links strictly under `root`, minus listing loopbacks and year-archive nav.
  function underRoot(root) {
    const out = [];
    for (const u of candidates) {
      if (!u.pathname.startsWith(root + '/')) continue;
      if (u.pathname === root || u.pathname === root + '/') continue;
      // Skip listing loopbacks like /blog/default.aspx, /blog/index.html, /blog/
      const tail = u.pathname.slice(root.length + 1);
      if (/^(default\.(aspx|htm|html|php)|index\.(htm|html|php|aspx))$/i.test(tail)) continue;
      // Skip year-archive nav links like /changelog/2025, /changelog/2026/ — a
      // "browse by year" index page, not an article. These often render ahead
      // of the actual entries in the DOM, so without this they eat slots out of
      // the fixed MAX_ITEMS budget and can crowd out real (fresher) articles.
      if (/^\d{4}\/?$/.test(tail)) continue;
      out.push(u);
      if (out.length >= MAX_ITEMS * 3) break;
    }
    return out;
  }

  // Tier 1: articles under the listing path itself (strict — no slug heuristic,
  // changelog entries often have short slugs). A site-root listing has no path
  // to scope by — fall through to the tier-3 slug heuristic instead of
  // treating every nav link as an article.
  let links = basePath ? underRoot(basePath) : [];

  // Tier 2: filtered-view listing (category/tag/…) → look under the parent
  // content root, keeping only multi-word slugs so section indexes ("/blog/crm")
  // don't slip through.
  if (!links.length) {
    const filterMatch = basePath.match(FILTER_SEGMENT);
    if (filterMatch) {
      const contentRoot = basePath.slice(0, filterMatch.index).replace(/\/$/, '');
      if (contentRoot) {
        links = underRoot(contentRoot).filter(u => slugHyphens(u.pathname) >= 1);
      }
    }
  }

  // Tier 3: nothing under any usable root (articles at site root, or a filtered
  // view whose content root IS the site root). Only long hyphenated slugs
  // (3+ words) count — short nav paths like /product-tours/ stay excluded.
  if (!links.length) {
    links = underRoot('').filter(u => slugHyphens(u.pathname) >= 2);
  }

  return links.map(u => u.toString()).slice(0, MAX_ITEMS);
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

  // 3b. URL slug: /<month-name>-YYYY  (e.g. /product-updates/december-2025)
  m = url.match(/\/([A-Za-z]+)-(20\d{2})(?:[/?#-]|$)/);
  if (m) {
    const mon = MONTHS[m[1].toLowerCase()];
    if (mon !== undefined) return isoDate(m[2], String(mon + 1).padStart(2, '0'), '01');
  }

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

// Parse the first real date out of a blob of text. Handles "April 29, 2026",
// "May 19 2026", and "2026-04-29". Returns ISO (noon UTC) or null.
//
// Listing markup routinely concatenates rendered text with no separators
// ("…29, 2026April 23, 2026Automate…"), so the patterns anchor on letter/digit
// lookarounds rather than \b word boundaries — a trailing \b fails the moment a
// year is followed directly by a letter, which is exactly the common case here.
function parseDateFromText(text) {
  if (!text) return null;
  const wordRe = /(?<![A-Za-z])([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(20\d{2})(?!\d)/g;
  let m;
  while ((m = wordRe.exec(text))) {
    const mon = MONTHS[m[1].toLowerCase()];
    if (mon !== undefined) return isoDate(m[3], String(mon + 1).padStart(2, '0'), m[2].padStart(2, '0'));
  }
  const iso = text.match(/(?<!\d)(20\d{2})-(\d{2})-(\d{2})(?!\d)/);
  if (iso) return isoDate(iso[1], iso[2], iso[3]);
  return null;
}

// Read a date off a listing element: a <time datetime> descendant first
// (most reliable), then any date string in its text.
function dateFromElement(el) {
  const timeEl = el.querySelector && el.querySelector('time[datetime], time[dateTime]');
  if (timeEl) {
    const dt = timeEl.getAttribute('datetime') || timeEl.getAttribute('dateTime');
    const parsed = Date.parse(dt || '');
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  }
  return parseDateFromText(el.textContent || '');
}

// Many changelog / "what's new" pages show each entry's date on the index but
// NOT on the entry's own page (SPA changelog tools — Folk, Vendasta, …). The
// per-article scrape only ever sees the entry page, so that date is lost. This
// pass reads the listing once and maps each article URL → the date shown beside
// its link: walk up from the <a> and take the CLOSEST date. Closest-ancestor
// keeps each link on its own entry's date instead of a neighbour's.
const LISTING_DATE_MAX_DEPTH = 6;

function extractListingDates(html, listingUrl) {
  const map = new Map();
  if (!html) return map;
  let doc;
  try { doc = new JSDOM(html, { url: listingUrl }).window.document; }
  catch { return map; }

  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href) continue;
    let u;
    try { u = new URL(href, listingUrl); } catch { continue; }
    u.hash = '';
    const key = u.toString();
    if (map.has(key)) continue;
    let el = a;
    for (let depth = 0; el && depth <= LISTING_DATE_MAX_DEPTH; depth++, el = el.parentElement) {
      const date = dateFromElement(el);
      if (date) { map.set(key, date); break; }
    }
  }
  return map;
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
// `listingDate` is the date shown beside this URL on the index page — used as
// a fallback when the entry page itself exposes no date.
async function fetchAndExtract(url, getDynamic, listingDate) {
  let html = null;
  try { ({ html } = await fetchHtmlStatic(url)); } catch {}
  let article = html ? extractArticle(html, url) : null;
  let meta = html ? extractMeta(html) : {};

  if (!article || article.content.length < MIN_CONTENT_LEN) {
    try {
      const dyn = await getDynamic(url);
      if (dyn) {
        html = dyn.html;
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
    publishedAt: meta.publishedAt || listingDate || inferPublishedAt(url, title)
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
      return { html: await page.content(), finalUrl: page.url() };
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
    }
  }

  try {
    let listingHtml = null;
    // The listing may redirect (www, trailing slash, a whole rebrand) — links
    // must be resolved against where we actually LANDED, not the configured URL.
    let listingBase = listingUrl;
    try { ({ html: listingHtml, finalUrl: listingBase } = await fetchHtmlStatic(listingUrl)); } catch {}

    let urls = listingHtml ? extractArticleLinks(listingHtml, listingBase) : [];

    // SPA listing: no crawlable links statically → render with headless browser.
    if (!urls.length) {
      try {
        const dyn = await getDynamicHtml(listingUrl);
        if (dyn) {
          listingHtml = dyn.html;
          listingBase = dyn.finalUrl || listingBase;
          urls = extractArticleLinks(listingHtml, listingBase);
        }
      } catch (err) {
        console.warn(`  ⚠ scrape listing failed for ${listingUrl}: ${err.message}`);
      }
    }

    if (!urls.length) {
      console.warn(`  ⚠ no article links found on ${listingUrl}`);
      return [];
    }

    // Dates shown on the index page, keyed by article URL — recovers changelog
    // entries whose own pages carry no date.
    const listingDates = extractListingDates(listingHtml, listingBase);

    const results = await mapLimit(urls, CONCURRENCY, async url => {
      const full = await fetchAndExtract(url, getDynamicHtml, listingDates.get(url) || null);
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

module.exports = { fetchScrape, extractArticleLinks, extractListingDates, inferPublishedAt, isTransientHttp };
