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
// Consultants use downloaded raster logos when available (webp/png), falling
// back to a generated monogram SVG — so prefer raster extensions first.
const CONSULTANT_LOGO_EXTS = ['webp', 'png', 'jpg', 'jpeg', 'avif', 'svg'];
const CONSULTANT_LOGO_DIR = path.join(PUBLIC, 'logos', 'consultants');
function resolveConsultantLogo(slug) {
  for (const ext of CONSULTANT_LOGO_EXTS) {
    if (fs.existsSync(path.join(CONSULTANT_LOGO_DIR, `${slug}.${ext}`))) {
      return `/logos/consultants/${slug}.${ext}`;
    }
  }
  return null;
}
function renderConsultantAvatar(consultant, sizeClass = '') {
  const logo = resolveConsultantLogo(consultant.slug);
  if (logo) {
    // Full-bleed SVG monograms use a different class from padded raster logos.
    const isMonogramSvg = logo.endsWith('.svg');
    const extraClass = isMonogramSvg ? 'consultant-avatar-monogram' : 'consultant-avatar-logo';
    return `<span class="vendor-logo ${extraClass} ${sizeClass}"><img src="${logo}" alt="${consultant.name} logo" loading="lazy"></span>`;
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

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replace the FIRST plain-text mention of each known vendor title (and slug variants)
// with a link to /vendors/<slug>. Skips text already inside <a>...</a> blocks and
// inside headings/code so we don't over-link or break anchor text.
function autoLinkVendors(html, vendors, currentSlug = null) {
  // Build a list of [pattern, slug] tuples. Longest titles first to avoid e.g.
  // "HubSpot CRM" being eaten by a "HubSpot" match.
  const targets = vendors
    .filter(v => v.slug && v.slug !== currentSlug)
    .map(v => ({ slug: v.slug, label: v.title }))
    .filter(t => t.label && t.label.length >= 3)
    .sort((a, b) => b.label.length - a.label.length);

  // Split on <a>…</a>, <h*>…</h*>, <code>…</code>, <pre>…</pre> so we can rewrite
  // only the safe segments.
  const SKIP_RE = /(<(?:a|h[1-6]|code|pre)\b[^>]*>[\s\S]*?<\/(?:a|h[1-6]|code|pre)>)/gi;
  const parts = html.split(SKIP_RE);
  const linked = new Set();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (SKIP_RE.test(part)) continue; // Skip blocks
    let segment = part;
    for (const t of targets) {
      if (linked.has(t.slug)) continue;
      // Word-bounded, case-insensitive, only the FIRST match in the whole article.
      const re = new RegExp(`\\b(${escapeRegex(t.label)})\\b`, 'i');
      if (re.test(segment)) {
        segment = segment.replace(re, `<a href="/vendors/${t.slug}">$1</a>`);
        linked.add(t.slug);
      }
    }
    parts[i] = segment;
  }
  return parts.join('');
}

// JSON-LD Product/Review schema for a vendor — gives Google star snippets.
function vendorJsonLd(vendor) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vendor.title,
    description: vendor.description || '',
    category: vendor.category || 'CRM Software',
    url: `https://weekcrm.com/vendors/${vendor.slug}`
  };
  const logo = vendor.logo || resolveLogo(vendor.slug);
  if (logo) obj.image = `https://weekcrm.com${logo}`;
  if (vendor.website) obj.brand = { '@type': 'Brand', name: vendor.title };
  if (vendor.rating) {
    const ratingValue = parseFloat(vendor.rating);
    if (!isNaN(ratingValue)) {
      obj.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: ratingValue.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        reviewCount: '1'
      };
      obj.review = {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: ratingValue.toFixed(1),
          bestRating: '5',
          worstRating: '1'
        },
        author: { '@type': 'Organization', name: 'WeekCRM' },
        publisher: { '@type': 'Organization', name: 'WeekCRM' }
      };
    }
  }
  // JSON in HTML must escape </script
  return JSON.stringify(obj).replace(/<\/script/gi, '<\\/script');
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
    const linkedContent = autoLinkVendors(article.html, vendors);
    const articleHtml = render(articleTemplate, {
      title: article.title,
      date: formatDate(article.date),
      dateISO: article.date,
      tags: tagsHtml,
      content: linkedContent,
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
      content: autoLinkVendors(vendor.html, vendors, vendor.slug),
      relatedArticles: relatedHtml,
      rating: vendor.rating || '',
      pricing: vendor.pricing || '',
      category: vendor.category || 'CRM',
      logo: renderLogo(vendor, 'vendor-logo-lg'),
      jsonLd: vendorJsonLd(vendor)
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
    const websiteDisplay = website.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const related = consultants
      .filter(c => c.slug !== consultant.slug && c.vendor === vendorSlug)
      .slice(0, 3)
      .map(consultantCard).join('')
      || '<p class="empty-state">More coming soon.</p>';

    // Build sidebar rows only for fields that actually have values.
    const rows = [];
    if (consultant.location) rows.push(`
      <div class="vendor-info-row">
        <span class="vendor-info-label">Location</span>
        <span class="vendor-info-value">${consultant.location}</span>
      </div>`);
    if (consultant.tier) rows.push(`
      <div class="vendor-info-row">
        <span class="vendor-info-label">Partner tier</span>
        <span class="vendor-info-value">${consultant.tier}</span>
      </div>`);
    if (vendorSlug) rows.push(`
      <div class="vendor-info-row">
        <span class="vendor-info-label">Works with</span>
        <a href="/vendors/${vendorSlug}" class="vendor-info-value vendor-info-link">${vendorLabel}</a>
      </div>`);
    if (website) rows.push(`
      <div class="vendor-info-row">
        <span class="vendor-info-label">Website</span>
        <a href="${website}" target="_blank" rel="noopener nofollow" class="vendor-info-value vendor-info-link">${websiteDisplay}</a>
      </div>`);
    const sidebarRows = rows.join('');

    // Prefer a native booking link as the primary CTA; otherwise link back to
    // the official vendor profile.
    const ctaHref = consultant.discoveryUrl || consultant.profileUrl || website || '#';
    const ctaLabel = consultant.discoveryUrl ? 'Book discovery call →'
                    : `View on ${vendorLabel} →`;
    const ctaBlock = `<a href="${ctaHref}" target="_blank" rel="noopener" class="btn btn-primary btn-full">${ctaLabel}</a>`;

    const consultantHtml = render(consultantTemplate, {
      name: consultant.name,
      tagline: consultant.tagline || '',
      avatar: renderConsultantAvatar(consultant, 'vendor-logo-lg'),
      vendorSlug,
      vendorLabel: vendorLabel || 'CRM',
      tierBadgeInline: consultant.tier ? ` · ${consultant.tier}` : '',
      serviceTags,
      sidebarRows,
      ctaBlock,
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

  // ── Comparison pages (/compare/<a>-vs-<b>) ──────────
  const compareTemplate = fs.existsSync(path.join(TEMPLATES, 'compare.html'))
    ? readTemplate('compare') : null;
  const compareEntries = readMarkdownFiles(path.join(CONTENT, 'compare'));
  if (compareTemplate && compareEntries.length) {
    ensureDir(path.join(DIST, 'compare'));
    const compareIndexCards = [];
    for (const entry of compareEntries) {
      const a = vendorBySlug[entry.a];
      const b = vendorBySlug[entry.b];
      if (!a || !b) {
        console.warn(`compare: skipping ${entry.slug} — vendor "${entry.a}" or "${entry.b}" not found`);
        continue;
      }
      const ctaForVendor = (v) => ({
        url: v.referralUrl || v.website || '#',
        rel: v.referralUrl ? 'noopener sponsored' : 'noopener nofollow',
        label: v.referralUrl ? `Try ${v.title}` : `Visit ${v.title}`
      });
      const ctaA = ctaForVendor(a);
      const ctaB = ctaForVendor(b);

      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: entry.title,
        description: entry.description || '',
        datePublished: entry.date,
        author: { '@type': 'Organization', name: 'WeekCRM' },
        publisher: { '@type': 'Organization', name: 'WeekCRM' },
        about: [
          { '@type': 'Product', name: a.title, url: `https://weekcrm.com/vendors/${a.slug}` },
          { '@type': 'Product', name: b.title, url: `https://weekcrm.com/vendors/${b.slug}` }
        ]
      }).replace(/<\/script/gi, '<\\/script');

      const compareHtml = render(compareTemplate, {
        title: entry.title,
        description: entry.description || '',
        content: autoLinkVendors(entry.html, vendors),
        slugA: a.slug, titleA: a.title, descA: a.description || '',
        pricingA: a.pricing || '—', ratingA: a.rating || '—',
        logoA: renderLogo(a, 'vendor-logo-lg'),
        ctaUrlA: ctaA.url, ctaRelA: ctaA.rel, ctaLabelA: ctaA.label,
        slugB: b.slug, titleB: b.title, descB: b.description || '',
        pricingB: b.pricing || '—', ratingB: b.rating || '—',
        logoB: renderLogo(b, 'vendor-logo-lg'),
        ctaUrlB: ctaB.url, ctaRelB: ctaB.rel, ctaLabelB: ctaB.label,
        jsonLd
      });

      const page = render(baseTemplate, {
        title: `${entry.title} — WeekCRM`,
        description: entry.description || `${a.title} vs ${b.title} — feature comparison, pricing, and verdict.`,
        url: `https://weekcrm.com/compare/${entry.slug}`,
        body: compareHtml,
        bodyClass: '',
        assetVersion: cssHash
      });

      const outDir = path.join(DIST, 'compare', entry.slug);
      ensureDir(outDir);
      fs.writeFileSync(path.join(outDir, 'index.html'), page);

      compareIndexCards.push(`
        <a href="/compare/${entry.slug}" class="card">
          <div class="card-meta"><time datetime="${entry.date}">${formatDate(entry.date)}</time></div>
          <h3 class="card-title">${entry.title}</h3>
          <p class="card-excerpt">${entry.description || ''}</p>
        </a>
      `);
    }

    // /compare/ index
    const compareIndexBody = `
      <section class="section">
        <div class="container">
          <h1>CRM Comparisons</h1>
          <p class="vendor-desc">Side-by-side breakdowns of the most-asked CRM matchups.</p>
          <div class="card-grid">${compareIndexCards.join('')}</div>
        </div>
      </section>`;
    const compareIndex = render(baseTemplate, {
      title: 'CRM Comparisons — WeekCRM',
      description: 'Honest, side-by-side comparisons of the most popular CRMs.',
      url: 'https://weekcrm.com/compare',
      body: compareIndexBody, bodyClass: '', assetVersion: cssHash
    });
    fs.writeFileSync(path.join(DIST, 'compare', 'index.html'), compareIndex);
  }

  // ── "Best CRM for X" listicles (/best/<slug>) ───────
  const bestEntries = readMarkdownFiles(path.join(CONTENT, 'best'));
  if (bestEntries.length) {
    ensureDir(path.join(DIST, 'best'));
    const bestIndexCards = [];
    for (const entry of bestEntries) {
      const picks = (entry.vendors || [])
        .map(slug => vendorBySlug[slug])
        .filter(Boolean);
      if (!picks.length) {
        console.warn(`best: skipping ${entry.slug} — no valid vendor slugs`);
        continue;
      }

      const pickBlocks = picks.map((v, i) => {
        const ctaUrl = v.referralUrl || v.website || '#';
        const ctaRel = v.referralUrl ? 'noopener sponsored' : 'noopener nofollow';
        const ctaLabel = v.referralUrl ? `Try ${v.title} →` : `Visit ${v.title} →`;
        return `
          <article class="best-pick">
            <div class="best-pick-rank">#${i + 1}</div>
            <div class="best-pick-body">
              <div class="best-pick-head">
                ${renderLogo(v, 'vendor-logo-md')}
                <div>
                  <h3><a href="/vendors/${v.slug}">${v.title}</a></h3>
                  <span class="vendor-card-category">${v.category || 'CRM'} · ${v.pricing || ''}</span>
                </div>
              </div>
              <p>${v.description || ''}</p>
              <a href="${ctaUrl}" target="_blank" rel="${ctaRel}" class="btn btn-primary">${ctaLabel}</a>
            </div>
          </article>`;
      }).join('');

      const itemListLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: entry.title,
        itemListElement: picks.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://weekcrm.com/vendors/${v.slug}`,
          name: v.title
        }))
      }).replace(/<\/script/gi, '<\\/script');

      const bodyHtml = `
        <script type="application/ld+json">${itemListLd}</script>
        <section class="compare-hero">
          <div class="container container-narrow">
            <span class="compare-eyebrow">CRM Picks</span>
            <h1 class="compare-title">${entry.title}</h1>
            <p class="compare-desc">${entry.description || ''}</p>
          </div>
        </section>
        <section class="section">
          <div class="container container-narrow">
            <div class="best-list">${pickBlocks}</div>
            <div class="compare-body">${autoLinkVendors(entry.html, vendors)}</div>
          </div>
        </section>`;

      const page = render(baseTemplate, {
        title: `${entry.title} — WeekCRM`,
        description: entry.description || entry.title,
        url: `https://weekcrm.com/best/${entry.slug}`,
        body: bodyHtml, bodyClass: '', assetVersion: cssHash
      });

      const outDir = path.join(DIST, 'best', entry.slug);
      ensureDir(outDir);
      fs.writeFileSync(path.join(outDir, 'index.html'), page);

      bestIndexCards.push(`
        <a href="/best/${entry.slug}" class="card">
          <div class="card-meta"><time datetime="${entry.date}">${formatDate(entry.date)}</time></div>
          <h3 class="card-title">${entry.title}</h3>
          <p class="card-excerpt">${entry.description || ''}</p>
        </a>
      `);
    }

    const bestIndexBody = `
      <section class="section">
        <div class="container">
          <h1>Best CRM Picks</h1>
          <p class="vendor-desc">Curated CRM shortlists by use case, industry, and budget.</p>
          <div class="card-grid">${bestIndexCards.join('')}</div>
        </div>
      </section>`;
    const bestIndex = render(baseTemplate, {
      title: 'Best CRM Picks — WeekCRM',
      description: 'Curated CRM shortlists for every use case.',
      url: 'https://weekcrm.com/best',
      body: bestIndexBody, bodyClass: '', assetVersion: cssHash
    });
    fs.writeFileSync(path.join(DIST, 'best', 'index.html'), bestIndex);
  }

  // ── Programmatic landing pages (/industry/, /integrations/) ──────
  // For each entry, frontmatter `tag` selects vendors whose tags include it
  // (case-insensitive). The body Markdown becomes the intro copy.
  const renderProgrammatic = (entries, urlPrefix, fallbackEyebrow) => {
    if (!entries.length) return [];
    ensureDir(path.join(DIST, urlPrefix));
    const cards = [];
    for (const entry of entries) {
      const wanted = (entry.tag || '').toLowerCase();
      const matches = vendors.filter(v =>
        (v.tags || []).some(t => t.toLowerCase() === wanted) ||
        (v.category || '').toLowerCase() === wanted
      );
      if (!matches.length) {
        console.warn(`${urlPrefix}: skipping ${entry.slug} — no vendors with tag "${entry.tag}"`);
        continue;
      }

      const grid = matches.map(v => `
        <a href="/vendors/${v.slug}" class="vendor-card">
          <div class="vendor-card-header">
            ${renderLogo(v, 'vendor-logo-md')}
            <div class="vendor-card-heading">
              <h3 class="vendor-card-name">${v.title}</h3>
              ${v.category ? `<span class="vendor-card-category">${v.category}</span>` : ''}
            </div>
          </div>
          <p class="vendor-card-desc">${v.description || ''}</p>
        </a>`).join('');

      const bodyHtml = `
        <section class="compare-hero">
          <div class="container container-narrow">
            <span class="compare-eyebrow">${entry.eyebrow || fallbackEyebrow}</span>
            <h1 class="compare-title">${entry.title}</h1>
            <p class="compare-desc">${entry.description || ''}</p>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="compare-body">${autoLinkVendors(entry.html, vendors)}</div>
            <div class="vendor-grid">${grid}</div>
          </div>
        </section>`;

      const page = render(baseTemplate, {
        title: `${entry.title} — WeekCRM`,
        description: entry.description || entry.title,
        url: `https://weekcrm.com/${urlPrefix}/${entry.slug}`,
        body: bodyHtml, bodyClass: '', assetVersion: cssHash
      });

      const outDir = path.join(DIST, urlPrefix, entry.slug);
      ensureDir(outDir);
      fs.writeFileSync(path.join(outDir, 'index.html'), page);

      cards.push(`
        <a href="/${urlPrefix}/${entry.slug}" class="card">
          <h3 class="card-title">${entry.title}</h3>
          <p class="card-excerpt">${entry.description || ''}</p>
        </a>
      `);
    }
    return cards;
  };

  const industryCards = renderProgrammatic(
    readMarkdownFiles(path.join(CONTENT, 'industry')),
    'industry',
    'CRM by Industry'
  );
  if (industryCards.length) {
    const indexBody = `
      <section class="section">
        <div class="container">
          <h1>CRM by Industry</h1>
          <p class="vendor-desc">CRMs grouped by the industries they serve best.</p>
          <div class="card-grid">${industryCards.join('')}</div>
        </div>
      </section>`;
    fs.writeFileSync(path.join(DIST, 'industry', 'index.html'), render(baseTemplate, {
      title: 'CRM by Industry — WeekCRM',
      description: 'Find the right CRM for your industry.',
      url: 'https://weekcrm.com/industry',
      body: indexBody, bodyClass: '', assetVersion: cssHash
    }));
  }

  const integrationCards = renderProgrammatic(
    readMarkdownFiles(path.join(CONTENT, 'integrations')),
    'integrations',
    'CRM Integrations'
  );
  if (integrationCards.length) {
    const indexBody = `
      <section class="section">
        <div class="container">
          <h1>CRM Integrations</h1>
          <p class="vendor-desc">CRMs grouped by the tools they integrate with.</p>
          <div class="card-grid">${integrationCards.join('')}</div>
        </div>
      </section>`;
    fs.writeFileSync(path.join(DIST, 'integrations', 'index.html'), render(baseTemplate, {
      title: 'CRM Integrations — WeekCRM',
      description: 'Find the right CRM for your stack.',
      url: 'https://weekcrm.com/integrations',
      body: indexBody, bodyClass: '', assetVersion: cssHash
    }));
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
