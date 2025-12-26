/**
 * WeekCRM Landing Page - Interactive Quiz & Animations
 * English version
 */

// ============================================
// CRM Database for Quiz Results
// ============================================
const crmDatabase = [
    {
        id: 'hubspot',
        name: 'HubSpot CRM',
        avatar: 'H',
        avatarClass: 'avatar-1',
        tags: ['sales', 'support', 'partners', '1-5', '6-20', '21-100', '100+', 'email', 'slack', 'google', 'office', 'free', 'medium', 'high'],
        reason: 'Generous free tier, excellent marketing tools',
        warning: 'Paid features can get expensive quickly',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        avatar: 'S',
        avatarClass: 'avatar-2',
        tags: ['sales', 'support', 'partners', '21-100', '100+', 'email', 'slack', 'google', 'office', 'high'],
        reason: 'Industry leader, maximum customization',
        warning: 'Steep learning curve, requires admin expertise',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'pipedrive',
        name: 'Pipedrive',
        avatar: 'P',
        avatarClass: 'avatar-3',
        tags: ['sales', 'partners', '1-5', '6-20', '21-100', 'email', 'slack', 'google', 'office', 'low', 'medium'],
        reason: 'Visual pipeline, intuitive for sales teams',
        warning: 'No free plan, limited marketing features',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'zoho',
        name: 'Zoho CRM',
        avatar: 'Z',
        avatarClass: 'avatar-4',
        tags: ['sales', 'support', 'partners', '1-5', '6-20', '21-100', '100+', 'email', 'slack', 'google', 'office', 'free', 'low', 'medium', 'high'],
        reason: 'Great value, part of a full business suite',
        warning: 'Interface can feel dated, complex setup',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'freshsales',
        name: 'Freshsales',
        avatar: 'F',
        avatarClass: 'avatar-1',
        tags: ['sales', 'recruiting', '1-5', '6-20', 'email', 'slack', 'google', 'free', 'low', 'medium'],
        reason: 'Built-in phone, AI-powered lead scoring',
        warning: 'Fewer integrations than competitors',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'monday',
        name: 'Monday Sales CRM',
        avatar: 'M',
        avatarClass: 'avatar-2',
        tags: ['sales', 'projects', '6-20', '21-100', 'email', 'slack', 'google', 'office', 'low', 'medium'],
        reason: 'Flexible workflows, great for hybrid teams',
        warning: 'Per-seat pricing adds up for larger teams',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'close',
        name: 'Close',
        avatar: 'C',
        avatarClass: 'avatar-3',
        tags: ['sales', '1-5', '6-20', 'email', 'slack', 'google', 'low', 'medium'],
        reason: 'Built for inside sales, excellent calling features',
        warning: 'Less suited for complex B2B deals',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'copper',
        name: 'Copper',
        avatar: 'Cu',
        avatarClass: 'avatar-4',
        tags: ['sales', 'partners', '1-5', '6-20', 'email', 'google', 'low', 'medium'],
        reason: 'Native Google Workspace integration',
        warning: 'Only works well with Google ecosystem',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'zendesk',
        name: 'Zendesk Sell',
        avatar: 'Zd',
        avatarClass: 'avatar-1',
        tags: ['sales', 'support', '6-20', '21-100', 'email', 'slack', 'low', 'medium'],
        reason: 'Seamless support integration, clean interface',
        warning: 'Best value when paired with Zendesk Support',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'insightly',
        name: 'Insightly',
        avatar: 'I',
        avatarClass: 'avatar-2',
        tags: ['sales', 'projects', '1-5', '6-20', '21-100', 'email', 'google', 'office', 'free', 'low', 'medium'],
        reason: 'CRM + project management in one',
        warning: 'Reporting features need higher tiers',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'notion',
        name: 'Notion (as CRM)',
        avatar: 'N',
        avatarClass: 'avatar-3',
        tags: ['sales', 'partners', 'recruiting', 'projects', '1-5', '6-20', 'email', 'slack', 'google', 'free', 'low'],
        reason: 'Infinitely customizable, great for small teams',
        warning: 'No built-in automations or email sync',
        cardUrl: '#',
        reviewUrl: '#'
    },
    {
        id: 'streak',
        name: 'Streak',
        avatar: 'St',
        avatarClass: 'avatar-4',
        tags: ['sales', 'recruiting', '1-5', 'email', 'google', 'free', 'low'],
        reason: 'Lives inside Gmail, zero context switching',
        warning: 'Limited features outside email workflows',
        cardUrl: '#',
        reviewUrl: '#'
    }
];

