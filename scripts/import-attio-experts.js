#!/usr/bin/env node
// Import Attio Experts from a list of attio.com/experts/:slug URLs.
// Usage: node scripts/import-attio-experts.js <url> [<url> ...]
//   or:  node scripts/import-attio-experts.js --from urls.txt
// Writes content/consultants/<slug>.md (overwrites) and generates a monogram
// SVG in public/logos/consultants/<slug>.svg via gen-consultant-logos.js.

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const CONTENT = path.join(__dirname, '..', 'content', 'consultants');
fs.mkdirSync(CONTENT, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchHtml(new URL(res.headers.location, url).toString()));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(new Error('timeout')); });
  });
}

function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function cleanUrl(u) {
  if (!u) return '';
  let url = decodeEntities(u).replace(/\\u002F/g, '/').replace(/\\\//g, '/');
  try {
    const parsed = new URL(url);
    // Strip UTM and attio-referral tracking noise.
    for (const k of [...parsed.searchParams.keys()]) {
      if (/^utm_/i.test(k) || k === 'ref' || k === 'source') parsed.searchParams.delete(k);
    }
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
}

// PartnerPage widget embeds a single `website:"https:\u002F\u002F..."` field in
// the Nuxt payload — use it preferentially since it's editorially curated.
function pickEmbeddedWebsite(html) {
  const m = html.match(/[,{\s]website:"(https:(?:\\u002F|\/|\\\/)[^"]+)"/);
  return m ? cleanUrl(m[1]) : '';
}

function pickCity(html) {
  const m = html.match(/[,{\s]city:"([^"]{1,80})"/);
  return m ? decodeEntities(m[1]).trim() : '';
}

function pickCountryName(html) {
  const m = html.match(/[,{\s]countryName:"([^"]{1,80})"/);
  return m ? decodeEntities(m[1]).trim() : '';
}

function pickLocation(html) {
  const city = pickCity(html);
  const country = pickCountryName(html);
  if (city && country) return `${city}, ${country}`;
  return city || country || '';
}

function pickExternalWebsite(html) {
  const re = /target="_blank"[^>]*data-test-uibutton=""[^>]*href="(https:\/\/[^"]+)"/g;
  const skip = /(^https:\/\/attio\.com)|(storyblok\.com)|(linkedin\.com\/company\/attio)|(twitter\.com\/attio)|(x\.com\/attio)|(youtube\.com\/@attio)|(intercom\.)|(g2\.com)|(^https:\/\/cal\.com\/)|(calendly\.com)|(calendar\.notion\.so)|(savvycal\.com)|(tidycal\.com)|(eustartup\.news)|(substack\.com)|(github\.com\/attio)|(notion\.site\/)/i;
  const seen = new Set();
  const candidates = [];
  let m;
  while ((m = re.exec(html))) {
    const u = cleanUrl(m[1]);
    if (seen.has(u)) continue;
    seen.add(u);
    if (!skip.test(u)) candidates.push(u);
  }
  return candidates[0] || '';
}

function pickWebsite(html) {
  return pickEmbeddedWebsite(html) || pickExternalWebsite(html);
}

function pickDiscoveryLink(html) {
  const re = /target="_blank"[^>]*href="(https:\/\/(?:cal\.com|calendly\.com|savvycal\.com|tidycal\.com|calendar\.notion\.so)\/[^"]+)"/;
  const m = html.match(re);
  return m ? cleanUrl(m[1]) : '';
}

function parseName(html) {
  const m = html.match(/<title>([^<]+?)(?:\s*[-—|]\s*Attio Expert Directory)?<\/title>/i);
  if (!m) return '';
  return decodeEntities(m[1].replace(/\s*-\s*Attio Expert Directory\s*$/i, '').trim());
}

function parseDescription(html) {
  const m = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
  return m ? decodeEntities(m[1]).trim() : '';
}

function firstSentence(desc) {
  if (!desc) return '';
  // Split on ". " or "! " or "? " — also bail after ~200 chars.
  const cut = desc.match(/^[\s\S]{10,200}?[.!?](?=\s)/);
  return (cut ? cut[0] : desc.slice(0, 180)).replace(/\s+/g, ' ').trim();
}

