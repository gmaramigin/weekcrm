/**
 * WeekCRM Blog Page - Filter and Load Functionality
 */

// Blog posts data (in production, this would come from an API/CMS)
const blogPosts = [
    {
        id: 1,
        title: "Best CRMs for Small Business in 2025",
        excerpt: "We tested 12 CRMs and ranked them by ease of use, pricing transparency, and actual value for small teams.",
        category: "review",
        date: "2025-01-15",
        dateFormatted: "Jan 15, 2025",
        crms: ["hubspot", "salesforce", "pipedrive", "zoho"],
        featured: true,
        image: "gradient-1",
        url: "#"
    },
    {
        id: 2,
        title: "HubSpot vs Salesforce: Which to Choose in 2025?",
        excerpt: "A detailed breakdown of two enterprise CRM giants—pricing, features, and who each one is actually built for.",
        category: "comparison",
        date: "2025-01-12",
        dateFormatted: "Jan 12, 2025",
        crms: ["hubspot", "salesforce"],
        featured: false,
        image: "gradient-2",
        url: "#"
    },
    {
        id: 3,
        title: "How to Avoid Overpaying for CRM",
        excerpt: "5 hidden costs vendors don't advertise—and how to spot them before you sign.",
        category: "guide",
        date: "2025-01-10",
        dateFormatted: "Jan 10, 2025",
        crms: [],
        featured: false,
        image: "gradient-3",
        url: "#"
    },
    {
        id: 4,
        title: "Pipedrive Launches AI Sales Assistant",
        excerpt: "New AI features promise to automate follow-ups and suggest next actions. Here's what actually works.",
        category: "update",
        date: "2025-01-08",
        dateFormatted: "Jan 8, 2025",
        crms: ["pipedrive"],
        featured: false,
        image: "gradient-4",
        url: "#"
    },
    {
        id: 5,
        title: "Zoho CRM Review: Great Value or Too Complex?",
        excerpt: "We spent 30 days with Zoho CRM. Here's the honest verdict on features, pricing, and learning curve.",
        category: "review",
        date: "2025-01-05",
        dateFormatted: "Jan 5, 2025",
        crms: ["zoho"],
        featured: false,
        image: "gradient-5",
        url: "#"
    },
    {
        id: 6,
        title: "Pipedrive vs Close: Best CRM for Sales Teams",
        excerpt: "Both are built for salespeople, but they take different approaches. Which one fits your workflow?",
        category: "comparison",
        date: "2025-01-03",
        dateFormatted: "Jan 3, 2025",
        crms: ["pipedrive", "close"],
        featured: false,
        image: "gradient-6",
        url: "#"
    },
    {
        id: 7,
        title: "HubSpot Starter Plan Price Increase: What to Know",
        excerpt: "HubSpot raised Starter prices by 15%. Here's what changed and whether it's still worth it.",
        category: "update",
        date: "2024-12-28",
        dateFormatted: "Dec 28, 2024",
        crms: ["hubspot"],
        featured: false,
        image: "gradient-1",
        url: "#"
    },
    {
        id: 8,
        title: "CRM Implementation Checklist: 15 Steps to Success",
        excerpt: "A practical checklist to avoid the common pitfalls when rolling out a new CRM.",
        category: "guide",
        date: "2024-12-22",
        dateFormatted: "Dec 22, 2024",
        crms: [],
        featured: false,
        image: "gradient-2",
        url: "#"
    },
    {
        id: 9,
        title: "Monday Sales CRM Review: Flexible But Is It Enough?",
        excerpt: "Monday.com's CRM offering promises flexibility. We tested if it delivers for real sales teams.",
        category: "review",
        date: "2024-12-18",
        dateFormatted: "Dec 18, 2024",
        crms: ["monday"],
        featured: false,
        image: "gradient-3",
        url: "#"
    }
];

// State
let currentFilter = 'all';
let visiblePosts = 6;

// DOM Elements
const blogPostsGrid = document.getElementById('blogPostsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    initFilters();
    initLoadMore();
});

// Render posts
function renderPosts() {
    const filteredPosts = filterPosts(blogPosts, currentFilter);
    const postsToShow = filteredPosts.slice(0, visiblePosts);
    
    blogPostsGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    
    // Update load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filteredPosts.length > visiblePosts ? 'inline-flex' : 'none';
    }
}

// Filter posts
function filterPosts(posts, filter) {
    if (filter === 'all') return posts;
    return posts.filter(post => post.category === filter);
}

// Create post card HTML
function createPostCard(post) {
    const featuredClass = post.featured ? 'featured' : '';
    const badge = post.featured ? '<span class="post-badge featured-badge">Featured</span>' : '';
    const titleTag = post.featured ? 'h2' : 'h3';
    
    return `
        <article class="blog-post-card ${featuredClass}" data-category="${post.category}">
            <div class="post-image">
                <div class="placeholder-img ${post.image}"></div>
                ${badge}
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-tag">${capitalizeFirst(post.category)}</span>
                    <span class="post-date">${post.dateFormatted}</span>
                </div>
                <${titleTag} class="post-title">${post.title}</${titleTag}>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="post-link">Read ${post.featured ? 'full article' : 'more'} →</a>
            </div>
        </article>
    `;
}

// Initialize filter buttons
function initFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and re-render
            currentFilter = btn.dataset.filter;
            visiblePosts = 6;
            renderPosts();
        });
    });
}

// Initialize load more button
function initLoadMore() {
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visiblePosts += 6;
            renderPosts();
        });
    }
}

// Helper: capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export for use in other pages
window.blogPosts = blogPosts;
window.getLatestPosts = function(count = 3, crmFilter = null) {
    let posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (crmFilter) {
        posts = posts.filter(post => post.crms.includes(crmFilter.toLowerCase()));
    }
    
    return posts.slice(0, count);
};

window.getPostsByCRM = function(crmId, count = 3) {
    return blogPosts
        .filter(post => post.crms.includes(crmId.toLowerCase()))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
};




