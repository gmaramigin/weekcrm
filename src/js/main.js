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
