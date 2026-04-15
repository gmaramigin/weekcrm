// Reads the Notion Vendors DB and syncs each row into content/vendors/<slug>.md.
//
//   node scripts/news-pipeline/sync-vendors-from-notion.js           # dry-run
//   node scripts/news-pipeline/sync-vendors-from-notion.js --apply   # writes files
//
// - Creates a stub markdown file for any vendor missing from content/vendors/.
// - Updates existing files in-place to add/refresh `referralUrl` frontmatter.
// - Attio gets a hardcoded `referralPerk: "10% discount on any plan"`.
// - Preserves existing body content untouched.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Client } = require('@notionhq/client');
const config = require('./config');

const apply = process.argv.includes('--apply');
const notion = new Client({ auth: config.notion.token });
const VENDORS_DIR = path.join(__dirname, '..', '..', 'content', 'vendors');

// Map Notion Name → existing markdown slug when auto-slug doesn't line up.
const SLUG_ALIASES = {
  'capsulecrm': 'capsule',
  'monday crm': 'monday'
};

// Perks keyed by lowercased vendor name.
const PERKS = {
  'attio': '10% discount on any plan'
};

function slugify(name) {
  const key = name.toLowerCase();
  if (SLUG_ALIASES[key]) return SLUG_ALIASES[key];
  return key
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeUrl(link) {
  if (!link) return '';
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
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
  const link = page.properties.Link?.url || '';
  const refLink = page.properties['Referral Link']?.url || '';
  const category = page.properties.Select?.select?.name || 'CRM';
  return { name, link: normalizeUrl(link), refLink: normalizeUrl(refLink), category };
}

function stubBody(name) {
  return `
## What is ${name}?

${name} is a CRM tool in the WeekCRM directory. We're still writing a full review — check back soon for honest pros, cons, and pricing analysis.

## Useful links

Visit the vendor site via the link on the right to learn more about features, pricing, and plans.
`.trimStart();
}

function buildFrontmatter(v, slug, perk) {
  const fm = {
    title: v.name,
    description: `${v.name} — overview, features, and pricing in the WeekCRM directory.`,
    website: v.link || '',
    category: v.category || 'CRM',
    tags: [v.category || 'CRM'],
    date: new Date().toISOString().slice(0, 10),
    stub: true
  };
  if (v.refLink) fm.referralUrl = v.refLink;
  if (perk) fm.referralPerk = perk;
  return fm;
}

function mergeFrontmatter(existing, v, perk) {
  // Only touch referral fields + website (leave description/body/etc alone).
  const next = { ...existing };
  if (v.refLink) next.referralUrl = v.refLink;
  if (perk) next.referralPerk = perk;
  // Backfill website if missing.
  if (!next.website && v.link) next.website = v.link;
  return next;
}

async function main() {
  console.log(`▶ Sync vendors from Notion (${apply ? 'APPLY' : 'dry-run'})`);
  const pages = await listAllVendors();
  const vendors = pages.map(vendorInfo).filter(v => v.name);

  // Dedupe by slug — prefer rows with referral link, then with any link.
  const bySlug = new Map();
  for (const v of vendors) {
    const slug = slugify(v.name);
    const prev = bySlug.get(slug);
    if (!prev) { bySlug.set(slug, v); continue; }
    const score = x => (x.refLink ? 2 : 0) + (x.link ? 1 : 0);
    if (score(v) > score(prev)) bySlug.set(slug, v);
  }

  console.log(`  ${vendors.length} Notion rows → ${bySlug.size} unique slug(s)\n`);

  if (!fs.existsSync(VENDORS_DIR)) {
    console.log(`  creating ${VENDORS_DIR}`);
    if (apply) fs.mkdirSync(VENDORS_DIR, { recursive: true });
  }

  let created = 0, updated = 0, unchanged = 0;
  for (const [slug, v] of bySlug) {
    const file = path.join(VENDORS_DIR, `${slug}.md`);
    const perk = PERKS[v.name.toLowerCase()];

    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const parsed = matter(raw);
      const nextFm = mergeFrontmatter(parsed.data, v, perk);

      const changed = JSON.stringify(parsed.data) !== JSON.stringify(nextFm);
      if (!changed) { unchanged++; continue; }
      const refNote = v.refLink ? ` +ref${perk ? '+perk' : ''}` : '';
      console.log(`  ~ update  ${slug}${refNote}`);
      if (apply) {
        fs.writeFileSync(file, matter.stringify(parsed.content, nextFm));
      }
      updated++;
    } else {
      const fm = buildFrontmatter(v, slug, perk);
      const refNote = v.refLink ? ` +ref${perk ? '+perk' : ''}` : '';
      console.log(`  + create  ${slug.padEnd(30)} ${v.name}${refNote}`);
      if (apply) {
        fs.writeFileSync(file, matter.stringify(stubBody(v.name), fm));
      }
      created++;
    }
  }

  console.log(`\nDone. created=${created} updated=${updated} unchanged=${unchanged}`);
  if (!apply) console.log('(dry-run — re-run with --apply to write files.)');
}

main().catch(e => { console.error('✗ Failed:', e); process.exit(1); });
