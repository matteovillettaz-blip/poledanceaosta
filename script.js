// ===== DOM ELEMENTS =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const scheduleDays = document.querySelectorAll('.schedule-day');
const bookingForm = document.getElementById('bookingForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== MOBILE MENU TOGGLE =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator click
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// ===== SCHEDULE TABS =====
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const day = btn.dataset.day;

        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding schedule
        scheduleDays.forEach(schedule => {
            schedule.classList.remove('active');
            if (schedule.id === day) {
                schedule.classList.add('active');
            }
        });
    });
});

// ===== FORM HANDLING =====
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        const requiredFields = ['nome', 'cognome', 'email', 'telefono', 'corso'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });

        // Check privacy checkbox
        const privacy = this.querySelector('[name="privacy"]');
        if (!privacy.checked) {
            isValid = false;
            privacy.parentElement.style.color = '#e74c3c';
        } else {
            privacy.parentElement.style.color = '';
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                showNotification('Richiesta inviata con successo! Ti contatteremo presto.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            showNotification('Per favore compila tutti i campi obbligatori.', 'error');
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.corso-card, .istruttore-card, .prezzo-card, .testimonial-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Add animation class styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, stepTime);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                stat.textContent = '0' + suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===== TESTIMONIALS TOUCH SWIPE =====
const testimonialsSlider = document.querySelector('.testimonials-slider');

if (testimonialsSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events (for desktop testing)
    testimonialsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialsSlider.classList.add('grabbing');
        startX = e.pageX - testimonialsSlider.offsetLeft;
        scrollLeft = testimonialsSlider.scrollLeft;
    });

    testimonialsSlider.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialsSlider.classList.remove('grabbing');
    });

    testimonialsSlider.addEventListener('mouseup', () => {
        isDown = false;
        testimonialsSlider.classList.remove('grabbing');
    });

    testimonialsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsSlider.scrollLeft = scrollLeft - walk;
    });

    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;

    testimonialsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = testimonialsSlider.scrollLeft;
    }, { passive: true });

    testimonialsSlider.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 1.5;
        testimonialsSlider.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    // Add swipe indicator dots
    const cards = testimonialsSlider.querySelectorAll('.testimonial-card');
    if (cards.length > 1 && window.innerWidth <= 768) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'swipe-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        `;

        cards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'swipe-dot';
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: ${i === 0 ? '#9b4d96' : 'rgba(255,255,255,0.3)'};
                transition: background 0.3s ease;
            `;
            dotsContainer.appendChild(dot);
        });

        testimonialsSlider.parentElement.appendChild(dotsContainer);

        // Update dots on scroll
        testimonialsSlider.addEventListener('scroll', () => {
            const scrollPos = testimonialsSlider.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 16; // including gap
            const activeIndex = Math.round(scrollPos / cardWidth);

            dotsContainer.querySelectorAll('.swipe-dot').forEach((dot, i) => {
                dot.style.background = i === activeIndex ? '#9b4d96' : 'rgba(255,255,255,0.3)';
            });
        });
    }
}

// ===== MOBILE CTA BAR BEHAVIOR =====
const mobileCTABar = document.querySelector('.mobile-cta-bar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateMobileCTABar() {
    const currentScrollY = window.scrollY;
    const footer = document.querySelector('.footer');
    const footerTop = footer ? footer.offsetTop : Infinity;

    // Hide when near footer
    if (currentScrollY + window.innerHeight > footerTop - 50) {
        mobileCTABar.style.transform = 'translateY(100%)';
    } else {
        mobileCTABar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

if (mobileCTABar) {
    mobileCTABar.style.transition = 'transform 0.3s ease';

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateMobileCTABar);
            ticking = true;
        }
    });
}

// ===== IMPROVED MOBILE MENU =====
// Add backdrop when menu is open
const menuBackdrop = document.createElement('div');
menuBackdrop.className = 'menu-backdrop';
menuBackdrop.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 998;
`;
document.body.appendChild(menuBackdrop);

// Enhanced toggle behavior
navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('active');
    menuBackdrop.style.opacity = isOpen ? '0' : '1';
    menuBackdrop.style.visibility = isOpen ? 'hidden' : 'visible';
});

menuBackdrop.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuBackdrop.style.opacity = '0';
    menuBackdrop.style.visibility = 'hidden';
    document.body.style.overflow = '';
});

// Close menu on link click (update existing)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBackdrop.style.opacity = '0';
        menuBackdrop.style.visibility = 'hidden';
    });
});

// ===== DETECT TOUCH DEVICE =====
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ===== PRELOADER (optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== NOTIFICATION POSITION FIX FOR MOBILE =====
function updateNotificationPosition() {
    const notification = document.querySelector('.notification');
    if (notification && window.innerWidth <= 768) {
        notification.style.bottom = '100px'; // Above mobile CTA bar
        notification.style.right = '15px';
        notification.style.left = '15px';
        notification.style.maxWidth = 'none';
    }
}

// Override showNotification for mobile
const originalShowNotification = showNotification;
showNotification = function(message, type) {
    originalShowNotification(message, type);
    updateNotificationPosition();
};

// ===== LOG WELCOME MESSAGE =====
console.log('%c Pole Dance Aosta ', 'background: linear-gradient(135deg, #9b4d96, #7a3d78); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Benvenuto nel nostro sito! ', 'color: #9b4d96; font-size: 14px;');
