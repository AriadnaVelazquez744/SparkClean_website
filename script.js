// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close modal if it's the quote modal
            const modal = document.getElementById('quote-modal');
            if (modal && modal.open) {
                modal.close();
            }
        }
    });
});

// ============================================
// FORM SUBMISSION HANDLING
// ============================================

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: this.querySelector('input[placeholder*="Name"]').value,
            email: this.querySelector('input[placeholder*="Email"]').value,
            phone: this.querySelector('input[placeholder*="Phone"]').value,
            message: this.querySelector('textarea[placeholder*="needs"]').value,
            timestamp: new Date().toISOString()
        };
        
        // Log form submission (in a real app, this would send to a backend)
        console.log('Contact form submitted:', formData);
        
        // Show success message
        showNotification('Thank you! We\'ll contact you within 24 hours.');
        
        // Reset form
        this.reset();
    });
}

// Quote Form Submission
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: this.querySelector('input[placeholder*="John"]').value,
            email: this.querySelector('input[placeholder*="john"]').value,
            phone: this.querySelector('input[placeholder*="(305)"]').value,
            serviceType: this.querySelector('select:nth-of-type(1)').value,
            propertySize: this.querySelector('select:nth-of-type(2)').value,
            details: this.querySelector('textarea[placeholder*="special"]').value || 'No additional details',
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.serviceType || !formData.propertySize) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Log form submission (in a real app, this would send to a backend)
        console.log('Quote form submitted:', formData);
        
        // Show success message
        showNotification('Perfect! We\'ll send you a free quote within 24 hours.');
        
        // Close modal
        document.getElementById('quote-modal').close();
        
        // Reset form
        this.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles if not already in document
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// MOBILE MENU HANDLING
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// MODAL MANAGEMENT
// ============================================
const quoteModal = document.getElementById('quote-modal');

// Close modal when clicking outside
if (quoteModal) {
    quoteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.close();
        }
    });
}

// ============================================
// ANALYTICS TRACKING
// ============================================
function trackEvent(eventName, eventData = {}) {
    const eventInfo = {
        event: eventName,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...eventData
    };
    
    // Log to console (in a real app, this would send to analytics service)
    console.log('Analytics Event:', eventInfo);
}

// Track CTA button clicks
document.querySelectorAll('.cta-button, .sticky-cta').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', {
            buttonText: this.textContent.trim(),
            buttonLocation: this.closest('section')?.id || 'sticky'
        });
    });
});

// Track quote form opens
if (quoteModal) {
    document.querySelectorAll('[onclick*="quote-modal"]').forEach(element => {
        element.addEventListener('click', function() {
            trackEvent('quote_modal_opened', {
                triggerElement: this.textContent.trim()
            });
        });
    });
}

// Track navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('nav_click', {
            section: this.getAttribute('href')
        });
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// FORM FIELD VALIDATION
// ============================================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add real-time validation to form fields
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '';
        }
    });
});

// ============================================
// PAGE LOAD EFFECTS
// ============================================
window.addEventListener('load', function() {
    // Add animation to cards when page loads
    const cards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .trust-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
});

// Add animation style if not present
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        img.loaded {
            animation: fadeInUp 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SCROLL EFFECTS
// ============================================
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    // Track scroll position for analytics
    scrollTimeout = setTimeout(() => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > 50) {
            trackEvent('page_scroll_50_percent');
        }
    }, 1000);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('quote-modal');
    if (modal && modal.open && e.key === 'Escape') {
        modal.close();
    }
});

// ============================================
// INITIALIZATION
// ============================================
console.log('SparkClean Services - Website initialized successfully');
