#!/usr/bin/env node
/**
 * Thin-content / duplicate gate for programmatic page sets.
 *
 * Usage: node scripts/check-uniqueness.js content/pricing
 *
 * For each page it computes the share of 5-gram shingles that appear in NO
 * other page in the set. That is the "unique content %" the programmatic-SEO
 * quality gates are written against:
 *
 *   >= 40%  pass
 *   30-40%  warn (review before publishing)
 *   <  30%  fail (scaled-content-abuse risk — do not publish)
 *
 * Frontmatter is included in the comparison on purpose: a page whose tier table
 * is boilerplate is thin even if the prose differs.
 */
const fs = require('fs');
const path = require('path');

const NGRAM = 5;
const WARN = 40;
const FAIL = 30;
const MIN_WORDS = 300;

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/check-uniqueness.js <dir>');
  process.exit(2);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
if (!files.length) {
  console.error(`No markdown files in ${dir}`);
  process.exit(2);
}

const normalize = (s) => s
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .split(/\s+/)
  .filter(Boolean);

const docs = files.map(f => {
  const words = normalize(fs.readFileSync(path.join(dir, f), 'utf8'));
  const shingles = new Set();
  for (let i = 0; i + NGRAM <= words.length; i++) {
    shingles.add(words.slice(i, i + NGRAM).join(' '));
  }
  return { file: f, words: words.length, shingles };
});

// How many documents contain each shingle.
const docFreq = new Map();
for (const d of docs) {
  for (const s of d.shingles) docFreq.set(s, (docFreq.get(s) || 0) + 1);
}

let failed = 0, warned = 0;
const rows = docs.map(d => {
  let unique = 0;
  for (const s of d.shingles) if (docFreq.get(s) === 1) unique++;
  const pct = d.shingles.size ? (unique / d.shingles.size) * 100 : 0;
  const thin = d.words < MIN_WORDS;
  let status = 'pass';
  if (pct < FAIL) { status = 'FAIL'; failed++; }
  else if (pct < WARN) { status = 'warn'; warned++; }
  if (thin && status === 'pass') { status = 'warn (thin)'; warned++; }
  return { ...d, pct, status, thin };
}).sort((a, b) => a.pct - b.pct);

console.log(`\nUniqueness report — ${dir} (${docs.length} pages, ${NGRAM}-gram)\n`);
for (const r of rows) {
  const flag = r.status === 'pass' ? '  ' : r.status.startsWith('FAIL') ? '❌' : '⚠️ ';
  console.log(`${flag} ${r.pct.toFixed(1).padStart(5)}%  ${String(r.words).padStart(5)}w  ${r.file}${r.thin ? '  [under 300 words]' : ''}`);
}

const avg = rows.reduce((s, r) => s + r.pct, 0) / rows.length;
console.log(`\naverage unique: ${avg.toFixed(1)}%   pass: ${rows.length - failed - warned}   warn: ${warned}   fail: ${failed}`);

// Exact-duplicate detection across the set.
const byHash = new Map();
for (const d of docs) {
  const key = [...d.shingles].sort().join('|');
  if (!byHash.has(key)) byHash.set(key, []);
  byHash.get(key).push(d.file);
}
const dupes = [...byHash.values()].filter(g => g.length > 1);
if (dupes.length) {
  console.log('\n❌ exact duplicates:');
  for (const g of dupes) console.log('   ' + g.join(' == '));
  failed += dupes.length;
}

if (failed) {
  console.log('\n❌ GATE FAILED — pages below 30% unique content must not be published.\n');
  process.exit(1);
}
console.log('\n✅ gate passed\n');
