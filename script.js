// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add animation classes to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.classList.add('slide-in');
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav-content').prepend(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Progress bar animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('data-progress');
                const circle = progress.querySelector('.progress-bar');
                const offset = 283 - (283 * value) / 100;
                
                // Add animation
                circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                circle.style.strokeDashoffset = offset;
                
                // Remove observer after animation
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(progress => {
        // Set initial state
        const circle = progress.querySelector('.progress-bar');
        circle.style.strokeDashoffset = '283';
        
        // Start observing
        observer.observe(progress);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProgressBars();
});

// Reinitialize on navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            initializeProgressBars();
        }
    });
});
