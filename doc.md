# WeekCRM — Project Doc

## The idea

WeekCRM is a CRM-industry media property: news, honest vendor reviews, and a
growing directory of CRM tools. The goal is a single weekly habit for anyone
who cares about the CRM space — buyers evaluating tools, operators watching
competitors, and vendors tracking the market.

Three surfaces, one content engine:

1. **Website** (`weekcrm.com`) — static site with a homepage, `/news`
   article feed, and `/vendors` directory with per-vendor pages.
2. **Newsletter** (Beehiiv, planned) — Sunday digest of the week's approved
   news.
3. **Social** (X / LinkedIn / Substack, planned) — each approved item
   reposted with a short summary + link.

The editorial loop is: automated fetch from vendor sources → Claude rewrites
in journalism style → drafts land in a Notion News DB → human approves in
Notion → one command publishes to the site (and later, to all channels).

## Repo layout

```
weekcrm.com/
├── build.js                 # Static site generator (no framework)
├── package.json             # npm scripts: build, dev, news:*
├── vercel.json              # Vercel deploy config (outputDirectory=dist)
│
├── src/
│   ├── templates/           # base, home, news, article, vendor, directory
│   ├── css/style.css        # Single stylesheet (cache-busted by hash)
│   └── js/                  # Client JS copied to /assets
│
├── content/
│   ├── articles/*.md        # News items (frontmatter: title, date, tags, …)
│   └── vendors/*.md         # Vendor profiles (title, category, logo, …)
│
├── public/                  # Static assets copied verbatim to dist/
│   └── logos/               # Vendor logos, auto-resolved by slug
│
├── dist/                    # Build output (Vercel serves this)
│
├── scripts/news-pipeline/
│   ├── run-daily.js         # Fetch → dedupe → rewrite → draft in Notion
│   ├── publish-approved.js  # Approved rows → content/articles/*.md + git push
│   ├── rewrite.js           # Claude journalism-style rewrite
│   ├── notion.js            # Vendors/News DB client
│   ├── fetchers/            # rss, scrape, sitemap
│   ├── config.js
│   ├── discover-feeds.js    # Utility: find RSS feeds for a vendor
│   ├── dedupe-vendors.js    # Utility: clean up Vendor DB dupes
│   ├── seed-news-db.js      # One-shot: provision Notion News DB schema
│   └── seed-vendor-sources.js
│
├── drafts/                  # Local dry-run output (gitignored)
│
├── .env.example             # ANTHROPIC_API_KEY, NOTION_TOKEN, *_DB_ID, …
└── .env.local               # Real secrets (gitignored)
```

## How the site is built

Plain Node, no framework. `build.js` does it all:

1. Clean `dist/`, copy `public/` and `src/css`, `src/js` into `dist/assets/`.
2. Hash `style.css` for cache-busting (`{{assetVersion}}` in templates).
3. Read `content/articles/*.md` and `content/vendors/*.md` via `gray-matter`,
   render Markdown via `marked`.
4. For each template (`home`, `news`, `article`, `vendor`, `directory`),
   substitute `{{vars}}` and wrap with `base.html`.
5. Per-vendor pages auto-link related articles by tag match on vendor slug
   or title.
6. Emit `rss.xml` with the 20 most-recent articles.

Vendor logos: `renderLogo()` looks for `public/logos/<slug>.{svg,webp,png,…}`
and falls back to a deterministic-color monogram tile.

Commands:

- `npm run build` — one-shot build
- `npm run dev` — build + watch `content/`, templates, css, js
- `npm run clean` — delete `dist/`

Deploy: Vercel runs `npm run build` and serves `dist/`.

## How the news pipeline works

Two long-running scripts plus a Notion workspace.

### Notion schema (manual setup, one time)

- **Vendors DB** — existing, with an added `News sources` rich-text column.
  Format (one per line): `rss:https://…`, `scrape:https://…`, `x:@handle`,
  `linkedin:slug`. Only `rss` is wired up in phase 1.
