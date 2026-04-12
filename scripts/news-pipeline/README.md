# WeekCRM news pipeline

Automated daily pipeline: **fetch → rewrite → draft in Notion → approve → publish**.

## Flow

```
Notion Vendors DB              scripts/news-pipeline/run-daily.js
  ├─ vendor A (sources)   ─→   1. fetch new items from each source
  ├─ vendor B (sources)   ─→   2. dedupe against Notion News DB (by URL)
  └─ vendor C (sources)   ─→   3. rewrite via Claude (journalism style)
                               4. insert into Notion News DB as "draft"

  ↓ You review drafts in Notion and flip Status → "approved"

scripts/news-pipeline/publish-approved.js
  1. read approved rows
  2. write content/articles/YYYY-MM-DD-slug.md
  3. git commit + push → Vercel redeploys
  4. mark rows Status=published, Channels=[website]
```

## Scripts

| Script | What it does |
|---|---|
| `npm run news:dry` | Dry run — uses fixture vendors, no creds needed, writes to `drafts/` locally. **Start here.** |
| `npm run news:daily` | Real daily run. Needs Notion + Anthropic keys. |
| `npm run news:publish` | Publish approved rows to the website. Runs build, commits, pushes. |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

```bash
cp .env.example .env.local
# edit with your keys
```

### 3. Get an Anthropic API key

https://console.anthropic.com → API keys → create. Paste into `ANTHROPIC_API_KEY`.

### 4. Set up Notion

**a. Create an internal integration:**
https://www.notion.so/profile/integrations → New integration → name it "WeekCRM pipeline" → copy the "Internal Integration Secret" → paste into `NOTION_TOKEN`.

**b. Create the News DB** in Notion with these columns (**exact names**):

| Property name | Type | Notes |
|---|---|---|
| Title | title | required |
| Vendor | relation | relation to your Vendors DB |
| Source URL | URL | dedupe key — must be unique-ish |
| Source type | select | options: `rss`, `scrape`, `x`, `linkedin`, `newsletter` |
| Original text | rich text |  |
| Rewritten text | rich text |  |
| Headline | rich text |  |
| Status | select | options: `draft`, `approved`, `published`, `skipped` |
| Published at | date |  |
| Channels | multi-select | options: `website`, `x`, `linkedin`, `substack`, `beehiiv` |
| Discovered at | date |  |

**c. Add a `News sources` column to your Vendors DB:**

Type: **rich text** (not multi-select — we need newline-separated entries).

Format — one source per line:
```
rss:https://attio.com/blog/rss.xml
scrape:https://www.breakcold.com/blog
x:@attio
linkedin:attio
```

(Only `rss` is implemented in phase 1. Others log a warning and skip.)

**d. Share both DBs with your integration:**

Open each DB → `···` menu top-right → Connections → add "WeekCRM pipeline".

**e. Copy the DB IDs** into `.env.local`:

A Notion DB URL looks like:
`https://www.notion.so/workspace/<32-char-id>?v=...`
The 32-char id is the database ID.

### 5. Test it

```bash
npm run news:dry
```

This uses a fixture Attio RSS feed. You'll see:
- drafts written to `drafts/*.json`
- one file per fetched article with the original source + Claude's rewrite

Review the rewritten text. If the format is good, continue to the real run:

```bash
npm run news:daily
```

This pulls your real Notion vendors and writes drafts to the Notion News DB.

### 6. Approve and publish

In Notion, open the News DB, review each draft row, set **Status = approved** on the ones you want.

Then:

```bash
npm run news:publish
```

This will write the articles to `content/articles/`, rebuild the site, commit, push, and Vercel will redeploy.

### 7. Daily automation (macOS, your laptop)

Once the flow is proven, schedule it with launchd. Plist template:

```xml
<!-- ~/Library/LaunchAgents/com.weekcrm.daily.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.weekcrm.daily</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>-lc</string>
    <string>cd ~/Desktop/weekcrm.com && /usr/local/bin/node scripts/news-pipeline/run-daily.js >> ~/.weekcrm/daily.log 2>&1</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>5</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
```

```bash
mkdir -p ~/.weekcrm
launchctl load ~/Library/LaunchAgents/com.weekcrm.daily.plist
```

## Phase 2 — additional channels

After the website flow is solid and you've approved the format, I'll add:

- **Beehiiv weekly newsletter** — Sunday cron, bundles last 7 days of published items, POSTs to Beehiiv API as a draft.
- **X / LinkedIn / Substack via Playwright** — browser automation on your laptop, one-time login per platform, posts each published item with a short summary + link.
