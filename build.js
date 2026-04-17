const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');
const { marked } = require('marked');

// ── Config ──────────────────────────────────────────────
const DIST = path.join(__dirname, 'dist');
const CONTENT = path.join(__dirname, 'content');
const TEMPLATES = path.join(__dirname, 'src', 'templates');
const PUBLIC = path.join(__dirname, 'public');
const SRC = path.join(__dirname, 'src');

// ── Helpers ─────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES, `${name}.html`), 'utf8');
}

function render(template, vars) {
  let html = template;
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value ?? '');
  }
  return html;
}

function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      const slug = f.replace('.md', '');
      return { ...data, slug, content, html: marked(content) };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Avatar for a consultant: prefers a real logo from public/logos/consultants/<slug>.<ext>,
// falls back to a monogram tile.
const CONSULTANT_LOGO_DIR = path.join(PUBLIC, 'logos', 'consultants');
function resolveConsultantLogo(slug) {
  for (const ext of LOGO_EXTS) {
    if (fs.existsSync(path.join(CONSULTANT_LOGO_DIR, `${slug}.${ext}`))) {
      return `/logos/consultants/${slug}.${ext}`;
    }
  }
  return null;
}
function renderConsultantAvatar(consultant, sizeClass = '') {
  const logo = resolveConsultantLogo(consultant.slug);
  if (logo) {
    return `<span class="vendor-logo consultant-avatar ${sizeClass}"><img src="${logo}" alt="${consultant.name} logo" loading="lazy"></span>`;
  }
  const name = consultant.name || consultant.slug || '?';
  const initials = name.replace(/[®™©]/g, '').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return `<span class="vendor-logo vendor-logo-fallback ${sizeClass}" style="background:${monogramColor(consultant.slug)}">${initials}</span>`;
}

// Auto-resolve a vendor logo by slug from public/logos/<slug>.<ext>.
// Returns the public URL (e.g. "/logos/attio.webp") or null if none exists.
const LOGO_EXTS = ['svg', 'webp', 'png', 'jpg', 'jpeg', 'avif'];
function resolveLogo(slug) {
  for (const ext of LOGO_EXTS) {
    if (fs.existsSync(path.join(PUBLIC, 'logos', `${slug}.${ext}`))) {
      return `/logos/${slug}.${ext}`;
    }
  }
  return null;
}