- **News DB** — columns exactly as listed in
  `scripts/news-pipeline/README.md`: `Title`, `Vendor` (relation),
  `Source URL`, `Source type`, `Original text`, `Rewritten text`, `Headline`,
  `Status` (`draft|approved|published|skipped`), `Published at`, `Channels`
  (`website|x|linkedin|substack|beehiiv`), `Discovered at`.

Both DBs must be shared with the internal integration whose token is in
`NOTION_TOKEN`.

### Daily run (`npm run news:daily`)

1. Load vendors from Notion, parse their `News sources` column.
2. For each source, fetch new items (phase 1: RSS only).
3. Dedupe against the News DB by `Source URL`.
4. Call Claude (`ANTHROPIC_MODEL`, default `claude-opus-4-6`) to rewrite each
   item in a short journalism style.
5. Insert a new row in the News DB with `Status = draft`, linked to the
   vendor, with original + rewritten text.

`npm run news:dry` does the same thing offline against fixture feeds,
writing one JSON per item to `drafts/` — no Notion or Anthropic keys needed.
It's the starting point for verifying the rewrite prompt.

### Human approval

Open the News DB in Notion, read the drafts, flip `Status → approved` on the
good ones. Drafts you don't want get `skipped`.

### Publish (`npm run news:publish`)

1. Query the News DB for rows where `Status = approved`.
2. Write each to `content/articles/YYYY-MM-DD-<slug>.md` with frontmatter.
3. Run `npm run build`.
4. `git add`, `git commit`, `git push` — Vercel redeploys.
5. Mark rows `Status = published`, add `website` to `Channels`.

### Automation

`scripts/news-pipeline/README.md` includes a launchd plist for a 5:00 AM
daily cron on macOS. Not installed yet.

## What's working

- Static site generator: builds homepage, `/news` feed, article pages,
  vendor directory and detail pages, RSS feed. Verified — `dist/` exists and
  is deployed on Vercel.
- 8 vendor profiles and 6 seeded articles live in `content/`.
- News pipeline scaffolding committed (phase 1): fetch → rewrite → draft.
- Dry-run path (`news:dry`) for validating the rewrite prompt offline.
- Notion client, RSS fetcher, Claude rewrite prompt.
- `publish-approved.js` exists for the approved → website path.
- Vendor logos resolved automatically from `public/logos/<slug>.<ext>`.

## What's not working / incomplete

- **Phase 1 only**: `scrape`, `x`, `linkedin`, `newsletter` source types log
  a warning and skip. Only `rss` actually fetches. `fetchers/scrape.js` and
  `fetchers/sitemap.js` are stubs.
- **Notion schema is manual**. `seed-news-db.js` exists but hasn't been
  verified end-to-end against a fresh workspace.
- **No full production run has been done yet** — nothing has moved through
  the Notion → approved → published path in anger. The Notion DB IDs in
  `.env.local` need to be filled in.
- **Legacy HTML sprawl at repo root** — `attio.html`, `breakcold.html`,
  `close.html`, `folk.html`, `freshdesk.html`, `monday.html`, `index.html`,
  `faq.html`, `newsletter.html`, `product.html`, `fitness.html`,
  `app.js`, `blog.js`, `crm-detail.js`, `crm-directory.js`, `styles.css`,
  `crms/`, `blog/` (a PHP CMS?), `images/`, `logos/` — these are from the
  v1 site and are **not** used by `build.js`. They should either be deleted
  or moved into an `archive/` folder. Right now they pollute `git status`
  and make the repo confusing.
- **No tests**, no CI, no linting.
- **No sitemap.xml**, no `robots.txt` emitted by the build. Only `rss.xml`.
- **No analytics wired up** (beyond the apitiny ad script in recent
  commits).
- **Search** — there's no search on the directory or news pages.
- **Vendor category filtering** — `data-category` is set on vendor cards
  but there's no JS to filter them.
- **Phase 2 channels**: Beehiiv newsletter, X/LinkedIn/Substack via
  Playwright — designed, not started. `BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID`
  are placeholders in `.env.example`.
- **Daily cron** (launchd plist) — documented, not installed.

## How it should be (target state)

### Content & pipeline

