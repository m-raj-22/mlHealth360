// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Add animation classes to form groups
formGroups.forEach((group, index) => {
    group.style.opacity = '0';
    group.style.animationDelay = `${index * 0.1}s`;
});

// Form submission handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Gather form data
    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        product: contactForm.product.value,
        message: contactForm.message.value
    };

    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        // Show error message
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Form field animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});
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

    toggleButton.addEventListener("click", () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);

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

    // Existing contact.js code remains unchanged
});