// Deterministic pastel color from a string, for monogram fallbacks.
function monogramColor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360}, 55%, 55%)`;
}

// Render a vendor logo: <img> if file exists, otherwise a colored monogram tile.
function renderLogo(vendor, sizeClass = '') {
  const logo = vendor.logo || resolveLogo(vendor.slug);
  if (logo) {
    return `<span class="vendor-logo ${sizeClass}"><img src="${logo}" alt="${vendor.title} logo" loading="lazy"></span>`;
  }
  const initial = (vendor.title || vendor.slug || '?').charAt(0).toUpperCase();
  return `<span class="vendor-logo vendor-logo-fallback ${sizeClass}" style="background:${monogramColor(vendor.slug)}">${initial}</span>`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function excerpt(html, len = 160) {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > len ? text.slice(0, len) + '...' : text;
}

// ── Build ───────────────────────────────────────────────
function build() {
  const start = Date.now();
  console.log('Building WeekCRM...');

  // Clean & prepare
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  ensureDir(DIST);

  // Copy static assets
  copyDir(PUBLIC, DIST);
  ensureDir(path.join(DIST, 'assets'));
  copyDir(path.join(SRC, 'css'), path.join(DIST, 'assets'));
  copyDir(path.join(SRC, 'js'), path.join(DIST, 'assets'));

  // Compute a content hash for the CSS so we can cache-bust on every change
  const cssPath = path.join(SRC, 'css', 'style.css');
  const cssHash = fs.existsSync(cssPath)
    ? crypto.createHash('md5').update(fs.readFileSync(cssPath)).digest('hex').slice(0, 8)
    : Date.now().toString(36);

  // Load templates
  const baseTemplate = readTemplate('base');
  const homeTemplate = readTemplate('home');
  const articleTemplate = readTemplate('article');
  const newsTemplate = readTemplate('news');
  const vendorTemplate = readTemplate('vendor');
  const directoryTemplate = readTemplate('directory');
  const consultantsTemplate = readTemplate('consultants');
  const consultantTemplate = readTemplate('consultant');

  // Load content
  const articles = readMarkdownFiles(path.join(CONTENT, 'articles'));
  const vendors = readMarkdownFiles(path.join(CONTENT, 'vendors'));
  const consultants = readMarkdownFiles(path.join(CONTENT, 'consultants'));

  // ── Homepage ────────────────────────────────────────
  const latestArticles = articles.slice(0, 6);
  const articleCards = latestArticles.map(a => `
    <article class="card">
      <div class="card-meta">
        <time datetime="${a.date}">${formatDate(a.date)}</time>
        ${(a.tags || []).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <h3 class="card-title"><a href="/news/${a.slug}">${a.title}</a></h3>
      <p class="card-excerpt">${a.description || excerpt(a.html)}</p>
    </article>
  `).join('');

  // Featured = fixed curated list by slug (order preserved).
  const FEATURED_SLUGS = ['hubspot', 'attio', 'pipedrive', 'monday', 'folk', 'capsule', 'close', 'breakcold'];
  const vendorBySlug = Object.fromEntries(vendors.map(v => [v.slug, v]));
  const featuredVendors = FEATURED_SLUGS
    .map(slug => vendorBySlug[slug])
    .filter(Boolean)
    .map(v => `
    <a href="/vendors/${v.slug}" class="vendor-badge">
      ${renderLogo(v, 'vendor-logo-sm')}
      <span class="vendor-badge-name">${v.title}</span>
    </a>
  `).join('');

  const homeHtml = render(homeTemplate, {
    articleCards,
    featuredVendors,
    articleCount: articles.length.toString(),
    vendorCount: vendors.length.toString()
  });

  const homePage = render(baseTemplate, {
    title: 'WeekCRM — CRM News, Reviews & Vendor Directory',
    description: 'Stay on top of the CRM world. News, honest reviews, pricing updates, and a growing directory of CRM vendors.',
    url: 'https://weekcrm.com',
    body: homeHtml,
    bodyClass: 'home',
    assetVersion: cssHash
  });
  fs.writeFileSync(path.join(DIST, 'index.html'), homePage);

  // ── News listing ────────────────────────────────────
  const allArticleCards = articles.map(a => `
    <article class="card">
      <div class="card-meta">
        <time datetime="${a.date}">${formatDate(a.date)}</time>
        ${(a.tags || []).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <h3 class="card-title"><a href="/news/${a.slug}">${a.title}</a></h3>
      <p class="card-excerpt">${a.description || excerpt(a.html)}</p>
    </article>
  `).join('');

  const newsHtml = render(newsTemplate, { articleCards: allArticleCards });
  const newsPage = render(baseTemplate, {
    title: 'CRM News & Updates — WeekCRM',
    description: 'Latest news, feature updates, and pricing changes across the CRM industry.',
    url: 'https://weekcrm.com/news',
    body: newsHtml,
    bodyClass: '',
    assetVersion: cssHash
  });
  ensureDir(path.join(DIST, 'news'));
  fs.writeFileSync(path.join(DIST, 'news', 'index.html'), newsPage);

  // ── Individual articles ─────────────────────────────
  for (const article of articles) {
    const tagsHtml = (article.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const articleHtml = render(articleTemplate, {
      title: article.title,
      date: formatDate(article.date),
      dateISO: article.date,
      tags: tagsHtml,
      content: article.html,
      description: article.description || excerpt(article.html)
    });

    const page = render(baseTemplate, {
      title: `${article.title} — WeekCRM`,
      description: article.description || excerpt(article.html),
      url: `https://weekcrm.com/news/${article.slug}`,
      body: articleHtml,
      bodyClass: '',
      assetVersion: cssHash
    });

    const articleDir = path.join(DIST, 'news', article.slug);
    ensureDir(articleDir);
    fs.writeFileSync(path.join(articleDir, 'index.html'), page);
  }

  // ── Vendor directory ────────────────────────────────
  const vendorCards = vendors.map(v => {
    const tags = (v.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <a href="/vendors/${v.slug}" class="vendor-card" data-category="${(v.category || '').toLowerCase()}">
        <div class="vendor-card-header">
          ${renderLogo(v, 'vendor-logo-md')}
          <div class="vendor-card-heading">
            <h3 class="vendor-card-name">${v.title}</h3>
            ${v.category ? `<span class="vendor-card-category">${v.category}</span>` : ''}
          </div>
        </div>
        <p class="vendor-card-desc">${v.description || ''}</p>
        <div class="vendor-card-tags">${tags}</div>
      </a>
    `;
  }).join('');

  const directoryHtml = render(directoryTemplate, { vendorCards });
  const directoryPage = render(baseTemplate, {
    title: 'CRM Directory — WeekCRM',
    description: 'Compare CRM vendors with honest reviews, real pros and cons, and pricing guidance.',
    url: 'https://weekcrm.com/vendors',
    body: directoryHtml,
    bodyClass: '',
    assetVersion: cssHash
  });
  ensureDir(path.join(DIST, 'vendors'));
  fs.writeFileSync(path.join(DIST, 'vendors', 'index.html'), directoryPage);

  // ── Individual vendor pages ─────────────────────────
  for (const vendor of vendors) {
    // Find related articles
    const related = articles
      .filter(a => (a.tags || []).some(t => t.toLowerCase() === vendor.slug.toLowerCase() || t.toLowerCase() === (vendor.title || '').toLowerCase()))
      .slice(0, 4);

    const relatedHtml = related.length ? related.map(a => `
      <article class="card">
        <div class="card-meta">
          <time datetime="${a.date}">${formatDate(a.date)}</time>
        </div>
        <h3 class="card-title"><a href="/news/${a.slug}">${a.title}</a></h3>
        <p class="card-excerpt">${a.description || excerpt(a.html)}</p>
      </article>
    `).join('') : '<p class="empty-state">No articles yet.</p>';

    const tagsHtml = (vendor.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    // Referral-aware CTA: referralUrl (if set) replaces the "Visit website" link.
    // When a referralPerk is also set, we render a highlighted callout above the body.
    const hasReferral = !!vendor.referralUrl;
    const visitUrl = hasReferral ? vendor.referralUrl : (vendor.website || '');
    const visitLabel = vendor.referralPerk ? 'Claim offer' : 'Visit website';
    const visitRel = hasReferral ? 'noopener sponsored' : 'noopener nofollow';
    const perkBlock = vendor.referralPerk
      ? `<div class="vendor-perk">
           <span class="vendor-perk-tag">Exclusive offer</span>
           <strong class="vendor-perk-text">${vendor.referralPerk}</strong>
           <a href="${vendor.referralUrl}" target="_blank" rel="noopener sponsored" class="vendor-perk-cta">Claim via WeekCRM →</a>
         </div>`
      : '';

    const vendorHtml = render(vendorTemplate, {
      title: vendor.title,
      description: vendor.description || '',
      website: vendor.website || '',
      websiteDisplay: (vendor.website || '').replace(/^https?:\/\//, '').replace(/\/$/, ''),
      visitUrl,
      visitLabel,
      visitRel,
      perkBlock,
      tags: tagsHtml,
      content: vendor.html,
      relatedArticles: relatedHtml,
      rating: vendor.rating || '',
      pricing: vendor.pricing || '',
      category: vendor.category || 'CRM',
      logo: renderLogo(vendor, 'vendor-logo-lg')
    });

    const page = render(baseTemplate, {
      title: `${vendor.title} — WeekCRM`,
      description: vendor.description || `Learn about ${vendor.title} — features, pricing, and honest review.`,
      url: `https://weekcrm.com/vendors/${vendor.slug}`,
      body: vendorHtml,
      bodyClass: '',
      assetVersion: cssHash
    });

    const vendorDir = path.join(DIST, 'vendors', vendor.slug);
    ensureDir(vendorDir);
    fs.writeFileSync(path.join(vendorDir, 'index.html'), page);
  }

  // ── Consultants directory ───────────────────────────
  const consultantCard = c => {
    const serviceTags = (c.services || []).slice(0, 3)
      .map(s => `<span class="tag">${s}</span>`).join('');
    const vendorSlug = c.vendor || '';
    const vendorLabel = vendorBySlug[vendorSlug]?.title || vendorSlug;
    const tier = (c.tier || '').toLowerCase();
    return `
      <a href="/consultants/${c.slug}" class="consultant-card"
         data-vendor="${vendorSlug}"
         data-tier="${tier}">
        <div class="consultant-card-header">
          ${renderConsultantAvatar(c, 'vendor-logo-md')}
          <div class="consultant-card-heading">
            <h3 class="consultant-card-name">${c.name}</h3>
            <span class="consultant-card-vendor">
              ${vendorLabel ? `${vendorLabel} Expert` : 'CRM Expert'}${c.tier ? ` · ${c.tier}` : ''}
            </span>
          </div>
        </div>
        <p class="consultant-card-desc">${c.tagline || ''}</p>
        <div class="consultant-card-tags">${serviceTags}</div>
      </a>
    `;
  };

  const consultantCards = consultants.map(consultantCard).join('');

  // Vendor filter buttons: only vendors with at least one consultant.
  const vendorsWithConsultants = [...new Set(consultants.map(c => c.vendor).filter(Boolean))];
  const vendorFilters = vendorsWithConsultants.map(slug => {
    const label = vendorBySlug[slug]?.title || slug;
    return `<button class="filter-btn" data-vendor="${slug}">${label}</button>`;
  }).join('');

  const consultantsHtml = render(consultantsTemplate, { consultantCards, vendorFilters });
  const consultantsPage = render(baseTemplate, {
    title: 'CRM Consultants & Experts — WeekCRM',
    description: 'Find vetted CRM consultants, implementation partners, and migration specialists. Browse Attio Experts and more.',
    url: 'https://weekcrm.com/consultants',
    body: consultantsHtml,
    bodyClass: '',
    assetVersion: cssHash
  });
  ensureDir(path.join(DIST, 'consultants'));
  fs.writeFileSync(path.join(DIST, 'consultants', 'index.html'), consultantsPage);

  // ── Individual consultant pages ─────────────────────
  for (const consultant of consultants) {
    const vendorSlug = consultant.vendor || '';
    const vendorLabel = vendorBySlug[vendorSlug]?.title || vendorSlug;
    const serviceTags = (consultant.services || [])
      .map(s => `<span class="tag">${s}</span>`).join('');
    const website = consultant.website || '';
    const related = consultants
      .filter(c => c.slug !== consultant.slug && c.vendor === vendorSlug)
      .slice(0, 3)
      .map(consultantCard).join('')
      || '<p class="empty-state">More coming soon.</p>';

    const consultantHtml = render(consultantTemplate, {
      name: consultant.name,
      tagline: consultant.tagline || '',
      avatar: renderConsultantAvatar(consultant, 'vendor-logo-lg'),
      vendorSlug,
      vendorLabel: vendorLabel || 'CRM',
      tier: consultant.tier || '',
      tierBadgeInline: consultant.tier ? ` · ${consultant.tier}` : '',
      location: consultant.location || '',
      website,
      websiteDisplay: website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      profileUrl: consultant.profileUrl || website || '#',
      serviceTags,
      content: consultant.html,
      relatedConsultants: related
    });

    const page = render(baseTemplate, {
      title: `${consultant.name} — ${vendorLabel} Expert — WeekCRM`,
      description: consultant.tagline || `${consultant.name} is a ${vendorLabel} implementation partner.`,
      url: `https://weekcrm.com/consultants/${consultant.slug}`,
      body: consultantHtml,
      bodyClass: '',
      assetVersion: cssHash
    });

    const consultantDir = path.join(DIST, 'consultants', consultant.slug);
    ensureDir(consultantDir);
    fs.writeFileSync(path.join(consultantDir, 'index.html'), page);
  }

  // ── RSS Feed ────────────────────────────────────────
  const rssItems = articles.slice(0, 20).map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>https://weekcrm.com/news/${a.slug}</link>
      <description><![CDATA[${a.description || excerpt(a.html)}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid>https://weekcrm.com/news/${a.slug}</guid>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WeekCRM</title>
    <link>https://weekcrm.com</link>
    <description>CRM news, reviews, and vendor updates</description>
    <atom:link href="https://weekcrm.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
  fs.writeFileSync(path.join(DIST, 'rss.xml'), rss);

  const elapsed = Date.now() - start;
  console.log(`Done. ${articles.length} articles, ${vendors.length} vendors, ${consultants.length} consultants. ${elapsed}ms`);
}

// ── Watch mode ──────────────────────────────────────────
if (process.argv.includes('--watch')) {
  build();
  console.log('Watching for changes...');
  const dirs = [CONTENT, TEMPLATES, path.join(SRC, 'css'), path.join(SRC, 'js')];
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, () => {
        console.log('Rebuilding...');
        try { build(); } catch (e) { console.error(e.message); }
      });
    }
  }
} else {
  build();
}
