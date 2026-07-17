// Repair pass: find every broken "News sources" line in the Notion Vendors DB
// and replace it with a VERIFIED working source.
//
//   node scripts/news-pipeline/_repair-sources.mjs           # dry run (report only)
//   node scripts/news-pipeline/_repair-sources.mjs --apply   # write to Notion
//
// A source line is considered broken when:
//   - scrape: of a bare homepage (path "/" — never a news listing)
//   - scrape: of a linkedin.com URL (blocked, unscrapable)
//   - the URL currently fails to fetch (probed live below)
//
// Candidate replacements, in preference order (first VERIFIED hit wins):
//   1. WordPress-style feed of the CURRENT page (<url>/feed/) — keeps the
//      curated category/tag scoping and gains dates.
//   2. Common feed paths on the vendor's website origin.
//   3. Changelog / product-update / blog listing pages that yield article
//      links via the (tiered) static extractor.
//
// Verification: feeds must parse with ≥1 item; scrape pages must yield ≥1
// article link statically. Nothing unverified is ever written.

import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const { Client } = require('@notionhq/client');
const Parser = require('rss-parser');
const { extractArticleLinks } = require('./fetchers/scrape');

// minimal .env.local loader (same as config.js)
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (!(k in process.env)) process.env[k] = v;
  }
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_VENDORS_DB_ID;
const APPLY = process.argv.includes('--apply');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const TIMEOUT = 8000;
const parser = new Parser();

const FEED_PATHS = [
  '/changelog/rss.xml', '/changelog/feed', '/changelog/rss', '/changelog.xml',
  '/blog/rss.xml', '/blog/feed/', '/blog/feed', '/blog/rss', '/blog/atom.xml', '/blog/index.xml',
  '/feed/', '/feed', '/rss.xml', '/rss', '/atom.xml', '/index.xml',
  '/news/rss', '/news/feed', '/news.xml',
  '/updates/rss', '/updates/feed',
  '/product-updates/feed/', '/product-updates/feed',
  '/whats-new/feed/', '/en/blog/feed/'
];

const SCRAPE_PATHS = [
  '/changelog', '/changelog/', '/product-updates', '/product-updates/',
  '/whats-new', '/whats-new/', '/updates', '/releases', '/release-notes',
  '/news', '/news/', '/blog', '/blog/'
];

async function get(url, accept) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': accept },
      redirect: 'follow',
      signal: ctrl.signal
    });
    if (!res.ok) return null;
    return { text: await res.text(), url: res.url, contentType: (res.headers.get('content-type') || '').toLowerCase() };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// A feed is valid when it parses and has ≥1 item with a link.
