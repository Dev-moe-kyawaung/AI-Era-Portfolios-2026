// ============================================
// Moe Kyaw Aung Portfolio - Main JavaScript
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initLoader();
    initNavbar();
    initThemeToggle();
    initMobileMenu();
    initStats();
    initSmoothScroll();
    initAnimations();
});

// Loading Screen
function initLoader() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2500);
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update body class
            document.body.classList.remove('dark-theme', 'light-theme');
            document.body.classList.add(`${newTheme}-theme`);
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Animate Stats
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStat = (stat) => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Use Intersection Observer to animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// GSAP Animations
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('.app-card, .github-card, .contact-card').forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }
}

// AOS Animation Library
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// Custom Cursor
const cursor = {
    dot: null,
    outline: null,
    x: 0,
    y: 0,
    outlineX: 0,
    outlineY: 0
};

function initCursor() {
    if (window.innerWidth > 1024) {
        cursor.dot = document.querySelector('.cursor-dot');
        cursor.outline = document.querySelector('.cursor-outline');
        
        if (cursor.dot && cursor.outline) {
            document.addEventListener('mousemove', (e) => {
                cursor.x = e.clientX;
                cursor.y = e.clientY;
                
                // Move dot instantly
                cursor.dot.style.left = cursor.x + 'px';
                cursor.dot.style.top = cursor.y + 'px';
            });
            
            // Animate outline with delay
            function animateOutline() {
                cursor.outlineX += (cursor.x - cursor.outlineX) * 0.15;
                cursor.outlineY += (cursor.y - cursor.outlineY) * 0.15;
                
                cursor.outline.style.left = cursor.outlineX + 'px';
                cursor.outline.style.top = cursor.outlineY + 'px';
                
                requestAnimationFrame(animateOutline);
            }
            
            animateOutline();
            
            // Add hover effect on links
            const links = document.querySelectorAll('a, button');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursor.outline.style.width = '60px';
                    cursor.outline.style.height = '60px';
                });
                
                link.addEventListener('mouseleave', () => {
                    cursor.outline.style.width = '40px';
                    cursor.outline.style.height = '40px';
                });
            });
        }
    }
}

// Initialize cursor
initCursor();

// Export for use in other files
window.portfolioUtils = {
    initLoader,
    initNavbar,
    initThemeToggle,
    initMobileMenu,
    initStats,
    initSmoothScroll,
    initAnimations
};
