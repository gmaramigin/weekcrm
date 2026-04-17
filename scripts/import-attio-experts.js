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
const LOGOS = path.join(__dirname, '..', 'public', 'logos', 'consultants');
fs.mkdirSync(CONTENT, { recursive: true });
fs.mkdirSync(LOGOS, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

function fetch(url, { binary = false } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': UA, 'Accept': binary ? 'image/*' : 'text/html' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetch(new URL(res.headers.location, url).toString(), { binary }));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve(binary ? { buf, contentType: res.headers['content-type'] || '' } : buf.toString('utf8'));
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(new Error('timeout')); });
  });
}

const fetchHtml = url => fetch(url).catch(err => { throw err; });

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

// The partner's rendered bio lives inside <div class="prose break-words">...</div>.
// Returns the raw inner HTML (first occurrence) or '' if not present.
function parseProseHtml(html) {
  const m = html.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>/);
  return m ? m[1] : '';
}

// Partnerpage.io serves the partner logo via a base64-encoded image-proxy URL
// referenced in og:image / twitter:image. Decode it, extract the S3 key, then
// rebuild a clean square request at 256px.
function parseLogoKey(html) {
  const m = html.match(/<meta[^>]+(?:og:image|twitter:image)[^>]+content="(https:\/\/content\.partnerpage\.io\/[^"?]+)"/i);
  if (!m) return null;
  const b64 = m[1].split('/').pop();
  try {
    const raw = Buffer.from(b64, 'base64').toString('utf8');
    const obj = JSON.parse(raw);
    return obj && obj.key ? { bucket: obj.bucket || 'partnerpage.prod', key: obj.key } : null;
  } catch {
    return null;
  }
}

function buildSquareLogoUrl({ bucket, key }, size = 256) {
  const req = {
    bucket, key,
    edits: {
      toFormat: 'webp',
      resize: { width: size, height: size, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }
    }
  };
  return `https://content.partnerpage.io/${Buffer.from(JSON.stringify(req)).toString('base64')}`;
}

async function downloadLogo(slug, keyObj) {
  if (!keyObj) return false;
  try {
    const url = buildSquareLogoUrl(keyObj, 256);
    const { buf } = await fetch(url, { binary: true });
    // Clear any older monogram SVG for this slug so the real logo wins.
    for (const ext of ['svg', 'png', 'jpg', 'jpeg', 'avif', 'webp']) {
      const p = path.join(LOGOS, `${slug}.${ext}`);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    fs.writeFileSync(path.join(LOGOS, `${slug}.webp`), buf);
    return true;
  } catch (e) {
    console.warn(`  logo download failed for ${slug}: ${e.message}`);
    return false;
  }
}

// Very small HTML → markdown converter for the prose-body shapes partnerpage.io
// emits. Handles <p>, <strong>, <em>, <a>, <br>, <ul>/<ol>, <li>, and
// promotes standalone "<p><strong>Heading</strong></p>" blocks to ## headings.
function htmlToMarkdown(html) {
  if (!html) return '';
  let s = html.trim();

  // Normalise self-closing and voids.
  s = s.replace(/<br\s*\/?>/gi, '\n');

  // Lists: preserve order by walking.
  s = s.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 0;
    return '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => {
      i++;
      return `${i}. ${item.trim()}\n`;
    }) + '\n';
  });
  s = s.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    return '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => {
      return `- ${item.trim()}\n`;
    }) + '\n';
  });

  // Promote <p><strong>X</strong></p> (heading-only paragraphs) to ## X.
  s = s.replace(/<p[^>]*>\s*<strong>([^<]{1,80})<\/strong>\s*<\/p>/gi, '\n\n## $1\n\n');

  // Inline marks.
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  s = s.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
  s = s.replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, txt) => `[${txt.trim()}](${href})`);

  // Paragraphs.
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => `${inner.trim()}\n\n`);

  // Strip any remaining tags.
  s = s.replace(/<[^>]+>/g, '');

  s = decodeEntities(s);

  // Linkify bare URLs that end up on their own line.
  s = s.replace(/^(\s*)(https?:\/\/\S+)\s*$/gm, (_, pre, url) => `${pre}<${url}>`);

  // Collapse whitespace.
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

function firstProseParagraph(proseHtml) {
  const m = proseHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const txt = decodeEntities(m[1].replace(/<[^>]+>/g, '').trim());
  return txt;
}

function pickTagline(proseHtml, fallback) {
  // Scan paragraphs; skip testimonial quotes and bylines until we find a real
  // sentence.
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paras = [];
  let m;
  while ((m = re.exec(proseHtml))) {
    const txt = decodeEntities(m[1].replace(/<[^>]+>/g, '').trim());
    if (txt) paras.push(txt);
  }
  for (const p of paras) {
    // Skip quote-only paragraphs or "-- Name, Title" bylines or single-word headings.
    if (/^["“]/.test(p) && /["”]\s*$/.test(p)) continue;
    if (/^--\s+/.test(p)) continue;
    if (p.split(/\s+/).length < 6) continue;
    return p.length > 220 ? p.slice(0, 217).replace(/\s+\S*$/, '') + '…' : p;
  }
  return fallback ? (fallback.length > 220 ? fallback.slice(0, 217).replace(/\s+\S*$/, '') + '…' : fallback) : '';
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
  const proseHtml = parseProseHtml(html);
  const website = pickWebsite(html);
  const location = pickLocation(html);
  const discoveryUrl = pickDiscoveryLink(html);

  // Prefer the structured prose body; fall back to the flat meta description.
  let bodyMd = htmlToMarkdown(proseHtml);
  if (!bodyMd) bodyMd = descriptionToMarkdown(desc);

  const tagline = pickTagline(proseHtml, firstSentence(desc));

  const logoKey = parseLogoKey(html);
  const logoOk = await downloadLogo(slug, logoKey);

  const md = buildMarkdown({
    slug, name, tagline, website, location,
    profileUrl: url,
    discoveryUrl,
    bodyMd: bodyMd || `_Profile details coming soon._`
  });

  const file = path.join(CONTENT, `${slug}.md`);
  fs.writeFileSync(file, md);
  return { slug, name, website, location, logoOk, file };
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
      const logo = r.logoOk ? ' 🖼' : '';
      console.log(`✓ ${r.slug}${logo}  ${r.name}${loc}  ${r.website || '(no website)'}`);
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
