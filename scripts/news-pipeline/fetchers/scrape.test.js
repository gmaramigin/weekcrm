// Offline regression test for the scrape fetcher's date recovery.
//   node scripts/news-pipeline/fetchers/scrape.test.js
//
// Guards the changelog-date bug: changelog / "what's new" pages (Folk,
// Vendasta, Keap, …) show each entry's date on the INDEX page but not on the
// entry's own page. The per-article scrape only ever sees the entry page, so
// every item came back undated and run-daily's 24h freshness gate dropped
// them all. extractListingDates + the month-name slug rule recover those dates.

const assert = require('assert');
const { extractListingDates, inferPublishedAt, isTransientHttp } = require('./scrape');

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

  console.log('✓ all scrape date-recovery tests passed');
}

run();
