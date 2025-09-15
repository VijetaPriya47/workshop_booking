/**
 * Mobile-First Workshop Booking Enhancements
 * Provides enhanced mobile interactions and accessibility features
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileEnhancements();
    });

    function initMobileEnhancements() {
        // Initialize all mobile enhancements
        initTouchInteractions();
        initFormEnhancements();
        initNavigationEnhancements();
        initAccessibilityFeatures();
        initPerformanceOptimizations();
    }

    /**
     * Enhanced touch interactions for mobile devices
     */
    function initTouchInteractions() {
        // Add touch feedback to buttons and links
        const interactiveElements = document.querySelectorAll('button, .btn, a, .nav-link, .dropdown-item');
        
        interactiveElements.forEach(element => {
            // Add touch start/end events for visual feedback
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touching');
            }, { passive: true });
            
            element.addEventListener('touchend', function(e) {
                this.classList.remove('touching');
            }, { passive: true });
            
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touching');
            }, { passive: true });
        });

        // Prevent zoom on double tap for better mobile experience
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    /**
     * Enhanced form interactions and validation
     */
    function initFormEnhancements() {
        // Add real-time form validation feedback
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Add focus/blur effects
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    validateField(this);
                });
                
                // Real-time validation for required fields
                input.addEventListener('input', function() {
                    if (this.hasAttribute('required')) {
                        validateField(this);
                    }
                });
            });
        });

        // Enhanced form submission with loading states
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                    
                    // Re-enable after 5 seconds as fallback
                    setTimeout(() => {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }, 5000);
                }
            });
        });
    }

    /**
     * Enhanced navigation for mobile devices
     */
    function initNavigationEnhancements() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
            
            // Close mobile menu when clicking on nav links
            const navLinks = navbarCollapse.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            });
        }

        // Add scroll effect to navbar
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.classList.add('navbar-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('navbar-hidden');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    /**
     * Accessibility enhancements
     */
    function initAccessibilityFeatures() {
        // Add skip to content link
        addSkipToContentLink();
        
        // Enhance keyboard navigation
        enhanceKeyboardNavigation();
        
        // Add ARIA live regions for dynamic content
        addLiveRegions();
        
        // Improve focus management
        improveFocusManagement();
    }

    function addSkipToContentLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only sr-only-focusable';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 10000;
            color: white;
            background: #000;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    function enhanceKeyboardNavigation() {
        // Add keyboard navigation for dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        });
    }

    function addLiveRegions() {
        // Add live region for form validation messages
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    function improveFocusManagement() {
        // Trap focus in modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', function() {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            });
        });
    }

    /**
     * Performance optimizations
     */
    function initPerformanceOptimizations() {
        // Lazy load images
        initLazyLoading();
        
        // Debounce scroll events
        debounceScrollEvents();
        
        // Optimize animations for reduced motion preference
        respectReducedMotion();
    }

    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    function debounceScrollEvents() {
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) {
                    originalScrollHandler();
                }
            }, 10);
        };
    }

    function respectReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Field validation helper
     */
    function validateField(field) {
        const isValid = field.checkValidity();
        const formGroup = field.closest('.form-group');
        
        if (formGroup) {
            formGroup.classList.remove('is-valid', 'is-invalid');
            formGroup.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
        
        return isValid;
    }

    /**
     * Utility function to announce messages to screen readers
     */
    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Expose utility functions globally for use in templates
    window.WorkshopMobile = {
        announceToScreenReader: announceToScreenReader,
        validateField: validateField
    };

})();
