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
            const progressBar = document.getElementById('profileProgressBar');
            const updateProgress = () => {
                if (!progressBar) return;
                const requiredFields = Array.from(form.querySelectorAll('#profile-edit-card input[required], #profile-edit-card select[required], #profile-edit-card textarea[required]'));
                const filled = requiredFields.filter(f => (f.value || '').toString().trim().length > 0);
                const percent = requiredFields.length ? Math.round((filled.length / requiredFields.length) * 100) : 0;
                progressBar.style.width = percent + '%';
                progressBar.setAttribute('aria-valuenow', String(percent));
            };
            
            inputs.forEach(input => {
                // Add focus/blur effects
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    validateField(this);
                    renderInlineError(this);
                    updateProgress();
                });
                
                // Real-time validation for required fields
                input.addEventListener('input', function() {
                    if (this.hasAttribute('required')) {
                        validateField(this);
                        renderInlineError(this);
                    }
                    updateProgress();
                });
            });

            // initial progress state
            updateProgress();
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

        // Initialize bootstrap tooltips if available
        if (window.$ && typeof window.$.fn.tooltip === 'function') {
            window.$('[data-toggle="tooltip"]').tooltip();
        }

        // Profile photo upload interactions
        initProfilePhotoUpload();
    }

    /**
     * Enhanced navigation for mobile devices
     */
    function initNavigationEnhancements() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const mobileAccountBtn = document.getElementById('mobileAccountBtn');
        const mobileAccountPanel = document.getElementById('mobileAccountPanel');
        const mobileAccountClose = document.getElementById('mobileAccountClose');
        // Drawer elements
        const drawer = document.getElementById('mobileDrawer');
        const drawerToggle = document.getElementById('drawerToggle');
        const drawerClose = document.getElementById('drawerClose');
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        
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

        // Drawer behavior
        if (drawer && drawerToggle && drawerBackdrop) {
            const focusableSelectors = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
            let lastFocusedElement = null;
            let touchStartX = null;
            let touchStartY = null;

            function openDrawer(announce = true) {
                lastFocusedElement = document.activeElement;
                drawer.classList.add('open');
                drawerBackdrop.classList.add('open');
                drawerToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                // focus first focusable
                const first = drawer.querySelector(focusableSelectors);
                if (first) first.focus();
                if (announce && window.WorkshopMobile && window.WorkshopMobile.announceToScreenReader) {
                    window.WorkshopMobile.announceToScreenReader('Navigation menu opened');
                }
            }

            function closeDrawer(announce = true) {
                drawer.classList.remove('open');
                drawerBackdrop.classList.remove('open');
                drawerToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                } else {
                    drawerToggle.focus();
                }
                if (announce && window.WorkshopMobile && window.WorkshopMobile.announceToScreenReader) {
                    window.WorkshopMobile.announceToScreenReader('Navigation menu closed');
                }
            }

            // Expose API
            window.WorkshopDrawer = { open: () => openDrawer(false), close: () => closeDrawer(false) };

            drawerToggle.addEventListener('click', function() {
                const isOpen = drawer.classList.contains('open');
                if (isOpen) { closeDrawer(); } else { openDrawer(); }
            });
            if (drawerClose) drawerClose.addEventListener('click', () => closeDrawer());
            drawerBackdrop.addEventListener('click', () => closeDrawer());

            // Keyboard handling
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && drawer.classList.contains('open')) {
                    e.preventDefault();
                    closeDrawer();
                } else if (e.key === 'Tab' && drawer.classList.contains('open')) {
                    // Focus trap
                    const focusables = Array.from(drawer.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
                    if (focusables.length === 0) return;
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            });

            // Accordion toggles
            drawer.querySelectorAll('.drawer-accordion').forEach(btn => {
                btn.addEventListener('click', function() {
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', String(!expanded));
                    const panel = document.getElementById(this.getAttribute('aria-controls'));
                    if (panel) {
                        panel.hidden = expanded;
                    }
                });
            });

            // Active state highlighting for drawer links
            const setActive = () => {
                const links = drawer.querySelectorAll('.drawer-link');
                const current = window.location.pathname.replace(/\/$/, '');
                links.forEach(link => {
                    const href = link.getAttribute('href') || '';
                    const path = href.replace(/\/$/, '');
                    const isActive = path && (current === path || current.startsWith(path));
                    link.classList.toggle('active', isActive);
                    if (isActive) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
                });
            };
            setActive();

            // Keyboard navigation for drawer menu
            const menu = drawer.querySelector('.drawer-menu');
            if (menu) {
                menu.addEventListener('keydown', function(e) {
                    const items = Array.from(menu.querySelectorAll('a.drawer-link, button.drawer-accordion'));
                    const index = items.indexOf(document.activeElement);
                    if (['ArrowDown','ArrowUp','Home','End'].includes(e.key)) e.preventDefault();
                    if (e.key === 'ArrowDown') { (items[index + 1] || items[0]).focus(); }
                    else if (e.key === 'ArrowUp') { (items[index - 1] || items[items.length - 1]).focus(); }
                    else if (e.key === 'Home') { if (items[0]) items[0].focus(); }
                    else if (e.key === 'End') { if (items[items.length - 1]) items[items.length - 1].focus(); }
                });
            }

            // Drawer dark mode toggle mirrors global toggle
            const drawerThemeToggle = document.getElementById('drawerThemeToggle');
            if (drawerThemeToggle) {
                const syncDrawerToggle = () => drawerThemeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark') ? 'true' : 'false');
                syncDrawerToggle();
                drawerThemeToggle.addEventListener('click', function() {
                    const mainToggle = document.getElementById('themeToggle');
                    if (mainToggle) mainToggle.click();
                    syncDrawerToggle();
                });
            }

            // Swipe gestures: open on right-swipe from left edge, close on left-swipe
            function onTouchStart(e) {
                if (e.touches && e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }

            function onTouchMove(e) {
                if (touchStartX === null) return;
                const dx = e.touches[0].clientX - touchStartX;
                const dy = e.touches[0].clientY - touchStartY;
                if (Math.abs(dx) < Math.abs(dy)) return; // ignore vertical scroll
                // prevent scroll while swiping horizontally
                e.preventDefault();
            }

            function onTouchEnd(e) {
                if (touchStartX === null) return;
                const endX = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX);
                const dx = endX - touchStartX;
                const threshold = 50;
                if (!drawer.classList.contains('open')) {
                    // Open if swipe right starting near left edge
                    if (touchStartX <= 24 && dx > threshold) {
                        openDrawer();
                    }
                } else {
                    // Close if swipe left inside drawer
                    const drawerRect = drawer.getBoundingClientRect();
                    if (touchStartX <= drawerRect.right && dx < -threshold) {
                        closeDrawer();
                    }
                }
                touchStartX = null;
                touchStartY = null;
            }

            document.addEventListener('touchstart', onTouchStart, { passive: true });
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd, { passive: true });
        }

        // Mobile account offcanvas toggle
        if (mobileAccountBtn && mobileAccountPanel) {
            mobileAccountBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileAccountPanel.classList.add('open');
                document.body.style.overflow = 'hidden';
            });

            const closePanel = () => {
                mobileAccountPanel.classList.remove('open');
                document.body.style.overflow = '';
            };

            if (mobileAccountClose) {
                mobileAccountClose.addEventListener('click', closePanel);
            }

            // Close on backdrop click
            document.addEventListener('click', function(e) {
                if (mobileAccountPanel.classList.contains('open')) {
                    if (!mobileAccountPanel.contains(e.target) && e.target !== mobileAccountBtn) {
                        closePanel();
                    }
                }
            }, { passive: true });

            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileAccountPanel.classList.contains('open')) {
                    closePanel();
                }
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
        // Keyboard navigation for dropdown menus (Arrow/Home/End/ESC)
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!(toggle && menu)) return;

            const items = () => Array.from(menu.querySelectorAll('.dropdown-item:not([disabled])'));

            // Open/close with keyboard
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    // ensure open
                    toggle.setAttribute('aria-expanded', 'true');
                    // Bootstrap handles open on click; simulate
                    toggle.click();
                    const list = items();
                    if (list.length) list[0].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    toggle.setAttribute('aria-expanded', 'true');
                    toggle.click();
                    const list = items();
                    if (list.length) list[list.length - 1].focus();
                }
            });

            // Navigate within menu
            menu.addEventListener('keydown', function(e) {
                const list = items();
                const currentIndex = list.indexOf(document.activeElement);
                if (['ArrowDown','ArrowUp','Home','End','Escape'].includes(e.key)) e.preventDefault();
                if (e.key === 'ArrowDown' && currentIndex > -1) {
                    const next = (currentIndex + 1) % list.length; list[next].focus();
                } else if (e.key === 'ArrowUp' && currentIndex > -1) {
                    const prev = (currentIndex - 1 + list.length) % list.length; list[prev].focus();
                } else if (e.key === 'Home' && list.length) {
                    list[0].focus();
                } else if (e.key === 'End' && list.length) {
                    list[list.length - 1].focus();
                } else if (e.key === 'Escape') {
                    toggle.click();
                    toggle.focus();
                }
            });
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

    function renderInlineError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        const errorEl = formGroup.querySelector('.inline-error');
        if (!errorEl) return;
        let message = '';
        if (!field.checkValidity()) {
            if (field.validity.valueMissing) message = 'This field is required.';
            else if (field.validity.typeMismatch) message = 'Please enter a valid value.';
            else if (field.validity.patternMismatch) message = 'Please match the requested format.';
            else if (field.validity.tooShort) message = 'Value is too short.';
            else if (field.validity.tooLong) message = 'Value is too long.';
        }
        errorEl.textContent = message;
        if (message) {
            if (window.WorkshopMobile) window.WorkshopMobile.announceToScreenReader(message);
        }
    }

    function initProfilePhotoUpload() {
        const dropzone = document.getElementById('photoDropzone');
        const input = document.getElementById('profilePhotoInput');
        const selectBtn = document.getElementById('profilePhotoSelectBtn');
        const cropBtn = document.getElementById('profilePhotoCropBtn');
        const preview = document.getElementById('profilePhotoPreview');
        if (!(dropzone && input && selectBtn && cropBtn && preview)) return;

        function onFile(file) {
            if (!file || !file.type.startsWith('image/')) return;
            const url = URL.createObjectURL(file);
            preview.src = url;
            preview.hidden = false;
            dropzone.classList.add('has-image');
            cropBtn.disabled = false;
        }

        selectBtn.addEventListener('click', () => input.click());
        dropzone.addEventListener('click', () => input.click());
        dropzone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
        input.addEventListener('change', (e) => { const file = e.target.files && e.target.files[0]; onFile(file); });

        ;['dragenter','dragover'].forEach(type => dropzone.addEventListener(type, (e) => {
            e.preventDefault(); e.stopPropagation(); dropzone.classList.add('dragging');
        }));
        ;['dragleave','drop'].forEach(type => dropzone.addEventListener(type, (e) => {
            e.preventDefault(); e.stopPropagation(); dropzone.classList.remove('dragging');
        }));
        dropzone.addEventListener('drop', (e) => {
            const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
            onFile(file);
        });

        cropBtn.addEventListener('click', function() {
            if (preview.hidden) return;
            // Simple center-square crop using canvas
            const img = new Image();
            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const sx = Math.floor((img.width - size) / 2);
                const sy = Math.floor((img.height - size) / 2);
                const canvas = document.createElement('canvas');
                canvas.width = size; canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
                preview.src = canvas.toDataURL('image/png');
                if (window.toastr) toastr.info('Photo cropped');
            };
            img.crossOrigin = 'anonymous';
            img.src = preview.src;
        });
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

    // Dark mode toggle persistence
    document.addEventListener('DOMContentLoaded', function() {
        const body = document.body;
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') body.classList.add('dark');
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            const sync = () => { toggle.setAttribute('aria-pressed', body.classList.contains('dark') ? 'true' : 'false'); };
            sync();
            toggle.addEventListener('click', function() {
                body.classList.toggle('dark');
                localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
                sync();
            });
        }
    });

})();