- Full phase 1 end-to-end: Notion creds set, a real `news:daily` run
  produces drafts, approval → `news:publish` ships a real article to
  production without manual edits.
- Scrape fetcher implemented for vendors without RSS (most of them). Use
  `sitemap.js` to discover `/blog`/`/changelog`/`/press` URLs, then scrape.
- A `discover-feeds.js` pass across the Vendors DB to bulk-populate
  `News sources`.
- Phase 2 live: Sunday Beehiiv digest, and Playwright posting to X and
  LinkedIn with per-item summary + link.
- launchd daily run installed on the laptop, with log rotation under
  `~/.weekcrm/`.

### Site

- Legacy root-level HTML and JS deleted (or moved to `archive/`) so the
  repo only contains the current build system.
- Sitemap + robots.txt emitted by `build.js`.
- Client-side filtering and search on the directory page.
- OG images per article (can be a simple template-rendered SVG→PNG).
- Vendor pages show the last ~5 news items automatically, not just those
  tagged with the vendor slug.
- A proper `/changelog` or `/this-week` rollup page driven by articles
  from the past 7 days.

### Engineering

- A minimal smoke test: `npm run build` + assert that expected files
  exist in `dist/`. Wire into a GitHub Action.
- Typed frontmatter (either via a schema check in `build.js` or a small
  `zod` pass) so a missing `date` or `title` fails loudly.
- One authoritative `.gitignore` entry set — currently `drafts/` is empty
  but not listed anywhere.
- `CLAUDE.md` kept in sync with pipeline changes so future sessions can
  pick up the project cold.

## Environment

`.env.local` (gitignored) must contain:

```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-opus-4-6
NOTION_TOKEN=secret_...
NOTION_VENDORS_DB_ID=<32-char id>
NOTION_NEWS_DB_ID=<32-char id>
# Phase 2, not yet wired
BEEHIIV_API_KEY=
BEEHIIV_PUB_ID=
```

## Common commands

```bash
npm run build          # Build dist/
npm run dev            # Build + watch
npm run news:dry       # Offline dry run of the pipeline → drafts/
npm run news:daily     # Real fetch → Notion drafts
npm run news:publish   # Approved rows → content/ → git push → Vercel
```

## Deploy rule (READ THIS)

**Every meaningful change must reach production.** Local builds are useless
on their own — Vercel only redeploys on a `git push` to `main`. The full
loop is:

```bash
npm run build              # Sanity check: did it actually compile?
git add <changed files>
git commit -m "..."
git push origin main       # Vercel picks this up and rebuilds prod automatically
```

Don't leave finished work uncommitted overnight. The `news:publish` script
already does this end-to-end for editorial content; everything else
(template tweaks, new vendor profiles, comparison pages, listicles, CSS
fixes) needs the manual sequence above. After pushing, watch the Vercel
dashboard for ~60s to confirm the prod build went green.

If you change templates, CSS, or `build.js`, the cache-bust hash in
`{{assetVersion}}` updates automatically — but only after a successful
prod build. Visitors won't see CSS changes until that deploys.

## Promotion playbook (recurring)

WeekCRM's growth flywheel is **publish → distribute → monetize**. The
content engine (vendor profiles, news pipeline) feeds three recurring
loops. Each one is documented here so a fresh session can pick it up.

### Loop 1 — Publish (weekly cadence)

Already automated for news. The new growth lever is **comparison pages**
and **best-of listicles**, which convert affiliate clicks 5–10× better
than vendor pages alone.

**To add a comparison page** (`/compare/<a>-vs-<b>`):

1. Create `content/compare/<a-slug>-vs-<b-slug>.md` (e.g.
   `hubspot-vs-pipedrive.md`).
2. Frontmatter: `title`, `description`, `a` (vendor slug), `b` (vendor
   slug), `date`, `tags`. Body Markdown is the editorial.
3. Both vendors must already exist as `content/vendors/<slug>.md`.
4. The build auto-renders side-by-side cards, pulls `pricing` / `rating`
   from each vendor's frontmatter, and uses each vendor's `referralUrl`
   for the CTA (with `rel="noopener sponsored"`). If a vendor has no
   `referralUrl`, the CTA falls back to its `website` with `rel="nofollow"`.