// ============================================
// Quiz State Management
// ============================================
const quizState = {
    currentStep: 1,
    totalSteps: 4,
    answers: {
        team: null,
        task: null,
        integrations: [],
        budget: null
    }
};

// ============================================
// DOM Elements
// ============================================
const elements = {
    quizSteps: document.getElementById('quizSteps'),
    quizResults: document.getElementById('quizResults'),
    resultsGrid: document.getElementById('resultsGrid'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    nextStep3: document.getElementById('nextStep3'),
    cookieNotice: document.getElementById('cookieNotice')
};

// ============================================
// Cookie Notice
// ============================================
function acceptCookies() {
    if (elements.cookieNotice) {
        elements.cookieNotice.classList.add('hidden');
        localStorage.setItem('cookiesAccepted', 'true');
    }
}

function checkCookieConsent() {
    if (localStorage.getItem('cookiesAccepted') === 'true' && elements.cookieNotice) {
        elements.cookieNotice.classList.add('hidden');
    }
}

// ============================================
// Quiz Logic
// ============================================
function initQuiz() {
    // Attach click handlers to all option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });

    // Next button for step 3 (multi-select)
    if (elements.nextStep3) {
        elements.nextStep3.addEventListener('click', () => {
            if (quizState.answers.integrations.length > 0) {
                goToStep(4);
            }
        });
    }

    updateProgress();
}

function handleOptionClick(e) {
    const btn = e.currentTarget;
    const question = btn.dataset.question;
    const value = btn.dataset.value;
    const isMulti = btn.classList.contains('multi');

    if (isMulti) {
        // Multi-select handling (integrations)
        handleMultiSelect(btn, question, value);
    } else {
        // Single select handling
        handleSingleSelect(btn, question, value);
    }
}

function handleSingleSelect(btn, question, value) {
    // Remove selection from siblings
    const step = btn.closest('.quiz-step');
    step.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    
    // Add selection to clicked button
    btn.classList.add('selected');
    
    // Store answer
    quizState.answers[question] = value;
    
    // Auto-advance to next step after a short delay
    setTimeout(() => {
        if (quizState.currentStep < quizState.totalSteps) {
            goToStep(quizState.currentStep + 1);
        } else {
            showResults();
        }
    }, 300);
}

function handleMultiSelect(btn, question, value) {
    btn.classList.toggle('selected');
    
    const index = quizState.answers.integrations.indexOf(value);
    if (index === -1) {
        quizState.answers.integrations.push(value);
    } else {
        quizState.answers.integrations.splice(index, 1);
    }
    
    // Enable/disable next button
    if (elements.nextStep3) {
        elements.nextStep3.disabled = quizState.answers.integrations.length === 0;
    }
}

function goToStep(stepNumber) {
    // Hide current step
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${quizState.currentStep}"]`);
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }
    
    // Show new step
    quizState.currentStep = stepNumber;
    const newStepEl = document.querySelector(`.quiz-step[data-step="${stepNumber}"]`);
    if (newStepEl) {
        newStepEl.classList.add('active');
    }
    
    updateProgress();
}

