// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const dropdowns = document.querySelectorAll('.dropdown');


menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Handle dropdowns in mobile view
dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');

    dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});


// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Update footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated number counting for stats
const stats = document.querySelectorAll('.stat-number');

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const endValue = parseInt(target.getAttribute('data-value'));
            animateValue(target, 0, endValue, 2000);
            statsObserver.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current nav link
const currentLocation = window.location.pathname;
const navLinksArray = document.querySelectorAll('.nav-links a');

navLinksArray.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
});

AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true
});


// Function to handle scrolling to section based on URL parameter
document.addEventListener("DOMContentLoaded", function () {
    // Select all product links
    const productLinks = document.querySelectorAll(".product-link");

    productLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            const section = this.getAttribute("data-section"); // Get the section name
            window.location.href = `product.html#${section}`; // Redirect with query param
        });
    });
});


// Video Player Functionality
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const videoWrapper = document.querySelector('.video-wrapper');
const demoVideo = document.getElementById('demoVideo');
const thumbnail = document.querySelector('.video-thumbnail');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
// Format time in minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
function updateTimeDisplay() {
    currentTimeDisplay.textContent = formatTime(demoVideo.currentTime);
    durationDisplay.textContent = formatTime(demoVideo.duration);
}

function playVideo() {
    demoVideo.classList.add('active');
    playButton.classList.add('hidden');
    thumbnail.style.display = 'none';
    demoVideo.play();
}

function stopVideo() {
    demoVideo.classList.remove('active');
    playButton.classList.remove('hidden');
    thumbnail.style.display = 'block';
    demoVideo.pause();
    demoVideo.currentTime = 0;
}

playButton.addEventListener('click', playVideo);

// Stop video when clicking outside
document.addEventListener('click', (e) => {
    if (!videoWrapper.contains(e.target) && demoVideo.classList.contains('active')) {
        stopVideo();
    }
});

// Stop video when pressing ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoVideo.classList.contains('active')) {
        stopVideo();
    }
});

// Video ended event
demoVideo.addEventListener('ended', stopVideo);

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



// Demo Popup Functionality
const demoPopup = document.getElementById('demoPopup');
const demoButtons = document.querySelectorAll('.schedule-demo, .btn-primary[aria-label="Schedule a demo"]');
const closePopup = document.getElementById('closePopup');
const demoForm = document.getElementById('demoForm');
// Open popup
demoButtons.forEach(button => {
    button.addEventListener('click', () => {
        demoPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});
// Close popup
closePopup.addEventListener('click', () => {
    demoPopup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});
// Close popup when clicking outside
demoPopup.addEventListener('click', (e) => {
    if (e.target === demoPopup) {
        demoPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// Handle form submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    // For now, we'll just show a success message
    const formData = new FormData(demoForm);
    console.log('Demo requested:', Object.fromEntries(formData));
    // Show success message
    demoForm.innerHTML = `
        <div class="success-message">
            <h3>Thank you for your interest!</h3>
            <p>We'll get back to you shortly to schedule your demo.</p>
        </div>
    `;
    // Close popup after 3 seconds
    setTimeout(() => {
        demoPopup.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        demoForm.reset();
    }, 3000);
});
