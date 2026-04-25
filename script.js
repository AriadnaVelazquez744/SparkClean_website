/**
 * SparkClean Oregon - JavaScript
 * Professional Business Website
 */

(function() {
    'use strict';

    // ===========================
    // INITIALIZATION
    // ===========================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScrolling();
        initQuoteModal();
        initForms();
        initScrollAnimations();
        initNavbarScroll();
        initAccessibility();
        initLazyLoading();
    });

    // ===========================
    // MOBILE MENU
    // ===========================
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            if (!isExpanded) {
                navMenu.style.display = 'flex';
            } else {
                navMenu.style.display = '';
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.style.display = '';
            });
        });
    }

    // ===========================
    // SMOOTH SCROLLING
    // ===========================
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
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
                    
                    const modal = document.getElementById('quote-modal');
                    if (modal && modal.open) {
                        modal.close();
                    }
                }
            });
        });
    }

    // ===========================
    // QUOTE MODAL
    // ===========================
    function initQuoteModal() {
        const modal = document.getElementById('quote-modal');
        const closeBtn = document.querySelector('.modal-close');
        
        if (!modal) return;
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.close();
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.close();
            }
        });
    }

    // ===========================
    // FORMS
    // ===========================
    function initForms() {
        const contactForm = document.getElementById('contact-form');
        const quoteForm = document.getElementById('quote-form');
        
        if (contactForm) {
            setupFormspreeForm(contactForm);
        }
        
        if (quoteForm) {
            setupFormspreeForm(quoteForm);
        }
    }

    function setupFormspreeForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusDiv = form.querySelector('.form-status');
        const formAction = form.getAttribute('action');
        
        if (!submitBtn) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(form)) {
                showFormStatus(statusDiv, 'Please fill in all required fields.', 'error');
                return;
            }
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            if (statusDiv) {
                statusDiv.className = 'form-status';
                statusDiv.textContent = '';
            }
            
            try {
                if (formAction && formAction.includes('formspree.io')) {
                    const formData = new FormData(form);
                    const response = await fetch(formAction, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        showFormStatus(statusDiv, getSuccessMessage(form), 'success');
                        form.reset();
                        
                        if (document.getElementById('quote-modal')) {
                            setTimeout(function() {
                                document.getElementById('quote-modal').close();
                            }, 2000);
                        }
                    } else {
                        throw new Error('Form submission failed');
                    }
                } else {
                    showFormStatus(statusDiv, getSuccessMessage(form), 'success');
                    form.reset();
                }
            } catch (error) {
                showFormStatus(statusDiv, 'Something went wrong. Please try again or contact us directly.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
            
            if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('invalid');
            }
        });
        
        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormStatus(element, message, type) {
        if (!element) return;
        
        element.className = 'form-status ' + type;
        element.textContent = message;
        
        if (type === 'success') {
            element.setAttribute('tabindex', '0');
            element.focus();
        }
    }

    function getSuccessMessage(form) {
        if (form.id === 'contact-form') {
            return 'Thank you! We\'ll get back to you within 24 hours.';
        }
        return 'Quote request sent! We\'ll contact you within 24 hours with pricing.';
    }

    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .trust-card, .testimonial-card, .step, .comparison-pair');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(function(el) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===========================
    // ACCESSIBILITY
    // ===========================
    function initAccessibility() {
        const modal = document.getElementById('quote-modal');
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.open) {
                modal.close();
            }
            
            if (e.key === 'Tab' && modal && modal.open) {
                handleModalFocusTrap(e, modal);
            }
        });
        
        document.querySelectorAll('.service-card, .trust-card').forEach(function(card) {
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    function handleModalFocusTrap(e, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    // ===========================
    // LAZY LOADING
    // ===========================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ===========================
    // UTILITY FUNCTIONS
    // ===========================
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

})();