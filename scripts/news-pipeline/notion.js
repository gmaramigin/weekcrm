// Notion client wrapper.
// Reads vendors + their news sources from your Notion Vendors DB.
// Reads/writes news items in the Notion News DB (the dedupe + review queue).

const { Client } = require('@notionhq/client');
const config = require('./config');

const client = config.isDryRun && !config.notion.token
  ? null
  : new Client({ auth: config.notion.token });

/**
 * Expected Vendors DB schema:
 *   Name           (title)
 *   Website        (url)
 *   Slug           (rich_text, optional — derived from Name if missing)
 *   News sources   (rich_text) — newline-separated, e.g.:
 *                    rss:https://attio.com/blog/rss.xml
 *                    scrape:https://breakcold.com/blog
 *                    x:@attio
 *                    linkedin:attio
 */
async function listVendors() {
  if (!client) return [];
  const pages = [];
  let cursor;
  do {
    const res = await client.databases.query({
      database_id: config.notion.vendorsDbId,
      start_cursor: cursor,
      page_size: 100
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return pages.map(parseVendor);
}

function parseVendor(page) {
  const p = page.properties;
  const name = (p.Name?.title || []).map(t => t.plain_text).join('').trim();
  const slug = (p.Slug?.rich_text || []).map(t => t.plain_text).join('').trim()
    || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const website = p.Website?.url || '';
  const sourcesText = (p['News sources']?.rich_text || []).map(t => t.plain_text).join('');
  const sources = sourcesText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(parseSource)
    .filter(Boolean);
  return { notionPageId: page.id, name, slug, website, sources };
}

function parseSource(line) {
  const colon = line.indexOf(':');
  if (colon === -1) return null;
  const type = line.slice(0, colon).trim().toLowerCase();
  const value = line.slice(colon + 1).trim();
  if (!type || !value) return null;
  return { type, value };
}

/**
 * Expected News DB schema:
 *   Title            (title)
 *   Vendor           (relation to Vendors DB)
 *   Source URL       (url)           ← dedupe key
 *   Source type      (select: rss / scrape / x / linkedin / newsletter)
 *   Original text    (rich_text)
 *   Rewritten text   (rich_text)
 *   Headline         (rich_text)
 *   Status           (select: draft / approved / published / skipped)
 *   Published at     (date)
 *   Channels         (multi_select: website / x / linkedin / substack / beehiiv)
 *   Discovered at    (date)
 */

async function findNewsByUrl(sourceUrl) {
  if (!client) return null;
  const res = await client.databases.query({
    database_id: config.notion.newsDbId,
    filter: { property: 'Source URL', url: { equals: sourceUrl } },
    page_size: 1
  });
  return res.results[0] || null;
}

async function createDraftNews({ title, headline, vendorPageId, sourceUrl, sourceType, originalText, rewrittenText }) {
  if (!client) return null;
  return client.pages.create({
    parent: { database_id: config.notion.newsDbId },
    properties: {
      Title: { title: [{ text: { content: title.slice(0, 200) } }] },
      Vendor: vendorPageId ? { relation: [{ id: vendorPageId }] } : undefined,
      'Source URL': { url: sourceUrl },
      'Source type': { select: { name: sourceType } },
      'Original text': { rich_text: [{ text: { content: originalText.slice(0, 1900) } }] },
      'Rewritten text': { rich_text: [{ text: { content: rewrittenText.slice(0, 1900) } }] },
      Headline: { rich_text: [{ text: { content: headline.slice(0, 200) } }] },
      Status: { select: { name: 'draft' } },
      'Discovered at': { date: { start: new Date().toISOString() } }
    }
  });
}

async function listApprovedNews() {
  if (!client) return [];
  const res = await client.databases.query({
    database_id: config.notion.newsDbId,
    filter: { property: 'Status', select: { equals: 'approved' } },
    page_size: 100
  });
  return res.results.map(parseNewsRow);
}

function parseNewsRow(page) {
  const p = page.properties;
  return {
    notionPageId: page.id,
    title: (p.Title?.title || []).map(t => t.plain_text).join(''),
    headline: (p.Headline?.rich_text || []).map(t => t.plain_text).join(''),
    sourceUrl: p['Source URL']?.url || '',
    sourceType: p['Source type']?.select?.name || '',
    originalText: (p['Original text']?.rich_text || []).map(t => t.plain_text).join(''),
    rewrittenText: (p['Rewritten text']?.rich_text || []).map(t => t.plain_text).join(''),
    vendorPageId: p.Vendor?.relation?.[0]?.id || null
  };
}

async function markPublished(pageId, channels) {
  if (!client) return;
  await client.pages.update({
    page_id: pageId,
    properties: {
      Status: { select: { name: 'published' } },
      'Published at': { date: { start: new Date().toISOString() } },
      Channels: { multi_select: channels.map(name => ({ name })) }
    }
  });
}

module.exports = {
  listVendors,
  findNewsByUrl,
  createDraftNews,
  listApprovedNews,
  markPublished
};
