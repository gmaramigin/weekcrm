// Dispatches a vendor's source declarations to the right fetcher.
// New source types (x, linkedin, scrape) plug in here.

const { fetchRss } = require('./rss');

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
      case 'x':
      case 'linkedin':
      case 'newsletter':
        // TODO phase 2
        console.warn(`  ⚠ source type '${source.type}' not yet implemented (vendor=${vendor.name})`);
        break;
      default:
        console.warn(`  ⚠ unknown source type '${source.type}' (vendor=${vendor.name})`);
    }
    for (const item of fetched) items.push({ ...item, vendor });
  }
  return items;
}

module.exports = { fetchVendorNews };
