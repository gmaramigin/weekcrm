/**
 * WeekCRM CRM Detail Page - Functionality
 */

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initReferralTracking();
    initSmoothScroll();
    initStickyNav();
});

// Track referral link clicks
function initReferralTracking() {
    document.querySelectorAll('[data-referral]').forEach(link => {
        link.addEventListener('click', (e) => {
            const crm = link.dataset.referral;
            
            // Track the click (in production, send to analytics)
            console.log(`Referral click: ${crm}`);
            
            // Store in session for attribution
            sessionStorage.setItem('lastReferral', JSON.stringify({
                crm: crm,
                timestamp: Date.now()
            }));
        });
    });
}

// Smooth scroll for internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sticky sidebar navigation
function initStickyNav() {
    const sidebar = document.querySelector('.crm-sidebar');
    if (!sidebar) return;
    
    // The CSS handles the sticky positioning, but we could add
    // active section highlighting here in the future
}

// Load related posts (could be dynamic in production)
function loadRelatedPosts(crmId) {
    const grid = document.querySelector('.related-posts-grid');
    if (!grid || !window.getPostsByCRM) return;
    
    const posts = window.getPostsByCRM(crmId, 3);
    
    if (posts.length > 0) {
        grid.innerHTML = posts.map(post => `
            <article class="blog-post-card">
                <div class="post-image">
                    <div class="placeholder-img ${post.image}"></div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-tag">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                        <span class="post-date">${post.dateFormatted}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="${post.url}" class="post-link">Read more →</a>
                </div>
            </article>
        `).join('');
    }
}




