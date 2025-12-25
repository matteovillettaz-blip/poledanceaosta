// ===== Mobile-First JavaScript =====

// DOM Elements
const topBar = document.querySelector('.top-bar');
const menuBtn = document.querySelector('.menu-btn');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const menuLinks = document.querySelectorAll('.fullscreen-menu a');
const tabs = document.querySelectorAll('.tab');
const scheduleDays = document.querySelectorAll('.schedule-day');
const bookingForm = document.getElementById('bookingForm');
const bottomNav = document.querySelector('.bottom-nav');

// ===== Menu Toggle =====
menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// ===== Top Bar Scroll Effect =====
let lastScroll = 0;
const heroSection = document.querySelector('.hero');

function updateTopBar() {
    const currentScroll = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    // Add scrolled class
    if (currentScroll > 50) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }

    // Dark mode for hero
    if (currentScroll < heroHeight - 100) {
        topBar.classList.add('dark');
    } else {
        topBar.classList.remove('dark');
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateTopBar, { passive: true });
updateTopBar();

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const offset = 70;
            const position = target.offsetTop - offset;
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Schedule Tabs =====
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const day = tab.dataset.day;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding day
        scheduleDays.forEach(d => {
            d.classList.remove('active');
            if (d.id === day) {
                d.classList.add('active');
            }
        });
    });
});

// ===== Form Handling =====
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

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
                input.style.borderColor = 'transparent';
            }
        });

        // Check privacy checkbox
        const privacy = this.querySelector('[name="privacy"]');
        if (!privacy.checked) {
            isValid = false;
        }

        if (isValid) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showNotification('Richiesta inviata! Ti contatteremo presto.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            showNotification('Compila tutti i campi obbligatori.', 'error');
        }
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    const bgColor = type === 'success' ? '#25D366' : type === 'error' ? '#e74c3c' : '#3498db';

    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 16px;
        right: 16px;
        padding: 16px 20px;
        background: ${bgColor};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;

    // Add animation
    if (!document.querySelector('#notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Bottom Nav Hide on Footer =====
if (bottomNav) {
    const footer = document.querySelector('.footer');

    function updateBottomNav() {
        if (!footer) return;

        const footerTop = footer.offsetTop;
        const scrollBottom = window.scrollY + window.innerHeight;

        if (scrollBottom > footerTop + 50) {
            bottomNav.style.transform = 'translateY(100%)';
        } else {
            bottomNav.style.transform = 'translateY(0)';
        }
    }

    bottomNav.style.transition = 'transform 0.3s ease';
    window.addEventListener('scroll', updateBottomNav, { passive: true });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.corso-card, .team-card, .price-card, .testimonial, .feature').forEach(el => {
    el.style.opacity = '0';
    animateObserver.observe(el);
});

// ===== Stats Counter Animation =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            statNums.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');

                animateCounter(stat, number, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
    statsObserver.observe(statsStrip);
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// ===== Touch Device Detection =====
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}

// ===== Horizontal Scroll Cards - Touch Enhancement =====
const scrollContainers = document.querySelectorAll('.corsi-scroll, .team-scroll, .testimonial-scroll');

scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    container.style.cursor = 'grab';
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===== Console Welcome =====
console.log(
    '%c Pole Dance Aosta ',
    'background: linear-gradient(135deg, #9b4d96, #7a3d78); color: white; padding: 12px 24px; font-size: 16px; border-radius: 8px; font-weight: bold;'
);
console.log('%c Mobile-First Design v2 ', 'color: #9b4d96; font-size: 12px;');
