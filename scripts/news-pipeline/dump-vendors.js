const { Client } = require('@notionhq/client');
const config = require('./config');
const notion = new Client({ auth: config.notion.token });

(async () => {
  const out = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: config.notion.vendorsDbId,
      start_cursor: cursor,
      page_size: 100
    });
    out.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  // Print all property keys from the first row
  if (out[0]) console.error('PROPS:', Object.keys(out[0].properties));

  const rows = out.map(p => {
    const name = (p.properties.Name?.title || []).map(t => t.plain_text).join('').trim();
    const link = p.properties.Link?.url || '';
    const refLink = p.properties['Referral Link']?.url || '';
    const refFlag = p.properties.referral?.checkbox ?? p.properties.referral?.select?.name ?? '';
    const category = p.properties.Select?.select?.name || p.properties.Category?.select?.name || '';
    return { name, link, refLink, refFlag, category };
  }).filter(r => r.name);

  console.log(JSON.stringify(rows, null, 2));
  console.error(`TOTAL: ${rows.length}`);
})();
