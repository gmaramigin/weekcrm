// Provisions the Notion News DB schema the pipeline expects.
// Safe to re-run — only adds properties that don't exist; never touches data.
//
//   node scripts/news-pipeline/seed-news-db.js

const { Client } = require('@notionhq/client');
const config = require('./config');
const notion = new Client({ auth: config.notion.token });

const REQUIRED = {
  // Title already exists on every Notion DB by default, usually as "Name" —
  // we rename/guarantee a Title prop named "Title" below.
  'Source URL':    { url: {} },
  'Source type':   { select: { options: [
    { name: 'rss' }, { name: 'scrape' }, { name: 'x' }, { name: 'linkedin' }, { name: 'newsletter' }
  ] } },
  'Original text': { rich_text: {} },
  'Rewritten text':{ rich_text: {} },
  'Headline':      { rich_text: {} },
  'Status':        { select: { options: [
    { name: 'draft' }, { name: 'approved' }, { name: 'published' }, { name: 'skipped' }
  ] } },
  'Published at':  { date: {} },
  'Channels':      { multi_select: { options: [
    { name: 'website' }, { name: 'x' }, { name: 'linkedin' }, { name: 'substack' }, { name: 'beehiiv' }
  ] } },
  'Discovered at': { date: {} },
  'Vendor':        { relation: { database_id: config.notion.vendorsDbId, single_property: {} } }
};

async function main() {
  console.log('▶ Provisioning News DB schema');
  const db = await notion.databases.retrieve({ database_id: config.notion.newsDbId });

  const existing = db.properties;
  const existingTitleKey = Object.keys(existing).find(k => existing[k].type === 'title');
  console.log(`  existing title property: "${existingTitleKey}"`);

  const updates = {};
  for (const [name, schema] of Object.entries(REQUIRED)) {
    if (existing[name]) {
      console.log(`  · ${name}: already exists (${existing[name].type})`);
      continue;
    }
    console.log(`  + adding ${name}`);
    updates[name] = schema;
  }

  // Rename title prop to "Title" if it's called something else.
  if (existingTitleKey && existingTitleKey !== 'Title') {
    console.log(`  ✎ renaming title "${existingTitleKey}" → "Title"`);
    updates[existingTitleKey] = { name: 'Title' };
  }

  if (!Object.keys(updates).length) {
    console.log('\n✓ Schema already complete — nothing to do.');
    return;
  }

  await notion.databases.update({
    database_id: config.notion.newsDbId,
    properties: updates
  });
  console.log(`\n✓ Applied ${Object.keys(updates).length} change(s).`);
}

main().catch(e => { console.error('✗ Failed:', e.message); process.exit(1); });