// Split the long description into paragraphs. Heuristic: break before service
// emoji bullets, "How We Help", "Our approach", "Services", "About us".
function descriptionToMarkdown(desc) {
  if (!desc) return '';
  let text = desc;
  // Insert paragraph breaks before common headings so they render as sections.
  text = text.replace(/\s+(How We Help|Our approach|Our Approach|Services|About Us|About us|Why us|Why Us|What we do|What We Do|The outcome|The Outcome)\s+/g,
                      '\n\n## $1\n\n');
  // Promote emoji-prefixed bullet lines into list items.
  text = text.replace(/\s+(?=(?:🔧|🧠|🤝|🔗|📦|🚀|🎯|💡|🛠|🏗|📊|⚡|✅|📈|🧩|🔍|⚙️))/g, '\n- ');
  // Normalise en/em dashes used as bullet separators.
  text = text.replace(/\n- (\S[^\n]*?)\s[–—-]\s/g, '\n- **$1** — ');
  // Trim duplicate whitespace.
  text = text.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return text;
}

function slugFromUrl(url) {
  const u = new URL(url);
  return u.pathname.replace(/\/+$/, '').split('/').pop();
}

function frontmatterValue(v) {
  if (!v) return '""';
  if (/[:#&*!?|{}[\]<>,`"'%@]/.test(v) || v.includes('\n')) {
    return JSON.stringify(v);
  }
  return JSON.stringify(v);
}

function buildMarkdown({ slug, name, tagline, website, location, profileUrl, discoveryUrl, bodyMd }) {
  const today = new Date().toISOString().slice(0, 10);
  const fm = [
    '---',
    `name: ${frontmatterValue(name)}`,
    `tagline: ${frontmatterValue(tagline)}`,
    `vendor: attio`,
    location ? `location: ${frontmatterValue(location)}` : null,
    website ? `website: ${frontmatterValue(website)}` : null,
    `profileUrl: ${frontmatterValue(profileUrl)}`,
    discoveryUrl ? `discoveryUrl: ${frontmatterValue(discoveryUrl)}` : null,
    `date: ${today}`,
    '---',
    ''
  ].filter(Boolean).join('\n');
  return `${fm}\n${bodyMd}\n`;
}

async function importOne(url) {
  const slug = slugFromUrl(url);
  const html = await fetchHtml(url);
  const name = parseName(html);
  const desc = parseDescription(html);
  const website = pickWebsite(html);
  const location = pickLocation(html);
  const discoveryUrl = pickDiscoveryLink(html);
  const tagline = firstSentence(desc);
  const bodyMd = descriptionToMarkdown(desc);

  const md = buildMarkdown({
    slug, name, tagline, website, location,
    profileUrl: url,
    discoveryUrl,
    bodyMd: bodyMd || `_Profile details coming soon._`
  });

  const file = path.join(CONTENT, `${slug}.md`);
  fs.writeFileSync(file, md);
  return { slug, name, website, location, file };
}

function loadUrls(argv) {
  const fromIdx = argv.indexOf('--from');
  if (fromIdx !== -1 && argv[fromIdx + 1]) {
    return fs.readFileSync(argv[fromIdx + 1], 'utf8')
      .split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  }
  return argv.filter(a => a.startsWith('http'));
}

(async () => {
  const urls = loadUrls(process.argv.slice(2));
  if (!urls.length) {
    console.error('Usage: node import-attio-experts.js <url> [<url> ...]  or  --from urls.txt');
    process.exit(1);
  }
  const results = [];
  const failures = [];
  // Serial to stay polite on attio.com.
  for (const url of urls) {
    try {
      const r = await importOne(url);
      results.push(r);
      const loc = r.location ? ` · ${r.location}` : '';
      console.log(`✓ ${r.slug}  ${r.name}${loc}  ${r.website || '(no website)'}`);
    } catch (e) {
      failures.push({ url, error: e.message });
      console.error(`✗ ${url}  ${e.message}`);
    }
  }
  console.log(`\nImported ${results.length}/${urls.length}.`);
  if (failures.length) {
    console.log('Failures:');
    failures.forEach(f => console.log(`  ${f.url} — ${f.error}`));
  }
  // Regenerate logo tiles to cover any new slugs.
  try {
    execSync('node scripts/gen-consultant-logos.js', { stdio: 'inherit' });
  } catch (e) {
    console.error('Logo generation failed:', e.message);
  }
})();
