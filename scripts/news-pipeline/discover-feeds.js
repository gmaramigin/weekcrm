// Discovery pass: for every vendor in Notion that has no News sources,
// probe common feed paths under their Website URL, verify the response is
// real RSS/Atom, and write the hits back to Notion.
//
//   node scripts/news-pipeline/discover-feeds.js          # dry-run (report only)
//   node scripts/news-pipeline/discover-feeds.js --apply  # write results to Notion
//
// Probed paths (in order — first hit wins):
//   /changelog/rss.xml, /changelog/feed, /changelog/rss
//   /blog/rss.xml, /blog/feed, /blog/feed/, /blog/rss, /blog/atom.xml
//   /feed, /feed/, /rss, /rss.xml, /atom.xml
//   /news/rss, /news/feed
//   /updates/rss
//
// Only accepts responses whose body starts with <?xml and contains <rss or <feed,
// AND whose content-type is xml/rss/atom (not text/html — which many SPAs return
// as a 200 on every path).

const { Client } = require('@notionhq/client');
const config = require('./config');

const apply = process.argv.includes('--apply');
const notion = new Client({ auth: config.notion.token });
const UA = 'Mozilla/5.0 (compatible; WeekCRM-news-bot/1.0; +https://weekcrm.com)';
const TIMEOUT = 6000;
const CONCURRENCY = 15;

const PATHS = [
  '/changelog/rss.xml', '/changelog/feed', '/changelog/rss', '/changelog.xml',
  '/blog/rss.xml', '/blog/feed/', '/blog/feed', '/blog/rss', '/blog/atom.xml', '/blog/index.xml',
  '/feed/', '/feed', '/rss/', '/rss.xml', '/rss', '/atom.xml', '/index.xml',
  '/news/rss', '/news/feed', '/news.xml',
  '/updates/rss', '/updates/feed',
  '/product-updates/feed', '/product-updates/rss',
  '/whats-new/feed', '/whats-new/rss'
];

async function probe(url) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
      redirect: 'follow',
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if (!res.ok) return false;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!/xml|rss|atom/.test(ct)) return false;
    if (/html/.test(ct)) return false;
    const body = (await res.text()).slice(0, 500).toLowerCase();
    if (!body.startsWith('<?xml') && !body.includes('<rss') && !body.includes('<feed')) return false;
    return true;
  } catch {
    return false;
  }
}

function originFromWebsite(website) {
  try {
    const normalized = /^https?:\/\//i.test(website) ? website : `https://${website}`;
    const u = new URL(normalized);
    return `${u.protocol}//${u.host}`;
  } catch { return null; }
}

function normalizeLink(website) {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

async function findFeedForVendor(rawLink) {
  const link = normalizeLink(rawLink);
  // 1. If the Link itself looks like a feed URL, trust and probe it.
  if (/\.(xml|rss|atom)$|\/(feed|rss)(\/|$)/i.test(link) && await probe(link)) {
    return { type: 'rss', url: link };
  }

  // 2. Probe standard paths under the Link's origin.
  const origin = originFromWebsite(link);
  if (!origin) return null;
  for (const path of PATHS) {
    const url = origin + path;
    if (await probe(url)) return { type: 'rss', url };
  }

  // 3. Fallback: scrape the Link directly (often a changelog / updates page).
  return { type: 'scrape', url: link };
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

async function listAllVendors() {
  const out = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: config.notion.vendorsDbId,
      start_cursor: cursor,
      page_size: 100
    });
    out.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return out;
}

function vendorInfo(page) {
  const name = (page.properties.Name?.title || []).map(t => t.plain_text).join('').trim();
  // Vendor URL lives in the "Link" column in this workspace.
  const website = page.properties.Link?.url || page.properties.Website?.url || '';
  const sources = (page.properties['News sources']?.rich_text || []).map(t => t.plain_text).join('').trim();
  return { pageId: page.id, name, website, hasSources: !!sources };
}

async function main() {
  console.log(`▶ Feed discovery  (${apply ? 'APPLY' : 'dry-run'})`);
  const vendors = (await listAllVendors()).map(vendorInfo);
  const candidates = vendors.filter(v => !v.hasSources && v.website);
  console.log(`  ${vendors.length} total, ${candidates.length} without sources + with website\n`);

  let rssCount = 0, scrapeCount = 0;
  const hits = [];
  await mapLimit(candidates, CONCURRENCY, async v => {
    const found = await findFeedForVendor(v.website);
    if (!found) return;
    hits.push({ ...v, found });
    if (found.type === 'rss') { rssCount++; console.log(`  ✓ rss   ${v.name.padEnd(28)} ${found.url}`); }
    else                       { scrapeCount++; console.log(`  ~ scrape ${v.name.padEnd(28)} ${found.url}`); }
  });

  console.log(`\nFound: ${rssCount} RSS + ${scrapeCount} scrape fallback across ${candidates.length} probed vendor(s).`);

  if (!apply) {
    console.log('\n(dry-run — re-run with --apply to write these to Notion.)');
    return;
  }

  let written = 0;
  for (const h of hits) {
    await notion.pages.update({
      page_id: h.pageId,
      properties: {
        'News sources': {
          rich_text: [{ type: 'text', text: { content: `${h.found.type}:${h.found.url}` } }]
        }
      }
    });
    written++;
  }
  console.log(`✓ Wrote ${written} vendor(s) to Notion.`);
}

main().catch(e => { console.error('✗ Failed:', e.message); process.exit(1); });