5. Build, commit, push (see the deploy rule above).

**Target output**: 2 new comparison pages per week. Priority list:

- `attio-vs-folk`, `hubspot-vs-salesforce` (already exists), `pipedrive-vs-monday`,
  `close-vs-salesloft`, `breakcold-vs-apollo`, `attio-vs-hubspot`,
  `nethunt-vs-streak`, `nutshell-vs-pipedrive`, `nocrm-vs-pipedrive`.

**To add a "Best CRM for X" listicle** (`/best/<slug>`):

1. Create `content/best/<slug>.md` (e.g. `best-crm-for-real-estate.md`).
2. Frontmatter: `title`, `description`, `vendors` (ordered list of vendor
   slugs — this becomes the ranked picks), `date`, `tags`.
3. Body Markdown becomes supporting copy below the picks.
4. Build, commit, push.

Each listicle should embed 5–10 affiliate links via vendor `referralUrl`s.
Priority list: `best-crm-for-real-estate`, `best-crm-for-consultants`,
`best-crm-for-gmail`, `best-crm-for-agencies`, `best-crm-under-20-per-user`,
`best-free-crm-2026`, `best-crm-for-startups`, `best-crm-for-solopreneurs`.

### Loop 2 — Distribute (per-publication)

For every published article, comparison page, or listicle:

1. **LinkedIn** — write a native post (hook + 3–5 takeaways + link).
   Native posts get 10× the reach of bare link posts. Tag the vendor's
   official account when relevant.
2. **X / Twitter** — turn it into a 5–8 tweet thread. The link goes in
   the last tweet. Tag the vendor.
3. **Reddit** — answer one relevant question per day in r/sales, r/CRM,
   r/smallbusiness with a genuine answer + link to the matching comparison
   or listicle. Don't drop the link cold; respond to the actual question.
4. **Newsletter (Beehiiv, when live)** — Sunday digest pulls the week's
   approved items.

### Loop 3 — Monetize (continuous)

Every vendor page in the directory should have a `referralUrl`. Currently
only ~10 of 160 do. Process:

1. Once per week, list the top vendors by traffic (Search Console).
2. For each one without a `referralUrl`, apply to the partner program.
   Common networks: PartnerStack, Impact, FirstPromoter (`fpr=`),
   Rewardful, Reditus.
3. Once approved, add `referralUrl: '...'` (and optionally
   `referralPerk: '...'`) to the vendor's frontmatter and push.

**Target**: 5 new affiliate programs / week until coverage hits 60%+ of
the directory. The monetization is silent revenue — every comparison
page and listicle that references a vendor with `referralUrl` set
already earns automatically.

### Loop 4 — Internal linking (continuous)

`build.js` already auto-links the FIRST mention of a known vendor in
every article, vendor body, comparison, and listicle to `/vendors/<slug>`.
Nothing to do manually. But: when writing new content, **mention vendors
by their canonical name** (e.g. "HubSpot", not "the HubSpot CRM") so the
auto-linker matches them.

### Programmatic SEO (low-effort, high-yield)

`/industry/<slug>` and `/integrations/<slug>` pages auto-render from
vendor tags. To add one, create `content/industry/<slug>.md` (or
`content/integrations/<slug>.md`) with frontmatter `title`, `description`,
`tag` (case-insensitive — must match a tag or category on the vendors
you want listed). The build groups matching vendors into a card grid.
Body Markdown is the intro copy.

Priority targets: `gmail`, `outlook`, `slack`, `whatsapp`, `linkedin`,
`real-estate`, `agencies`, `consultants`, `startups`, `e-commerce`,
`saas`, `b2b`, `field-sales`.

## Schema markup (live)

Every vendor page emits JSON-LD `Product` + `AggregateRating` + `Review`
when `rating` is set. Comparison pages emit JSON-LD `Article` schema with
`about` referencing both products. Listicles emit JSON-LD `ItemList`. No
manual action — driven entirely by frontmatter. Validate occasionally
with [Google's Rich Results Test](https://search.google.com/test/rich-results).
