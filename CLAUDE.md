# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # One-shot static site build → dist/
npm run dev            # Build + watch content/, templates, css, js
npm run clean          # Delete dist/

npm run news:dry       # Offline pipeline dry-run (fixture RSS, no creds) → drafts/*.json
npm run news:daily     # Real run: fetch vendor sources → Claude rewrite → Notion News DB drafts
npm run news:publish   # Approved Notion rows → content/articles/*.md → build → git commit+push
```

No tests, no linter, no typechecker. Vercel runs `npm run build` and serves `dist/` (see `vercel.json`).

## Architecture

Two separate systems that meet at `content/`:

### 1. Static site generator (`build.js`)

Plain Node, no framework. One file does everything:

- Reads Markdown from `content/articles/`, `content/vendors/`, `content/consultants/`, `content/compare/`, `content/best/`, `content/industry/`, `content/integrations/` via `gray-matter`, renders with `marked`.
- Loads HTML templates from `src/templates/` (`base`, `home`, `news`, `article`, `vendor`, `directory`, `compare`, `consultants`, `consultant`) and does simple `{{var}}` string substitution — there is no template engine.
- Copies `public/` and `src/css|js` into `dist/` (CSS goes to `dist/assets/` and is cache-busted via an md5 hash injected as `{{assetVersion}}`).
- Emits `rss.xml` with the 20 most-recent articles.
- Vendor pages auto-link related articles by tag match on vendor slug or title.
- Articles, vendor bodies, comparisons, and listicles are post-processed by `autoLinkVendors()` — the FIRST plain-text mention of any known vendor title gets a link to `/vendors/<slug>` (skips `<a>`, `<h*>`, `<code>`, `<pre>` blocks).
- Vendor pages emit JSON-LD `Product` + `AggregateRating` + `Review` schema for SERP star snippets — driven entirely by frontmatter (`rating`, `description`, `category`, `logo`).
- `renderLogo()` auto-resolves `public/logos/<slug>.{svg,webp,png,jpg,jpeg,avif}` and falls back to a deterministic-color monogram tile — dropping a logo into `public/logos/` is all that's needed.

Frontmatter expectations:
- **articles** (`content/articles/*.md`): `title`, `date`, optional `tags`, `description`.
- **vendors** (`content/vendors/*.md`): `title`, optional `category`, `description`, `website`, `rating`, `pricing`, `tags`, `logo`, `referralUrl` (affiliate link — replaces "Visit website" CTA), `referralPerk` (renders an "Exclusive offer" callout).
- **comparisons** (`content/compare/<a>-vs-<b>.md`): `title`, `description`, `a` (vendor slug), `b` (vendor slug), `date`, `tags`. Body Markdown is the editorial; the side-by-side cards + CTAs are auto-rendered. Build skips entries whose `a`/`b` slugs aren't in the directory.
- **best-of listicles** (`content/best/*.md`): `title`, `description`, `vendors` (ordered list of vendor slugs), `date`, `tags`. Each vendor in the list becomes a numbered card with affiliate-aware CTA. Body Markdown renders below the picks as supporting copy.
- **industry / integrations** (`content/industry/<slug>.md`, `content/integrations/<slug>.md`): `title`, `description`, `tag` (used to filter vendors — case-insensitive match against any vendor's `tags` or `category`). Body becomes intro copy; matching vendors render as a card grid.

When you add a referral link to a vendor, drop in the `referralUrl` field — `build.js` automatically swaps the CTA to `rel="noopener sponsored"` and (if `referralPerk` is set) renders an "Exclusive offer" callout.

**Legacy files at repo root** (`attio.html`, `breakcold.html`, `close.html`, `index.html`, `app.js`, `blog.js`, `styles.css`, `crms/`, `blog/`, `images/`, `logos/`, `crm-*.js`, etc.) are from the v1 site and are **not** consumed by `build.js`. The current site is driven entirely by `src/templates/` + `content/` + `public/`. Do not edit the root HTML files thinking you're editing the live site.

### 2. News pipeline (`scripts/news-pipeline/`)

Editorial loop: **fetch → rewrite → draft in Notion → human approve → publish to site**.

- `run-daily.js` — orchestrator. Pulls vendors from the Notion Vendors DB, reads each vendor's `News sources` rich-text column (format: `rss:url`, `scrape:url`, `x:@handle`, `linkedin:slug`, one per line), fetches new items, dedupes against the News DB by `Source URL`, calls Claude (`rewrite.js`) for a journalism-style rewrite, and creates a `draft` row in the Notion News DB.
- `publish-approved.js` — queries News DB where `Status = approved`, writes `content/articles/YYYY-MM-DD-<slug>.md`, runs the build, commits, pushes, and flips rows to `Status = published` with `Channels += website`.
- `rewrite.js` — the Claude rewrite prompt. Model comes from `ANTHROPIC_MODEL` (default `claude-opus-4-6`).
- `notion.js` — Vendors/News DB client.
- `fetchers/` — `rss.js` is wired up; `scrape.js` and `sitemap.js` are stubs. Phase 1 only supports `rss:`; other source types log a warning and skip.
- Utility scripts: `seed-news-db.js` (provisions the Notion News DB schema), `seed-vendor-sources.js`, `discover-feeds.js`, `dedupe-vendors.js`.

The Notion schema is **manual** and exact — column names and select options are hardcoded in `notion.js`. See `scripts/news-pipeline/README.md` for the required columns on the News DB and the `News sources` column shape on the Vendors DB. Both DBs must be shared with the internal integration whose token is in `NOTION_TOKEN`.

`news:dry` is the safe entry point — it uses fixture vendors, needs no keys, and writes JSON to `drafts/`. Use it whenever iterating on the rewrite prompt.

### The content contract

`content/articles/*.md` is the boundary between the pipeline and the site. `publish-approved.js` writes files here; `build.js` reads them. If you're debugging a publish issue, check what ended up in `content/articles/` — that's the source of truth the site builds from.

## Environment

`.env.local` (gitignored) is loaded by the pipeline scripts. Required for `news:daily` and `news:publish`:

```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-opus-4-6
NOTION_TOKEN=secret_...
NOTION_VENDORS_DB_ID=<32-char id from Notion URL>
NOTION_NEWS_DB_ID=<32-char id from Notion URL>
```

`BEEHIIV_API_KEY` / `BEEHIIV_PUB_ID` are placeholders — phase 2, not wired up yet.

## Project context

See `doc.md` for the full product/status writeup: what's working, what's stubbed, the phase-2 plan (Beehiiv newsletter, Playwright posting to X/LinkedIn/Substack), and the target state for cleaning up the legacy root-level files.
