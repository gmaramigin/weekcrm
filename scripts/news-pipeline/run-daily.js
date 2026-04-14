#!/usr/bin/env node
//
// Daily news pipeline orchestrator.
//
//   node scripts/news-pipeline/run-daily.js            # real run (needs .env.local)
//   node scripts/news-pipeline/run-daily.js --dry-run  # no creds needed, writes to drafts/
//
// Flow:
//   1. List vendors from Notion (or hardcoded fixtures in dry-run).
//   2. For each vendor, fetch items from every declared source.
//   3. Dedupe against Notion News DB by Source URL.
//   4. Rewrite each new item via Claude.
//   5. Write a draft row to Notion News DB (Status: draft) — or a local file in dry-run.
//
// Publishing approved drafts to the website is a separate step:
//   node scripts/news-pipeline/publish-approved.js

const fs = require('fs');
const path = require('path');

const config = require('./config');
const notion = require('./notion');
const { fetchVendorNews } = require('./fetchers');
const { rewriteItem } = require('./rewrite');

// Fixture vendors for dry-run — so you can see the pipeline working end-to-end
// before wiring up Notion. Swap your own RSS URLs in here to test real feeds.
const DRY_RUN_VENDORS = [
  {
    notionPageId: null,
    name: 'Attio',
    slug: 'attio',
    website: 'https://attio.com',
    sources: [{ type: 'rss', value: 'https://attio.com/blog/rss.xml' }]
  }
];

async function main() {
  const start = Date.now();
  console.log(`\n▶ WeekCRM news pipeline ${config.isDryRun ? '(DRY RUN)' : ''}`);
  console.log(`  Started: ${new Date().toISOString()}\n`);

  const vendors = config.isDryRun ? DRY_RUN_VENDORS : await notion.listVendors();
  console.log(`✓ Loaded ${vendors.length} vendor(s)`);

  if (config.isDryRun) fs.mkdirSync(config.paths.drafts, { recursive: true });

  let fetched = 0;
  let skipped = 0;
  let staleSkipped = 0;
  let undatedSkipped = 0;
  let drafted = 0;
  const seenUrls = new Set(); // in-run dedupe, on top of Notion dedupe

  // Freshness window: only items published in the last 24h (UTC).
  // Items without a publishedAt are skipped — we can't verify freshness.
  const WINDOW_MS = 24 * 60 * 60 * 1000;
  const cutoff = Date.now() - WINDOW_MS;

  for (const vendor of vendors) {
    if (!vendor.sources || vendor.sources.length === 0) {
      console.log(`  · ${vendor.name}: no sources configured, skipping`);
      continue;
    }
    console.log(`\n  · ${vendor.name} (${vendor.sources.length} source${vendor.sources.length > 1 ? 's' : ''})`);

    const items = await fetchVendorNews(vendor);
    fetched += items.length;

    for (const item of items) {
      if (seenUrls.has(item.url)) { skipped++; continue; }
      seenUrls.add(item.url);

      // Freshness gate: must have a publishedAt within the last 24h.
      if (!item.publishedAt) { undatedSkipped++; continue; }
      const ts = Date.parse(item.publishedAt);
      if (isNaN(ts) || ts < cutoff) { staleSkipped++; continue; }

      if (!config.isDryRun) {
        const existing = await notion.findNewsByUrl(item.url);
        if (existing) { skipped++; continue; }
      }

      console.log(`    → rewriting: ${item.title.slice(0, 70)}`);
      let rewritten;
      try {
        rewritten = await rewriteItem({
          vendorName: vendor.name,
          title: item.title,
          summary: item.summary,
          url: item.url
        });
      } catch (err) {
        console.warn(`      ⚠ rewrite failed: ${err.message}`);
        continue;
      }

      if (config.isDryRun) {
        const draftPath = path.join(config.paths.drafts, `${vendor.slug}-${slugify(rewritten.headline)}.json`);
        fs.writeFileSync(draftPath, JSON.stringify({
          vendor: vendor.name,
          source: item,
          rewritten
        }, null, 2));
        console.log(`      ✓ draft → ${path.relative(config.paths.root, draftPath)}`);
      } else {
        await notion.createDraftNews({
          title: rewritten.headline,
          headline: rewritten.headline,
          vendorPageId: vendor.notionPageId,
          sourceUrl: item.url,
          sourceType: item.sourceType,
          originalText: `${item.title}\n\n${item.summary}`,
          rewrittenText: rewritten.body
        });
        console.log(`      ✓ draft → Notion`);
      }
      drafted++;
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n✓ Done in ${elapsed}s. Fetched ${fetched}, drafted ${drafted}, ` +
    `skipped ${skipped} (dupes) + ${staleSkipped} (stale) + ${undatedSkipped} (no date).\n`);
}

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

main().catch(err => {
  console.error('\n✗ Pipeline failed:', err);
  process.exit(1);
});
