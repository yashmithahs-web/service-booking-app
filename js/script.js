// JavaScript for Service Booking App

// Log a message when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Service Booking App loaded!');
    initializeApp();
});

// Initialize the app
function initializeApp() {
    setupEventListeners();
    setupAccountTypeToggle();
    console.log('App initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Get Started button on homepage
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary && !document.getElementById('signupForm')) {
        btnPrimary.addEventListener('click', function() {
            handleGetStarted();
        });
    }

    // Book Now buttons on Services page
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleBookNow(this);
        });
    });

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

// Setup account type toggle for Sign Up page
function setupAccountTypeToggle() {
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    
    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const serviceTypeGroup = document.getElementById('serviceTypeGroup');
            const experienceGroup = document.getElementById('experienceGroup');
            
            if (this.value === 'provider') {
                // Show provider fields
                if (serviceTypeGroup) serviceTypeGroup.style.display = 'block';
                if (experienceGroup) experienceGroup.style.display = 'block';
            } else {
                // Hide provider fields
                if (serviceTypeGroup) serviceTypeGroup.style.display = 'none';
                if (experienceGroup) experienceGroup.style.display = 'none';
            }
        });
    });
}

// Handle Get Started button click
function handleGetStarted() {
    alert('Welcome! Ready to get started?\n\n• Click "Services" to browse available services\n• Click "Sign Up" to create an account\n\nLet\'s book a service!');
}

// Handle Book Now button click
function handleBookNow(button) {
    const serviceCard = button.closest('.service-card');
    const serviceName = serviceCard.querySelector('h3').textContent;
    
    alert(`Great! You selected: ${serviceName}\n\nPlease sign up first to complete your booking.\n\nRedirecting to Sign Up...`);
    
    // Redirect to Sign Up page
    setTimeout(() => {
        window.location.href = 'signup.html';
    }, 1000);
}

// Handle Sign Up form submission
function handleSignup(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Create user object
    const user = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        accountType: accountType,
        registeredAt: new Date().toLocaleString()
    };
    
    // Add provider-specific fields if applicable
    if (accountType === 'provider') {
        const serviceType = document.getElementById('serviceType').value;
        const experience = document.getElementById('experience').value;
        
        if (!serviceType || !experience) {
            showNotification('Please fill in all provider details', 'error');
            return;
        }
        
        user.serviceType = serviceType;
        user.experience = experience;
    }
    
    // Save to localStorage (we'll use a database later)
    localStorage.setItem('user_' + email, JSON.stringify(user));
    
    // Show success message
    showNotification(`Welcome ${fullName}! Your account has been created successfully!`, 'success');
    
    console.log('User registered:', user);
    
    // Clear form
    document.getElementById('signupForm').reset();
    
    // Redirect to home page after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Search services function
function searchServices() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const serviceCards = document.querySelectorAll('.service-card');
    let foundCount = 0;
    
    serviceCards.forEach(card => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (serviceName.includes(searchInput) || serviceDesc.includes(searchInput)) {
            card.style.display = 'block';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (foundCount === 0 && searchInput !== '') {
        showNotification('No services found matching your search', 'info');
    }
}

// Handle Enter key in search box
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchServices();
            }
        });
    }
});

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to show notifications
function showNotification(message, type = 'info') {
    const types = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Create a simple visual notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        font-size: 1rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = `${types[type]} ${message}`;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for future use
console.log('Functions loaded: handleGetStarted, handleBookNow, handleSignup, searchServices, showNotification');
