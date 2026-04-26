// One-shot: ensures the "News sources" rich_text column exists on the Vendors DB
// and writes source lines for a curated list of top vendors.
//
// Run with: node scripts/news-pipeline/seed-vendor-sources.js
// Re-runnable: only vendors whose "News sources" is empty get written (use --force to overwrite).

const { Client } = require('@notionhq/client');
const config = require('./config');

const force = process.argv.includes('--force');
const notion = new Client({ auth: config.notion.token });

// Curated source assignments. Key = lowercased vendor Name (Notion title).
// rss: verified via direct probe. scrape: changelog/blog page (pipeline fetches + parses).
const SOURCES = {
  'attio':                 ['sitemap:https://attio.com/sitemap.xml#/blog/'],
  'hubspot':               ['rss:https://blog.hubspot.com/marketing/rss.xml'],
  'pipedrive':             ['scrape:https://www.pipedrive.com/en/blog/learn/product-updates'],
  'salesforce':            ['rss:https://developer.salesforce.com/blogs/feed'],
  'zoho crm':              ['rss:https://www.zoho.com/blog/crm/feed'],
  'close':                 ['rss:https://www.close.com/blog/rss.xml', 'rss:https://www.close.com/changelog/rss.xml'],
  'folk':                  ['scrape:https://www.folk.app/changelog'],
  'monday crm':            [],  // no feed/sitemap; SPA blog. Revisit later.
  'copper':                ['sitemap:https://www.copper.com/sitemap.xml#/resources/'],
  'capsulecrm':            ['scrape:https://capsulecrm.com/blog'],
  'freshsales':            [],  // Freshworks has no public feed. Revisit.
  'insightly':             ['scrape:https://www.insightly.com/blog/'],
  'keap':                  ['scrape:https://keap.com/product-updates'],
  'nutshell':              ['rss:https://www.nutshell.com/feed'],
  'breakcold':             ['scrape:https://www.breakcold.com/blog'],
  'kommo':                 ['scrape:https://www.kommo.com/blog/'],
  'salesflare':            ['rss:https://blog.salesflare.com/feed'],
  'bitrix24':              ['scrape:https://www.bitrix24.com/about/blogs/'],
  'microsoft dynamics':    [],  // SPA blog, no feed. Revisit.
  'dynamics 365':          [],  // SPA blog, no feed. Revisit.
  'day.ai':                []   // Nothing indexable yet.
};

async function ensureNewsSourcesColumn() {
  const db = await notion.databases.retrieve({ database_id: config.notion.vendorsDbId });
  if (db.properties['News sources']) {
    console.log('✓ "News sources" column already exists');
    return;
  }
  console.log('+ Adding "News sources" rich_text column to Vendors DB');
  await notion.databases.update({
    database_id: config.notion.vendorsDbId,
    properties: { 'News sources': { rich_text: {} } }
  });
  console.log('✓ Column added');
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

function vendorName(page) {
  return (page.properties.Name?.title || []).map(t => t.plain_text).join('').trim();
}

function currentSources(page) {
  return (page.properties['News sources']?.rich_text || []).map(t => t.plain_text).join('').trim();
}

async function updateVendor(pageId, lines) {
  const rich_text = lines.length
    ? [{ type: 'text', text: { content: lines.join('\n') } }]
    : [];
  await notion.pages.update({
    page_id: pageId,
    properties: { 'News sources': { rich_text } }
  });
}

async function main() {
  console.log('▶ Seeding vendor news sources');
  await ensureNewsSourcesColumn();

  const vendors = await listAllVendors();
  console.log(`  Loaded ${vendors.length} vendor(s)`);

  let updated = 0, skipped = 0, unmatched = [];
  const matchedKeys = new Set();

  for (const page of vendors) {
    const name = vendorName(page);
    const key = name.toLowerCase();
    const sources = SOURCES[key];
    if (!sources) continue;
    matchedKeys.add(key);

    const existing = currentSources(page);
    if (existing && !force) {
      console.log(`  · ${name}: already has sources, skipping (use --force to overwrite)`);
      skipped++;
      continue;
    }

    await updateVendor(page.id, sources);
    console.log(`  ✓ ${name}: ${sources.length} source(s)`);
    updated++;
  }

  for (const key of Object.keys(SOURCES)) {
    if (!matchedKeys.has(key)) unmatched.push(key);
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped}.`);
  if (unmatched.length) {
    console.log(`Unmatched (no vendor row with this exact Name): ${unmatched.join(', ')}`);
  }
}

main().catch(e => { console.error('✗ Failed:', e.message); process.exit(1); });
