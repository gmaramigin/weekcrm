// RSS / Atom feed fetcher. Returns a list of normalized news items:
//   { title, url, summary, publishedAt, sourceType: 'rss' }
//
// Resilient to individual feed failures — logs and returns [] for that feed.

const Parser = require('rss-parser');
const parser = new Parser({ timeout: 15000 });

async function fetchRss(url) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).map(item => ({
      title: (item.title || '').trim(),
      url: item.link || item.guid || '',
      summary: stripHtml(item.contentSnippet || item.content || item.summary || ''),
      publishedAt: item.isoDate || item.pubDate || null,
      sourceType: 'rss'
    })).filter(i => i.url && i.title);
  } catch (err) {
    console.warn(`  ⚠ RSS fetch failed for ${url}: ${err.message}`);
    return [];
  }
}

function stripHtml(s) {
  return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

module.exports = { fetchRss };