async function checkFeed(url) {
  const res = await get(url, 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5');
  if (!res) return null;
  const body = res.text.trimStart();
  if (!(body.startsWith('<?xml') || /<rss[\s>]|<feed[\s>]/i.test(body.slice(0, 2000)))) return null;
  try {
    const feed = await parser.parseString(res.text);
    const items = (feed.items || []).filter(i => i.link && i.title);
    if (!items.length) return null;
    const dated = items.filter(i => i.isoDate || i.pubDate).length;
    return { url, items: items.length, dated };
  } catch {
    return null;
  }
}

// A scrape page is valid when the static extractor finds ≥1 article link.
async function checkScrape(url) {
  const res = await get(url, 'text/html,application/xhtml+xml');
  if (!res) return null;
  if (!/html/.test(res.contentType)) return null;
  try {
    const links = extractArticleLinks(res.text, res.url);
    if (!links.length) return null;
    return { url, links: links.length };
  } catch {
    return null;
  }
}

function isJunk(source) {
  if (source.type !== 'scrape') return false;
  try {
    const u = new URL(source.value);
    if (/(^|\.)linkedin\.com$/i.test(u.host)) return true;
    if (u.pathname === '/' || u.pathname === '') return true;
    return false;
  } catch {
    return true;
  }
}

async function isCurrentlyWorking(source) {
  if (['rss', 'atom', 'feed'].includes(source.type)) return !!(await checkFeed(source.value));
  if (source.type === 'scrape') return !!(await checkScrape(source.value));
  return true; // x:/linkedin:/newsletter: declarations — not fetchable, leave alone
}

function candidateOrigins(website, sourceValue) {
  const origins = new Set();
  for (const raw of [sourceValue, website]) {
    if (!raw) continue;
    try {
      const u = new URL(raw);
      // Never probe linkedin.com — a hit there is LinkedIn's own site, not the vendor's.
      if (/(^|\.)linkedin\.com$/i.test(u.host)) continue;
      origins.add(u.origin);
      const host = u.host.startsWith('www.') ? u.host.slice(4) : 'www.' + u.host;
      origins.add(`${u.protocol}//${host}`);
    } catch { /* skip */ }
  }
  return [...origins];
}

// Hand-curated replacements (verified manually) for vendors where the
// automatic probe picks something too generic or wrong. Keyed by
// "<vendor name>||<broken source line>".
const OVERRIDES = new Map([
  // Generic microsoft.com — point at the actual Dynamics 365 product blog feed.
  ['Microsoft Dynamics||scrape:https://microsoft.com',
    { line: 'rss:https://www.microsoft.com/en-us/dynamics-365/blog/feed/', note: 'curated: Dynamics 365 blog feed' }],
  ['Dynamics 365||scrape:https://microsoft.com',
    { line: 'rss:https://www.microsoft.com/en-us/dynamics-365/blog/feed/', note: 'curated: Dynamics 365 blog feed' }],
  // The CRM-specific blog section (feed 500s; the all-Zoho blog is too broad).
  ['Zoho CRM||rss:https://www.zoho.com/blog/crm/feed',
    { line: 'scrape:https://www.zoho.com/blog/crm', note: 'curated: CRM blog section' }],
  // LinkedIn pages can't be scraped; keep the intent as a linkedin: declaration
  // (skipped gracefully) until that fetcher exists. Sellsy's blog is JS-only,
  // Ergo's site is unreachable.
  ['Sellsy||scrape:https://www.linkedin.com/company/sellsyapp/posts/?feedView=all',
    { line: 'linkedin:sellsyapp', note: 'curated: declaration until linkedin fetcher exists' }],
  ['Ergo.ai||scrape:https://www.linkedin.com/company/ergoai/posts/?feedView=all',
    { line: 'linkedin:ergoai', note: 'curated: declaration until linkedin fetcher exists' }],
]);

async function findReplacement(vendor, source) {
  // 0. Hand-curated override wins outright.
  const override = OVERRIDES.get(`${vendor.name}||${source.line}`);
  if (override) return override;

  // 1. WordPress category-feed trick: current page + /feed/
  if (source.type === 'scrape') {
    try {
      const cur = new URL(source.value);
      if (!/(^|\.)linkedin\.com$/i.test(cur.host) && cur.pathname !== '/') {
        const feedUrl = source.value.replace(/\/$/, '') + '/feed/';
        const hit = await checkFeed(feedUrl);
        if (hit) return { line: `rss:${hit.url}`, note: `category feed, ${hit.items} items (${hit.dated} dated)` };
      }
    } catch { /* skip */ }
  }

  const origins = candidateOrigins(vendor.website, source.value);

  // 2. Common feed paths (all origins, sequential paths — first hit wins)
  for (const origin of origins) {
    for (const p of FEED_PATHS) {
      const hit = await checkFeed(origin + p);
      if (hit) return { line: `rss:${hit.url}`, note: `${hit.items} items (${hit.dated} dated)` };
    }
  }

  // 3. Scrape-able listing pages
  for (const origin of origins) {
    for (const p of SCRAPE_PATHS) {
      const hit = await checkScrape(origin + p);
      if (hit) return { line: `scrape:${hit.url}`, note: `${hit.links} article links` };
    }
  }

  return null;
}

async function mapLimit(arr, limit, fn) {
  const out = new Array(arr.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, arr.length) }, async () => {
    while (i < arr.length) { const idx = i++; out[idx] = await fn(arr[idx], idx); }
  }));
  return out;
}

// ---- main ----