function updateProgress() {
    const progress = ((quizState.currentStep - 1) / quizState.totalSteps) * 100;
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${progress}%`;
    }
    
    if (elements.progressText) {
        elements.progressText.textContent = `Question ${quizState.currentStep} of ${quizState.totalSteps}`;
    }
}

function showResults() {
    // Hide quiz steps
    if (elements.quizSteps) {
        elements.quizSteps.style.display = 'none';
    }
    
    // Update progress to 100%
    if (elements.progressFill) {
        elements.progressFill.style.width = '100%';
    }
    if (elements.progressText) {
        elements.progressText.textContent = 'Done!';
    }
    
    // Calculate recommendations
    const recommendations = calculateRecommendations();
    
    // Render results
    renderResults(recommendations);
    
    // Show results container
    if (elements.quizResults) {
        elements.quizResults.style.display = 'block';
    }
}

function calculateRecommendations() {
    const { team, task, integrations, budget } = quizState.answers;
    
    // Score each CRM based on matches
    const scored = crmDatabase.map(crm => {
        let score = 0;
        
        // Team size match
        if (crm.tags.includes(team)) score += 3;
        
        // Task match (most important)
        if (crm.tags.includes(task)) score += 5;
        
        // Integrations match
        integrations.forEach(integration => {
            if (crm.tags.includes(integration)) score += 2;
        });
        
        // Budget match
        if (crm.tags.includes(budget)) score += 3;
        
        return { ...crm, score };
    });
    
    // Sort by score and return top 4
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
}

function renderResults(recommendations) {
    if (!elements.resultsGrid) return;
    
    elements.resultsGrid.innerHTML = recommendations.map(crm => `
        <div class="result-card">
            <div class="result-avatar ${crm.avatarClass}">${crm.avatar}</div>
            <div class="result-info">
                <h4 class="result-name">${crm.name}</h4>
                <p class="result-reason">${crm.reason}</p>
                <p class="result-warning">${crm.warning}</p>
            </div>
            <div class="result-actions">
                <a href="${crm.cardUrl}" class="btn btn-primary result-btn">Open CRM profile</a>
                <a href="${crm.reviewUrl}" class="btn btn-secondary result-btn">Read review</a>
            </div>
        </div>
    `).join('');
}

function resetQuiz() {
    // Reset state
    quizState.currentStep = 1;
    quizState.answers = {
        team: null,
        task: null,
        integrations: [],
        budget: null
    };
    
    // Clear selections
    document.querySelectorAll('.option-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Reset next button
    if (elements.nextStep3) {
        elements.nextStep3.disabled = true;
    }
    
    // Show quiz steps, hide results
    if (elements.quizSteps) {
        elements.quizSteps.style.display = 'block';
    }
    if (elements.quizResults) {
        elements.quizResults.style.display = 'none';
    }
    
    // Go to first step
    goToStep(1);
}

// Make resetQuiz available globally
window.resetQuiz = resetQuiz;

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe blog cards
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// Smooth Scroll for Navigation
// ============================================
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

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(31, 59, 52, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Pain Points Hover Effect
// ============================================
function initPainPointsEffect() {
    document.querySelectorAll('.pain-point').forEach((point, index) => {
        point.style.animationDelay = `${0.6 + index * 0.1}s`;
    });
}

// ============================================
// Latest Blog Posts Data (shared with blog.js)
// ============================================
const latestBlogPosts = [
    {
        id: 1,
        title: "Best CRMs for Small Business in 2025",
        excerpt: "We tested 12 CRMs and ranked them by ease of use, pricing transparency, and actual value for small teams.",
        category: "Review",
        image: "gradient-1",
        url: "blog/index.html"
    },
    {
        id: 2,
        title: "HubSpot vs Salesforce: Which to Choose in 2025?",
        excerpt: "A detailed breakdown of two enterprise CRM giants—pricing, features, and who each one is built for.",
        category: "Comparison",
        image: "gradient-2",
        url: "blog/index.html"
    },
    {
        id: 3,
        title: "How to Avoid Overpaying for CRM",
        excerpt: "5 hidden costs vendors don't advertise—and how to spot them before you sign.",
        category: "Guide",
        image: "gradient-3",
        url: "blog/index.html"
    }
];

// Load latest posts on homepage
function loadLatestPosts() {
    const grid = document.getElementById('latestPostsGrid');
    if (!grid) return;
    
    grid.innerHTML = latestBlogPosts.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <div class="placeholder-img ${post.image}"></div>
            </div>
            <div class="blog-card-content">
                <span class="blog-tag">${post.category}</span>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="post-link">Read more →</a>
            </div>
        </article>
    `).join('');
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkCookieConsent();
    initQuiz();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScroll();
    initPainPointsEffect();
    loadLatestPosts();
});

// Make acceptCookies available globally
window.acceptCookies = acceptCookies;
