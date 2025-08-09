// API Configuration for Josie Astrid Consulting Static Site
// This file allows you to configure the API endpoints without modifying the main application code

window.SITE_CONFIG = {
    // API Base URL Configuration
    // Update this to point to your backend API server
    API_BASE_URL: 'https://api.josieastrid.com',
    
    // Vapi Voice Agent Configuration
    VAPI_PUBLIC_KEY: '0cf8ba01-833e-42bc-8bb8-83cf4d3035b8',
    VAPI_ASSISTANT_ID: 'eea2ce9f-3124-462f-9a5c-3b6a0a16672b',
    
    // Alternative configurations for different environments:
    // Development: 'http://localhost:3000'
    // Staging: 'https://staging-api.josieastrid.com'
    // Production: 'https://api.josieastrid.com'
    
    // Form Service Configuration (Alternative to custom API)
    // Uncomment and configure one of these services if you prefer:
    
    // Formspree (https://formspree.io)
    // FORM_SERVICE_URL: 'https://formspree.io/f/your-form-id',
    // FORM_SERVICE_TYPE: 'formspree',
    
    // Netlify Forms (automatically detected if deployed on Netlify)
    // FORM_SERVICE_TYPE: 'netlify',
    
    // Getform (https://getform.io)
    // FORM_SERVICE_URL: 'https://getform.io/f/your-form-id',
    // FORM_SERVICE_TYPE: 'getform',
    
    // Contact form settings
    CONTACT_FORM: {
        enabled: true,
        showSuccessMessage: true,
        autoHideMessages: true,
        autoHideDelay: 5000 // milliseconds
    }
};

// Override app.js configuration with values from this file
if (typeof CONFIG !== 'undefined') {
    Object.assign(CONFIG, window.SITE_CONFIG);
}
