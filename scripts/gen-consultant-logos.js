// Generate SVG monogram logos for each consultant in content/consultants/.
// Deterministic color from slug so rebuilds are stable. Writes to
// public/logos/consultants/<slug>.svg. Safe to re-run.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONSULTANTS = path.join(__dirname, '..', 'content', 'consultants');
const OUT = path.join(__dirname, '..', 'public', 'logos', 'consultants');
fs.mkdirSync(OUT, { recursive: true });

function hueFor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % 360;
}

function initials(name) {
  // Strip trademark/registered marks, non-letter leading symbols.
  const cleaned = name.replace(/[®™©]/g, '').trim();
  const words = cleaned.split(/[\s\-_]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function svgFor(slug, name) {
  const hue = hueFor(slug);
  const bgFrom = `hsl(${hue}, 65%, 45%)`;
  const bgTo = `hsl(${(hue + 30) % 360}, 65%, 55%)`;
  const text = initials(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgFrom}"/>
      <stop offset="100%" stop-color="${bgTo}"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#g)"/>
  <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="52" font-weight="700" fill="#ffffff"
        letter-spacing="-1">${text}</text>
</svg>`;
}

const LOGO_EXTS = ['webp', 'png', 'jpg', 'jpeg', 'avif', 'svg'];
function hasLogo(slug) {
  return LOGO_EXTS.some(ext => fs.existsSync(path.join(OUT, `${slug}.${ext}`)));
}

const files = fs.readdirSync(CONSULTANTS).filter(f => f.endsWith('.md'));
let wrote = 0;
let skipped = 0;
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  if (hasLogo(slug)) { skipped++; continue; }
  const { data } = matter(fs.readFileSync(path.join(CONSULTANTS, f), 'utf8'));
  const svg = svgFor(slug, data.name || slug);
  fs.writeFileSync(path.join(OUT, `${slug}.svg`), svg);
  wrote++;
}
console.log(`Consultant logos: wrote ${wrote} monograms, kept ${skipped} existing.`);
