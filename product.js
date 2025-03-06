//product.js

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Enhanced Banner hover effect
const bannerContainer = document.querySelector('.banner-container');
const mainImage = document.querySelector('.main-image');
const hoverImage = document.querySelector('.hover-image');

bannerContainer.addEventListener('mouseenter', () => {
    setTimeout(() => {
        mainImage.style.transform = 'scale(1.05)';
        hoverImage.classList.add('visible');
    }, 500);
});

bannerContainer.addEventListener('mouseleave', () => {
    mainImage.style.transform = 'scale(1)';
    hoverImage.classList.remove('visible');
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for anchor links
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

            // Close mobile menu after clicking a link
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Add active class to current nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.product-section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initial call to set active nav link
updateActiveNavLink();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced floating elements animation
document.addEventListener('mousemove', (e) => {
    const floatElements = document.querySelectorAll('.float-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const baseX = (mouseX - 0.5) * 50 * speed;
        const baseY = (mouseY - 0.5) * 50 * speed;
        const delay = index * 100;

        setTimeout(() => {
            element.style.transform = `translate(${baseX}px, ${baseY}px)`;
        }, delay);
    });

    // Add subtle movement to medical background elements
    const bgElements = document.querySelectorAll('.medical-bg-element');
    bgElements.forEach(element => {
        const x = (mouseX - 0.5) * 20;
        const y = (mouseY - 0.5) * 20;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});


// Doctor images animation 
const doctorImages = document.querySelectorAll('.doctor-image');
doctorImages.forEach(img => {
    img.style.transition = 'transform 0.3s ease-in-out';
});

const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

doctorImages.forEach(img => {
    img.style.transform = 'scale(0.95)';
    img.style.opacity = '0.8';
    imageObserver.observe(img);
});

// Floating icons animation
document.querySelectorAll('.float-icon').forEach((icon, index) => {
    const delay = index * 0.2;
    icon.style.animation = `float 3s ease-in-out ${delay}s infinite`;
});

// Add gradient animation to background elements
document.querySelectorAll('.medical-bg-element').forEach(element => {
    element.style.transition = 'transform 0.3s ease-out';
});

// Optimize performance with requestAnimationFrame
let ticking = false;
document.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('.product-section').forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.5;
                    const yPos = -(scrolled * speed);
                    section.querySelector('.medical-bg-element').style.transform =
                        `translate3d(0, ${yPos}px, 0)`;
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Dark mode functionality
// Dark mode functionality
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    const root = document.documentElement;

    // Check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
        root.setAttribute('data-theme', 'dark');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Add transition class to body
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    toggleButton.addEventListener("click", () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);

        // Update button icon
        toggleButton.innerHTML = newTheme === 'dark' ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem("theme")) {
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            toggleButton.innerHTML = e.matches ?
                '<i class="fas fa-sun"></i>' :
                '<i class="fas fa-moon"></i>';
        }
    });
});

// Existing testimonials.js code remains unchanged