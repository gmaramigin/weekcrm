#!/usr/bin/env node
//
// Publishes all Notion news rows with Status=approved to the website.
//
//   1. Read approved rows from Notion News DB.
//   2. For each: write content/articles/YYYY-MM-DD-slug.md.
//   3. Run the site build.
//   4. Commit + push — Vercel auto-deploys.
//   5. Mark each row as Status=published, Published at=now, Channels=[website].
//
// Browser-mode publishing (X, LinkedIn, Substack) is a phase 2 step that runs
// AFTER this one — it will read the same Status=published rows and post them.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('./config');
const notion = require('./notion');

async function main() {
  console.log('\n▶ WeekCRM publish-approved\n');

  const approved = await notion.listApprovedNews();
  console.log(`✓ Found ${approved.length} approved row(s)`);
  if (approved.length === 0) {
    console.log('  Nothing to publish. Exiting.\n');
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const writtenFiles = [];

  for (const row of approved) {
    const slug = slugify(row.headline || row.title);
    const filename = `${today}-${slug}.md`;
    const filePath = path.join(config.paths.articles, filename);

    const frontmatter = [
      '---',
      `title: ${jsonStr(row.headline || row.title)}`,
      `description: ${jsonStr(firstSentence(row.rewrittenText))}`,
      `date: ${today}`,
      `source: ${row.sourceUrl}`,
      `tags: [News]`,
      '---',
      ''
    ].join('\n');

    fs.writeFileSync(filePath, frontmatter + row.rewrittenText + '\n');
    writtenFiles.push(filePath);
    console.log(`  ✓ wrote ${path.relative(config.paths.root, filePath)}`);
  }

  // Rebuild the site
  console.log('\n▶ Rebuilding site...');
  execSync('node build.js', { cwd: config.paths.root, stdio: 'inherit' });

  // Commit + push
  console.log('\n▶ Committing...');
  execSync(`git add ${writtenFiles.map(f => `"${f}"`).join(' ')}`, { cwd: config.paths.root });
  execSync(`git commit -m "news: publish ${approved.length} article(s) (${today})"`, { cwd: config.paths.root });
  execSync('git push origin main', { cwd: config.paths.root, stdio: 'inherit' });

  // Mark each row as published in Notion
  console.log('\n▶ Updating Notion...');
  for (const row of approved) {
    await notion.markPublished(row.notionPageId, ['website']);
  }

  console.log(`\n✓ Published ${approved.length} article(s). Vercel will redeploy shortly.\n`);
}

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function firstSentence(s) {
  const m = String(s).match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : String(s).slice(0, 160)).trim();
}

function jsonStr(s) {
  // Safe YAML string for our frontmatter use-case
  return JSON.stringify(String(s));
}

main().catch(err => {
  console.error('\n✗ Publish failed:', err);
  process.exit(1);
});
