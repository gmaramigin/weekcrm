// ── Mobile nav toggle ────────────────────────────────
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── Directory filters + search ───────────────────────
(() => {
  const grid = document.getElementById('vendorGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.vendor-card'));
  const searchInput = document.getElementById('vendorSearch');
  const countEl = document.getElementById('vendorSearchCount');
  let activeCategory = 'all';
  let query = '';

  // Precompute lowercase searchable text for each card once.
  cards.forEach(card => {
    card.dataset.search = card.textContent.toLowerCase().replace(/\s+/g, ' ').trim();
  });

  function apply() {
    let visible = 0;
    cards.forEach(card => {
      const catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchMatch = !query || card.dataset.search.includes(query);
      const show = catMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) {
      countEl.textContent = query || activeCategory !== 'all'
        ? `${visible} of ${cards.length} vendors`
        : '';
    }
  }

  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      apply();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      query = e.target.value.toLowerCase().trim();
      apply();
    });
  }
})();

// ── Consultants filters + search ─────────────────────
(() => {
  const grid = document.getElementById('consultantGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.consultant-card'));
  const searchInput = document.getElementById('consultantSearch');
  const countEl = document.getElementById('consultantSearchCount');
  const vendorBar = document.getElementById('consultantVendorFilters');
  const tierBar = document.getElementById('consultantTierFilters');
  let activeVendor = 'all';
  let activeTier = 'all';
  let query = '';

  cards.forEach(card => {
    card.dataset.search = card.textContent.toLowerCase().replace(/\s+/g, ' ').trim();
  });

  function apply() {
    let visible = 0;
    cards.forEach(card => {
      const vendorMatch = activeVendor === 'all' || card.dataset.vendor === activeVendor;
      const tierMatch = activeTier === 'all' || card.dataset.tier === activeTier;
      const searchMatch = !query || card.dataset.search.includes(query);
      const show = vendorMatch && tierMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) {
      countEl.textContent = (query || activeVendor !== 'all' || activeTier !== 'all')
        ? `${visible} of ${cards.length} consultants`
        : '';
    }
  }

  function wireFilterBar(bar, attr, setter) {
    if (!bar) return;
    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setter(btn.dataset[attr]);
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        apply();
      });
    });
  }

  wireFilterBar(vendorBar, 'vendor', v => { activeVendor = v; });
  wireFilterBar(tierBar, 'tier', t => { activeTier = t; });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      query = e.target.value.toLowerCase().trim();
      apply();
    });
  }

  // Deep-link: /consultants?vendor=attio pre-selects that vendor filter.
  const params = new URLSearchParams(window.location.search);
  const preVendor = params.get('vendor');
  if (preVendor && vendorBar) {
    const btn = vendorBar.querySelector(`.filter-btn[data-vendor="${preVendor}"]`);
    if (btn) btn.click();
  }
})();
