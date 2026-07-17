// Offline regression test for the scrape fetcher's date recovery.
//   node scripts/news-pipeline/fetchers/scrape.test.js
//
// Guards the changelog-date bug: changelog / "what's new" pages (Folk,
// Vendasta, Keap, …) show each entry's date on the INDEX page but not on the
// entry's own page. The per-article scrape only ever sees the entry page, so
// every item came back undated and run-daily's 24h freshness gate dropped
// them all. extractListingDates + the month-name slug rule recover those dates.

const assert = require('assert');
const { extractListingDates, inferPublishedAt, isTransientHttp, extractArticleLinks } = require('./scrape');

function run() {
  // 1. Folk-shaped listing: the date is plain text in an ancestor of the link.
  //    Three entries — each link must resolve to its OWN entry's date, proving
  //    the closest-ancestor walk doesn't bleed a neighbour's date across
  //    entries. Entry C reproduces the real-world bug: rendered text concats
  //    with no separator ("…2026Feature C…"), so the date butts against a
  //    letter and a \b-anchored pattern would miss it.
  const folk = `<!doctype html><html><body>
    <div class="list">
      <div class="entry">
        <div><div><a href="/changelog/feature-a">Feature A</a></div></div>
        <div class="date">April 23, 2026</div>
      </div>
      <div class="entry">
        <div><div><a href="/changelog/feature-b">Feature B</a></div></div>
        <div class="date">May 19, 2026</div>
      </div>
      <div class="entry"><span>March 3, 2026</span><a href="/changelog/feature-c">Feature C ships</a></div>
    </div>
  </body></html>`;
  const folkDates = extractListingDates(folk, 'https://www.folk.app/changelog');
  assert.strictEqual(folkDates.get('https://www.folk.app/changelog/feature-a'),
    '2026-04-23T12:00:00.000Z', 'Folk: link A must get its own (closest) date');
  assert.strictEqual(folkDates.get('https://www.folk.app/changelog/feature-b'),
    '2026-05-19T12:00:00.000Z', "Folk: link B must get its own date, not the neighbour's");
  assert.strictEqual(folkDates.get('https://www.folk.app/changelog/feature-c'),
    '2026-03-03T12:00:00.000Z', 'Folk: date butting against a letter must still parse');

  // 2. Vendasta-shaped listing: the date is a <time datetime> in an ancestor.
  const vendasta = `<!doctype html><html><body>
    <div class="changelog">
      <div class="post">
        <header><div><a href="/changelog/entry-one">Entry One</a></div></header>
        <div><time datetime="2026-05-19T19:59:23.492Z">May 19, 2026</time></div>
      </div>
    </div>
  </body></html>`;
  const vDates = extractListingDates(vendasta, 'https://roadmap.vendasta.com/changelog');
  assert.strictEqual(vDates.get('https://roadmap.vendasta.com/changelog/entry-one'),
    '2026-05-19T19:59:23.492Z', 'Vendasta: a <time datetime> in an ancestor wins');

  // 3. A link with no date anywhere is simply absent from the map.
  const bare = `<!doctype html><html><body><a href="/x">x</a></body></html>`;
  assert.strictEqual(extractListingDates(bare, 'https://e.com/').has('https://e.com/x'), false,
    'links with no nearby date must not appear in the map');

  // 4. Missing / unusable HTML must not throw — returns an empty map.
  assert.strictEqual(extractListingDates(null, 'https://e.com/').size, 0,
    'null html → empty map, no throw');

  // 5. inferPublishedAt: month-name slug (Keap: /product-updates/december-2025).
  assert.strictEqual(inferPublishedAt('https://keap.com/product-updates/december-2025', ''),
    '2025-12-01T12:00:00.000Z', 'month-name slug → first of that month');
  assert.strictEqual(inferPublishedAt('https://keap.com/product-updates/march-2024', ''),
    '2024-03-01T12:00:00.000Z', 'month-name slug (march-2024)');
  // existing /YYYY/MM/DD/ behaviour must still work
  assert.strictEqual(inferPublishedAt('https://x.com/blog/2026/04/15/post', ''),
    '2026-04-15T12:00:00.000Z', 'numeric date path still parsed');
  // a dateless slug must not invent a date
  assert.strictEqual(inferPublishedAt('https://x.com/blog/some-feature-launch', ''), null,
    'a dateless slug must not invent a date');

  // 6. isTransientHttp: Node fetch() failures carry the real code on err.cause,
  //    not err.message — the retry-once in fetchHtmlStatic depends on reading it.
  assert.strictEqual(
    isTransientHttp(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } })),
    true, 'cause.code ENOTFOUND must read as transient');
  assert.strictEqual(
    isTransientHttp(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } })),
    true, 'cause.code ECONNRESET must read as transient');
  assert.strictEqual(isTransientHttp(new Error('HTTP 503')), true, '5xx is transient');
  assert.strictEqual(isTransientHttp(new Error('HTTP 404')), false, '404 is NOT transient');

  // 7. extractArticleLinks: a "browse by year" changelog nav (Attio-shaped)
  //    must not crowd out real article links out of the MAX_ITEMS budget.
  //    Regression for: configuring the vendor source as the bare
  //    `/changelog` listing (which the site 301s to `/changelog/2026`) picked
  //    up `/changelog/2021`..`/changelog/2026` as if they were articles,
  //    consuming 6 of 8 slots and starving out real entries.
  const yearNav = `<!doctype html><html><body>
    <nav>
      <a href="/changelog/2024">2024</a>
      <a href="/changelog/2025">2025</a>
      <a href="/changelog/2026">2026</a>
    </nav>
    <div class="entries">
      <a href="/changelog/2026/feature-one">Feature one</a>
      <a href="/changelog/2026/feature-two">Feature two</a>
    </div>
  </body></html>`;
  const yearNavLinks = extractArticleLinks(yearNav, 'https://example.com/changelog', 8);
  assert.deepStrictEqual(yearNavLinks, [
    'https://example.com/changelog/2026/feature-one',
    'https://example.com/changelog/2026/feature-two'
  ], 'bare-year nav links must be excluded so real articles fill the budget');

  // 8. extractArticleLinks tier 2: a category/tag listing whose articles live
  //    under the PARENT content root, not under the listing path itself.
  //    Daylite-shaped: listing /blog/category/release/, articles /blog/<slug>.
  //    The strict basePath-prefix rule found nothing here — every one of these
  //    sources reported "no article links found".
  const daylite = `<!doctype html><html><body>
    <a href="/blog/">Blog home</a>
    <a href="/blog/category/release/page/2/">Next page</a>
    <a href="/why-daylite/">Why Daylite</a>
    <a href="/blog/mail-in-daylite-enhancements/">Mail enhancements</a>
    <a href="/blog/google-calendar-sync-for-mac/">Calendar sync</a>
  </body></html>`;
  assert.deepStrictEqual(
    extractArticleLinks(daylite, 'https://www.daylite.app/blog/category/release/'),
    [
      'https://www.daylite.app/blog/mail-in-daylite-enhancements/',
      'https://www.daylite.app/blog/google-calendar-sync-for-mac/'
    ], 'category listing must fall back to articles under the parent content root');

  // 9. Tier 2, Zoho-shaped: listing /blog/tag/product-updates, articles nested
  //    one section deeper (/blog/crm/q1-2026-update.html). Section indexes
  //    (/blog/crm) and author pages must not slip through.
  const zoho = `<!doctype html><html><body>
    <a href="/blog/crm/q1-2026-update.html">Q1 update</a>
    <a href="/blog/crm">CRM section</a>
    <a href="/blog/author/shashank-mk">Author</a>
    <a href="/blog/flow/hundred-wordpress-plugins-milestone.html">Flow milestone</a>
  </body></html>`;
  assert.deepStrictEqual(
    extractArticleLinks(zoho, 'https://www.zoho.com/blog/tag/product-updates'),
    [
      'https://www.zoho.com/blog/crm/q1-2026-update.html',
      'https://www.zoho.com/blog/flow/hundred-wordpress-plugins-milestone.html'
    ], 'tag listing must keep nested articles but drop section indexes and author pages');

  // 10. Tier 3, Wealthbox-shaped: listing /category/product-company/ with
  //     articles at the SITE ROOT. Only long hyphenated slugs (3+ words) count
  //     as articles — short nav paths must stay excluded.
  const wealthbox = `<!doctype html><html><body>
    <a href="/product-tours/">Product tours</a>
    <a href="/solutions/family-offices/">Family offices</a>
    <a href="/blog/">Blog</a>
    <a href="/category/product-company/page/2/">Page 2</a>
    <a href="/5-updates-to-ai-notetaker/">5 updates to AI notetaker</a>
    <a href="/wealthbox-launches-new-reporting-suite/">Reporting suite</a>
  </body></html>`;
  assert.deepStrictEqual(
    extractArticleLinks(wealthbox, 'https://www.wealthbox.com/category/product-company/'),
    [
      'https://www.wealthbox.com/5-updates-to-ai-notetaker/',
      'https://www.wealthbox.com/wealthbox-launches-new-reporting-suite/'
    ], 'root-level article slugs must be found when the listing path holds nothing');

  // 11a. A site-root listing (homepage configured as source, or a listing that
  //      redirected to a rebranded homepage) must use the slug heuristic, not
  //      treat every nav link as an article.
  const homepage = `<!doctype html><html><body>
    <a href="/pricing/">Pricing</a>
    <a href="/features/">Features</a>
    <a href="/introducing-our-new-automation-engine/">Launch post</a>
  </body></html>`;
  assert.deepStrictEqual(
    extractArticleLinks(homepage, 'https://example.com/'),
    ['https://example.com/introducing-our-new-automation-engine/'],
    'site-root listing must only keep long hyphenated slugs');

  // 11. The fallbacks must NOT fire when the listing path itself has articles —
  //     tier 1 keeps its strict behaviour (no nav-noise regressions).
  const strict = `<!doctype html><html><body>
    <a href="/changelog/new-workflows">New workflows</a>
    <a href="/some-random-marketing-page-with-long-slug/">Marketing</a>
  </body></html>`;
  assert.deepStrictEqual(
    extractArticleLinks(strict, 'https://example.com/changelog'),
    ['https://example.com/changelog/new-workflows'],
    'when tier 1 finds articles, looser tiers must not add noise');

  console.log('✓ all scrape date-recovery tests passed');
}

run();
