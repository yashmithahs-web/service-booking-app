// JavaScript for Service Booking App

// Log a message when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Service Booking App loaded!');
    initializeApp();
});

// Initialize the app
function initializeApp() {
    setupEventListeners();
    console.log('App initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Get Started button
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function() {
            handleGetStarted();
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Handle Get Started button click
function handleGetStarted() {
    alert('Welcome! This feature is coming soon.\n\nYou will be able to:\n- Create an account\n- Browse services\n- Book appointments\n\nStay tuned!');
}

// Function to scroll to top (useful for later)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to show notifications (useful for later)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // We'll build a visual notification system later
}

// Export functions for future use
console.log('Functions loaded: handleGetStarted, scrollToTop, showNotification');
