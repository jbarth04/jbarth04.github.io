// Configuration for API endpoints
const CONFIG = {
    // Configure this to point to your API server
    // For development: 'http://localhost:3000'
    // For staging: 'https://staging-api.josieastrid.com'
    // For production: 'https://api.josieastrid.com'
    API_BASE_URL: 'https://api.josieastrid.com',
    
    // Alternative: Use a form service like Formspree, Netlify Forms, or Getform
    // FORM_SERVICE_URL: 'https://formspree.io/f/your-form-id'
};

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when a nav link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Update active link in mobile menu based on current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    mobileNavLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('./', '');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Contact form submission handler
async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    hideMessages();
    
    try {
        // Option 1: Send to custom API endpoint
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            showSuccessMessage();
            form.reset();
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Contact form submission error:', error);
        
        // Fallback: Try alternative form service (uncomment to use)
        // await submitToFormService(formData);
        
        showErrorMessage();
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Alternative form service submission (Formspree, Netlify Forms, etc.)
async function submitToFormService(formData) {
    try {
        const response = await fetch(CONFIG.FORM_SERVICE_URL, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showSuccessMessage();
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Form service submission failed');
        }
    } catch (error) {
        console.error('Form service submission error:', error);
        throw error;
    }
}

// UI helper functions
function showSuccessMessage() {
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    
    hideMessages();
    formStatus.style.display = 'block';
    successMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(hideMessages, 5000);
}

function showErrorMessage() {
    const formStatus = document.getElementById('form-status');
    const errorMessage = document.getElementById('error-message');
    
    hideMessages();
    formStatus.style.display = 'block';
    errorMessage.style.display = 'block';
}

function hideMessages() {
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (formStatus) formStatus.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}

// Utility function to update API configuration
function updateAPIConfig(newBaseUrl) {
    CONFIG.API_BASE_URL = newBaseUrl;
    console.log('API base URL updated to:', newBaseUrl);
}
