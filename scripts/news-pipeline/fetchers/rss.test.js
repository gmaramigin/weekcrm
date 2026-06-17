// Offline regression test for the RSS fetcher's normalization.
//   node scripts/news-pipeline/fetchers/rss.test.js
//
// Guards the bulk-stamp bug: OTRS's "Release Notes Archive" feed stamps every
// release note — across multiple years — with one identical pubDate (the feed
// regeneration time). That made the 24h freshness gate in run-daily.js draft
// years-old releases whenever the pipeline ran within 24h of a regeneration.

const assert = require('assert');
const Parser = require('rss-parser');
const { mapFeedItems, datesAreUnreliable, isTransient } = require('./rss');

function rssXml(items) {
  const body = items.map(it => `
    <item>
      <title>${it.title}</title>
      <link>${it.link}</link>
      <pubDate>${it.pubDate}</pubDate>
    </item>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel><title>Test feed</title>${body}</channel></rss>`;
}

async function run() {
  const parser = new Parser();

  // 1. Archive feed: 6 release notes spanning years, all stamped within
  //    seconds of each other (the real OTRS feed shape) → flagged unreliable.
  const archive = await parser.parseString(rssXml([
    { title: 'OTRS 2024.6.1', link: 'https://otrs.com/releasenote/otrs-2024-6-1/', pubDate: 'Mon, 18 May 2026 07:06:10 +0000' },
    { title: 'OTRS 2025.7.3', link: 'https://otrs.com/releasenote/otrs-2025-7-3/', pubDate: 'Mon, 18 May 2026 07:06:10 +0000' },
    { title: 'OTRS 2025.8.1', link: 'https://otrs.com/releasenote/otrs-2025-8-1/', pubDate: 'Mon, 18 May 2026 07:06:10 +0000' },
    { title: 'OTRS 2025.9.1', link: 'https://otrs.com/releasenote/otrs-2025-9-1/', pubDate: 'Mon, 18 May 2026 07:06:10 +0000' },
    { title: 'OTRS 2026.1.1', link: 'https://otrs.com/releasenote/otrs-2026-1-1/', pubDate: 'Mon, 18 May 2026 07:06:09 +0000' },
    { title: 'OTRS 2026.4.1', link: 'https://otrs.com/releasenote/otrs-2026-4-1/', pubDate: 'Mon, 18 May 2026 07:06:10 +0000' }
  ]));
  const archiveItems = mapFeedItems(archive);
  assert.strictEqual(datesAreUnreliable(archiveItems), true,
    'archive feed (6 items within seconds) should be flagged as bulk-stamped');

  // 2. Organic feed: 6 posts spread across months → dates are real, keep them.
  const organic = await parser.parseString(rssXml([
    { title: 'Post A', link: 'https://x.com/a', pubDate: 'Tue, 14 Jan 2026 09:00:00 +0000' },
    { title: 'Post B', link: 'https://x.com/b', pubDate: 'Wed, 12 Feb 2026 09:00:00 +0000' },
    { title: 'Post C', link: 'https://x.com/c', pubDate: 'Thu, 13 Mar 2026 09:00:00 +0000' },
    { title: 'Post D', link: 'https://x.com/d', pubDate: 'Fri, 10 Apr 2026 09:00:00 +0000' },
    { title: 'Post E', link: 'https://x.com/e', pubDate: 'Mon, 18 May 2026 09:00:00 +0000' },
    { title: 'Post F', link: 'https://x.com/f', pubDate: 'Tue, 19 May 2026 09:00:00 +0000' }
  ]));
  assert.strictEqual(datesAreUnreliable(mapFeedItems(organic)), false,
    'organic feed with months of date spread must NOT be flagged');

  // 3. Tiny feed: 3 same-day items — below the count threshold, not judged
  //    (a vendor genuinely posting 3 items in a day must not be penalized).
  const tiny = await parser.parseString(rssXml([
    { title: 'T1', link: 'https://x.com/t1', pubDate: 'Mon, 18 May 2026 07:00:00 +0000' },
    { title: 'T2', link: 'https://x.com/t2', pubDate: 'Mon, 18 May 2026 07:00:00 +0000' },
    { title: 'T3', link: 'https://x.com/t3', pubDate: 'Mon, 18 May 2026 07:00:00 +0000' }
  ]));
  assert.strictEqual(datesAreUnreliable(mapFeedItems(tiny)), false,
    'feeds with fewer than 5 dated items should not be judged');

  // 4. isTransient: Node fetch() reports network failures as `fetch failed`
  //    with the real code nested on err.cause. The retry-once in fetchRss only
  //    fires if isTransient reads the cause chain, not just err.message.
  assert.strictEqual(
    isTransient(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } })),
    true, 'transient: cause.code ECONNRESET');
  assert.strictEqual(
    isTransient(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } })),
    true, 'transient: cause.code ENOTFOUND');
  assert.strictEqual(isTransient(new Error('HTTP 502')), true, 'transient: 5xx');
  assert.strictEqual(isTransient(new Error('HTTP 404')), false, 'not transient: 404');

  console.log('✓ all rss normalization tests passed');
}

run().catch(err => { console.error('✗ test failed:', err.message); process.exit(1); });
