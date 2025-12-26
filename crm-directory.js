/**
 * WeekCRM CRM Directory - Filter Functionality
 */

// DOM Elements
const crmGrid = document.getElementById('crmGrid');
const filterUseCase = document.getElementById('filterUseCase');
const filterTeamSize = document.getElementById('filterTeamSize');
const filterPricing = document.getElementById('filterPricing');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initReferralTracking();
});

// Initialize filters
function initFilters() {
    const filters = [filterUseCase, filterTeamSize, filterPricing];
    
    filters.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Apply filters to CRM cards
function applyFilters() {
    const useCase = filterUseCase?.value || 'all';
    const teamSize = filterTeamSize?.value || 'all';
    const pricing = filterPricing?.value || 'all';
    
    const cards = document.querySelectorAll('.crm-card');
    
    cards.forEach(card => {
        const cardUseCase = card.dataset.usecase?.split(',') || [];
        const cardSize = card.dataset.size?.split(',') || [];
        const cardPricing = card.dataset.pricing?.split(',') || [];
        
        let show = true;
        
        // Check use case filter
        if (useCase !== 'all' && !cardUseCase.includes(useCase)) {
            show = false;
        }
        
        // Check team size filter
        if (teamSize !== 'all') {
            const sizeMap = {
                'small': ['small'],
                'medium': ['medium'],
                'enterprise': ['enterprise']
            };
            if (!cardSize.some(s => sizeMap[teamSize]?.includes(s))) {
                show = false;
            }
        }
        
        // Check pricing filter
        if (pricing !== 'all' && !cardPricing.includes(pricing)) {
            show = false;
        }
        
        // Show/hide card with animation
        if (show) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if no results
    const visibleCards = document.querySelectorAll('.crm-card[style=""]').length + 
                         document.querySelectorAll('.crm-card:not([style])').length -
                         document.querySelectorAll('.crm-card[style*="none"]').length;
    
    // Could show a "no results" message here if needed
}

// Track referral link clicks
function initReferralTracking() {
    document.querySelectorAll('[data-referral]').forEach(link => {
        link.addEventListener('click', (e) => {
            const crm = link.dataset.referral;
            
            // Track the click (in production, send to analytics)
            console.log(`Referral click: ${crm}`);
            
            // You could send this to your analytics here
            // analytics.track('referral_click', { crm: crm });
        });
    });
}

// Smooth scroll for internal links
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




