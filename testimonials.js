document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.dataset.index) * 200;
                card.style.animation = `fadeInUp 0.5s ease-out ${delay}ms forwards`;
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach((card) => {
        observer.observe(card);
    });
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

    // Existing testimonials.js code remains unchanged
});