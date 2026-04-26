// Find duplicate vendor rows in the Notion Vendors DB and archive the extras.
//
// Duplicate = same normalized Name (lowercased, punctuation-stripped).
// Keep = the row with the most non-empty properties; tiebreak by oldest created_time
//        so we preserve the original row and its incoming relations.
//
// Safety:
//   node scripts/news-pipeline/dedupe-vendors.js            → dry-run, prints plan
//   node scripts/news-pipeline/dedupe-vendors.js --apply    → actually archive losers
//
// "Archive" in Notion = page.archived = true (trash). Recoverable for 30 days.

const { Client } = require('@notionhq/client');
const config = require('./config');

const apply = process.argv.includes('--apply');
const notion = new Client({ auth: config.notion.token });

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function vendorName(page) {
  return (page.properties.Name?.title || []).map(t => t.plain_text).join('').trim();
}

function countFilled(page) {
  let n = 0;
  for (const v of Object.values(page.properties)) {
    if (!v) continue;
    if (v.title?.length) n++;
    else if (v.rich_text?.length) n++;
    else if (v.url) n++;
    else if (v.select) n++;
    else if (v.multi_select?.length) n++;
    else if (v.number != null) n++;
    else if (v.date) n++;
    else if (v.checkbox) n++;
    else if (v.relation?.length) n++;
  }
  return n;
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

async function main() {
  console.log(`▶ Vendor dedupe  (${apply ? 'APPLY' : 'dry-run'})`);
  const vendors = await listAllVendors();
  console.log(`  Loaded ${vendors.length} vendor(s)\n`);

  const groups = new Map();
  for (const page of vendors) {
    const name = vendorName(page);
    if (!name) continue;
    const key = normalizeName(name);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(page);
  }

  const dupGroups = [...groups.entries()].filter(([, rows]) => rows.length > 1);
  if (!dupGroups.length) {
    console.log('✓ No duplicates found.');
    return;
  }

  const toArchive = [];
  for (const [, rows] of dupGroups) {
    rows.sort((a, b) => {
      const fd = countFilled(b) - countFilled(a);
      if (fd !== 0) return fd;
      return new Date(a.created_time) - new Date(b.created_time);
    });
    const keeper = rows[0];
    const losers = rows.slice(1);
    console.log(`• ${vendorName(keeper)}  (${rows.length} copies)`);
    console.log(`    keep:    ${keeper.id}  [${countFilled(keeper)} props, created ${keeper.created_time.slice(0,10)}]`);
    for (const l of losers) {
      console.log(`    archive: ${l.id}  [${countFilled(l)} props, created ${l.created_time.slice(0,10)}]`);
      toArchive.push(l);
    }
  }

  console.log(`\n${dupGroups.length} duplicate group(s), ${toArchive.length} row(s) to archive.`);

  if (!apply) {
    console.log('\n(dry-run — nothing changed. Re-run with --apply to archive the losers.)');
    return;
  }

  let done = 0;
  for (const page of toArchive) {
    await notion.pages.update({ page_id: page.id, archived: true });
    done++;
  }
  console.log(`\n✓ Archived ${done} duplicate row(s).`);
}

main().catch(e => { console.error('✗ Failed:', e.message); process.exit(1); });