const pages = [];
let cursor;
do {
  const res = await notion.databases.query({ database_id: DB, start_cursor: cursor, page_size: 100 });
  pages.push(...res.results);
  cursor = res.has_more ? res.next_cursor : undefined;
} while (cursor);

const vendors = pages.map(page => {
  const p = page.properties;
  const name = (p.Name?.title || []).map(t => t.plain_text).join('').trim();
  const website = p.Website?.url || '';
  const text = (p['News sources']?.rich_text || []).map(t => t.plain_text).join('');
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const sources = lines.map(l => {
    const ci = l.indexOf(':');
    if (ci === -1) return { type: '', value: '', line: l };
    return { type: l.slice(0, ci).trim().toLowerCase(), value: l.slice(ci + 1).trim(), line: l };
  });
  return { pageId: page.id, name, website, lines, sources };
}).filter(v => v.sources.length);

console.error(`Loaded ${vendors.length} vendors with sources. Checking which are broken…`);

// Determine broken sources (junk shape, or live-probe fails)
const checks = [];
for (const v of vendors) {
  for (const s of v.sources) {
    if (['rss', 'atom', 'feed', 'scrape'].includes(s.type)) checks.push({ vendor: v, source: s });
  }
}

const brokenList = [];
await mapLimit(checks, 12, async ({ vendor, source }, idx) => {
  const junk = isJunk(source);
  const working = junk ? false : await isCurrentlyWorking(source);
  if (junk || !working) brokenList.push({ vendor, source, junk });
  if ((idx + 1) % 20 === 0) console.error(`  probed ${idx + 1}/${checks.length}`);
});

console.error(`\n${brokenList.length}/${checks.length} sources are broken. Searching for replacements…`);

const repairs = [];
await mapLimit(brokenList, 8, async ({ vendor, source, junk }, idx) => {
  const repl = await findReplacement(vendor, source);
  repairs.push({ vendor, source, junk, repl });
  console.error(`  [${idx + 1}/${brokenList.length}] ${vendor.name}: ${repl ? '✓ ' + repl.line : '✗ no replacement found'}`);
});

// Group per vendor and rewrite lines
const byVendor = new Map();
for (const r of repairs) {
  if (!byVendor.has(r.vendor.pageId)) byVendor.set(r.vendor.pageId, { vendor: r.vendor, items: [] });
  byVendor.get(r.vendor.pageId).items.push(r);
}

let updated = 0;
const unfixed = [];
for (const { vendor, items } of byVendor.values()) {
  const replBySourceLine = new Map();
  for (const r of items) {
    if (r.repl) replBySourceLine.set(r.source.line, r.repl.line);
    else unfixed.push({ vendor: vendor.name, line: r.source.line });
  }
  if (!replBySourceLine.size) continue;

  // Replace broken lines, then dedupe (a replacement may duplicate an existing line)
  const newLines = [...new Set(vendor.lines.map(l => replBySourceLine.get(l) || l))];
  updated++;
  console.log(`\n${vendor.name}`);
  console.log('  BEFORE:\n' + vendor.lines.map(l => '    ' + l).join('\n'));
  console.log('  AFTER:\n' + newLines.map(l => '    ' + l).join('\n'));

  if (APPLY) {
    await notion.pages.update({
      page_id: vendor.pageId,
      properties: { 'News sources': { rich_text: [{ text: { content: newLines.join('\n') } }] } }
    });
    console.log('  ✓ written to Notion');
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Broken sources found:   ${brokenList.length}`);
console.log(`Repaired (verified):    ${brokenList.length - unfixed.length}`);
console.log(`Vendors updated:        ${updated}${APPLY ? '' : ' (dry run — nothing written)'}`);
console.log(`Unfixable (manual):     ${unfixed.length}`);
for (const u of unfixed) console.log(`  - ${u.vendor}: ${u.line}`);

fs.writeFileSync('drafts/_repairs.json', JSON.stringify({ repairs: repairs.map(r => ({ vendor: r.vendor.name, before: r.source.line, after: r.repl?.line || null, note: r.repl?.note || null })), unfixed }, null, 2));
console.log('\nFull data → drafts/_repairs.json');
if (!APPLY) console.log('Dry run — re-run with --apply to write to Notion.');
