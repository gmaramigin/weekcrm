// Dispatches a vendor's source declarations to the right fetcher,
// then filters out generic blog posts so only product news survives.

const { fetchRss } = require('./rss');
const { fetchScrape } = require('./scrape');
const { fetchSitemap } = require('./sitemap');

// URL path patterns that strongly imply a product update page.
const PRODUCT_NEWS_URL = [
  /\/changelog\b/i,
  /\/release[-_]?notes?\b/i,
  /\/product[-_]?updates?\b/i,
  /\/whats[-_]?new\b/i,
  /\/updates?\/\d/i,
  /\/news\/\d/i
];

// Title keywords that indicate a real product announcement.
const PRODUCT_TITLE = new RegExp(
  '\\b(' + [
    'introducing', 'introduces', 'launch(es|ed|ing)?', 'announc(e|es|ed|ing|ement)',
    'release[ds]?', 'released', 'rolling out', 'rolls out', 'ships?', 'shipped',
    'now available', 'now live', 'now supports?', 'new feature', 'new in',
    'adds?', 'brings?', 'arrives', 'beta', 'general availability', 'public preview',
    'update[ds]?', 'upgraded?', 'redesigned', 'refresh(ed|es)?', 'rebuilt',
    'debut[s]?', 'unveil[s]?', 'version \\d', "v\\d"
  ].join('|') + ')\\b',
  'i'
);

// Title keywords that indicate a generic blog/listicle — filter out.
const GENERIC_TITLE = new RegExp(
  '\\b(' + [
    'best\\s', 'top\\s+\\d', 'how to', 'vs\\.?\\s', 'versus',
    'alternatives?\\b', 'guide(\\s+to)?', 'tier list', 'ultimate',
    'tips( and| &)? tricks', 'why (you|your|use|choose)', 'compared\\b',
    'comparison', 'what is', 'checklist', 'examples?\\b', 'templates?\\b',
    'definition', 'explained', 'cheat sheet'
  ].join('|') + ')',
  'i'
);

function isProductNews(item) {
  if (item._bypassProductFilter) return true;
  const url = (item.url || '').toLowerCase();
  if (PRODUCT_NEWS_URL.some(r => r.test(url))) return true;
  const title = item.title || '';
  if (GENERIC_TITLE.test(title)) return false;
  return PRODUCT_TITLE.test(title);
}

async function fetchVendorNews(vendor) {
  const items = [];
  for (const source of vendor.sources || []) {
    let fetched = [];
    switch (source.type) {
      case 'rss':
      case 'atom':
      case 'feed':
        fetched = await fetchRss(source.value);
        break;
      case 'scrape':
        fetched = await fetchScrape(source.value);
        break;
      case 'sitemap':
        fetched = await fetchSitemap(source.value);
        break;
      case 'x':
      case 'linkedin':
      case 'newsletter':
        console.warn(`  ⚠ source type '${source.type}' not yet implemented (vendor=${vendor.name})`);
        break;
      default:
        console.warn(`  ⚠ unknown source type '${source.type}' (vendor=${vendor.name})`);
    }

    const before = fetched.length;
    const kept = fetched.filter(isProductNews);
    const dropped = before - kept.length;
    if (dropped > 0) {
      console.log(`    ${kept.length}/${before} items kept (${dropped} generic blog posts filtered out)`);
    }
    for (const item of kept) items.push({ ...item, vendor });
  }
  return items;
}

module.exports = { fetchVendorNews, isProductNews };
