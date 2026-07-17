// RSS / Atom feed fetcher. Returns a list of normalized news items:
//   { title, url, summary, publishedAt, sourceType: 'rss' }
//
// Resilient to individual feed failures — logs and returns [] for that feed.
// Uses a real browser User-Agent (many WAFs block default Node fetch) and
// retries once on transient failures (timeout, TLS reset, 5xx).

const Parser = require('rss-parser');
const parser = new Parser();

const FETCH_TIMEOUT_MS = 30000;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchFeedXml(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'Accept': 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5'
      },
      redirect: 'follow',
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

// Node's fetch() reports network failures as `TypeError: fetch failed` with the
// real cause (ENOTFOUND, ECONNRESET, UND_ERR_*, an AbortError, …) nested on
// err.cause. Testing only err.message misses every one of them — so the
// retry-once below never fired. Flatten the whole cause chain instead.
function errorText(err) {
  const parts = [];
  for (let e = err, depth = 0; e && depth < 5; e = e.cause, depth++) {
    if (e.code) parts.push(String(e.code));
    if (e.message) parts.push(String(e.message));
  }
  return parts.join(' ');
}

function isTransient(err) {
  return /timeout|abort|ECONNRESET|ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ETIMEDOUT|UND_ERR|socket|network|fetch failed|HTTP 5\d\d|HTTP 429/i
    .test(errorText(err));
}

// Normalize a parsed feed into news items. Pure — no network, no logging.
function mapFeedItems(feed) {
  return (feed.items || []).map(item => ({
    title: (item.title || '').trim(),
    url: item.link || item.guid || '',
    summary: stripHtml(item.contentSnippet || item.content || item.summary || ''),
    publishedAt: item.isoDate || item.pubDate || null,
    sourceType: 'rss'
  })).filter(i => i.url && i.title);
}

// A feed that stamps every item with one timestamp — its own regeneration
// time — gives no way to tell a new post from a years-old one. OTRS's
// "Release Notes Archive" feed does exactly this: ~29 release notes spanning
// multiple years all carry an identical pubDate. When 5+ dated items land
// within a few minutes of each other the dates are a bulk-stamp artifact,
// not real publication times. The freshness gate in run-daily.js trusts
// publishedAt, so trusting these dates floods drafts with stale releases —
// instead we drop the dates and let run-daily skip the items as undated.
const BULK_STAMP_MIN_ITEMS = 5;
const BULK_STAMP_WINDOW_MS = 10 * 60 * 1000;

function datesAreUnreliable(items) {
  const ts = items
    .map(i => Date.parse(i.publishedAt))
    .filter(n => !Number.isNaN(n));
  if (ts.length < BULK_STAMP_MIN_ITEMS) return false;
  return Math.max(...ts) - Math.min(...ts) < BULK_STAMP_WINDOW_MS;
}

async function fetchRss(url) {
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const xml = await fetchFeedXml(url);
      const feed = await parser.parseString(xml);
      const items = mapFeedItems(feed);
      if (datesAreUnreliable(items)) {
        console.warn(`  ⚠ ${url}: every item shares one timestamp ` +
          `(archive / bulk-generated feed) — dropping dates so stale items aren't drafted`);
        for (const i of items) i.publishedAt = null;
      }
      return items;
    } catch (err) {
      lastErr = err;
      if (attempt === 0 && isTransient(err)) {
        // Rate limits need a real pause; a 1.5s retry just 429s again.
        await new Promise(r => setTimeout(r, /HTTP 429/.test(errorText(err)) ? 8000 : 1500));
        continue;
      }
      break;
    }
  }
  console.warn(`  ⚠ RSS fetch failed for ${url}: ${errorText(lastErr)}`);
  return [];
}

function stripHtml(s) {
  return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

module.exports = { fetchRss, mapFeedItems, datesAreUnreliable, isTransient };
