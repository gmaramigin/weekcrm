// Loads env from .env.local (not committed). Fails fast with helpful errors
// unless running in --dry-run mode, where missing creds are OK.

const fs = require('fs');
const path = require('path');

function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

const isDryRun = process.argv.includes('--dry-run');

function requireEnv(key) {
  const v = process.env[key];
  if (!v) {
    if (isDryRun) return null;
    console.error(`\n✗ Missing required env var: ${key}`);
    console.error(`  Add it to .env.local or run with --dry-run to skip credential-gated steps.\n`);
    process.exit(1);
  }
  return v;
}

module.exports = {
  isDryRun,
  anthropic: {
    apiKey: requireEnv('ANTHROPIC_API_KEY'),
    model: process.env.ANTHROPIC_MODEL || 'claude-opus-4-6'
  },
  notion: {
    token: requireEnv('NOTION_TOKEN'),
    vendorsDbId: requireEnv('NOTION_VENDORS_DB_ID'),
    newsDbId: requireEnv('NOTION_NEWS_DB_ID')
  },
  paths: {
    root: path.join(__dirname, '..', '..'),
    articles: path.join(__dirname, '..', '..', 'content', 'articles'),
    drafts: path.join(__dirname, '..', '..', 'drafts')
  }
};
