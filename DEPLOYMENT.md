# Deployment Guide for Astrid Consulting Static Site

## Overview

This static site has been converted from a Flask Python web app to run entirely in the browser with no server-side dependencies. All dynamic functionality is handled through configurable API endpoints.

## Previous Server Behaviors → Static Equivalents

### ✅ Template Rendering (Flask/Jinja2)
- **Before**: Flask routes (`/`, `/about`, `/contact`) rendered Jinja2 templates with `url_for()` helpers
- **Now**: Static HTML files (`index.html`, `about.html`, `contact.html`) with relative paths
- **Implementation**: Direct file references (e.g., `./static/style.css`, `./about.html`)

### ✅ Navigation & Routing
- **Before**: Flask `url_for()` generated dynamic URLs
- **Now**: Static HTML links with JavaScript for active state management
- **Implementation**: `app.js` handles mobile menu and active link highlighting

### ✅ Static Asset Serving
- **Before**: Flask served files from `/static/` directory
- **Now**: Direct relative paths to static assets
- **Implementation**: All assets remain in `static/` folder, referenced as `./static/filename`

### ✅ Contact Form (New Feature)
- **Before**: No contact form existed
- **Now**: Client-side form with configurable API submission
- **Implementation**: JavaScript POST to configurable API endpoint with success/error states

## Required API Endpoints

### Contact Form Submission
- **Endpoint**: `POST /api/contact`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string (email format)",
    "message": "string",
    "timestamp": "string (ISO 8601)"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Contact form submitted successfully"
  }
  ```
- **Error Response**: `400/500`
  ```json
  {
    "success": false,
    "error": "Error message"
  }
  ```

## Configuration

### API Base URL Configuration
Edit `config.js` to point to your API server:

```javascript
window.SITE_CONFIG = {
    API_BASE_URL: 'https://your-api-domain.com'
};
```

### Environment-Specific Configuration
- **Development**: `http://localhost:3000`
- **Staging**: `https://staging-api.josieastrid.com`
- **Production**: `https://api.josieastrid.com`

### Alternative Form Services
Instead of a custom API, you can use third-party form services:

#### Option 1: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Update `config.js`:
   ```javascript
   FORM_SERVICE_URL: 'https://formspree.io/f/your-form-id',
   FORM_SERVICE_TYPE: 'formspree'
   ```

#### Option 2: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to form in `contact.html`
3. Forms automatically handled by Netlify

#### Option 3: Getform
1. Sign up at [getform.io](https://getform.io)
2. Create a form endpoint
3. Update `config.js` with your endpoint URL

## GitHub Pages Deployment

### Step 1: Prepare Repository
```bash
# Remove Python-specific files (optional)
rm app.py requirements.txt
rm -rf venv/ templates/

# Ensure all static files are in place
ls -la
# Should see: index.html, about.html, contact.html, static/, config.js
```

### Step 2: Deploy to GitHub Pages
1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select source: "Deploy from a branch"
4. Choose branch: `main` or `master`
5. Choose folder: `/ (root)`
6. Click "Save"

### Step 3: Configure Custom Domain (Optional)
1. Add `CNAME` file with your domain:
   ```bash
   echo "www.josieastrid.com" > CNAME
   ```
2. Configure DNS with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

### Step 4: Test Deployment
1. Visit your GitHub Pages URL: `https://username.github.io/repository-name`
2. Test all navigation links
3. Test contact form (ensure API endpoint is configured)
4. Verify mobile menu functionality

## Local Testing

### Test Without Server
```bash
# Open directly in browser
open index.html
# or
firefox index.html
```

### Test with Local Server (Optional)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# Then visit: http://localhost:8000
```

## Verification Checklist

- [ ] Site opens from file:// URL without errors
- [ ] All navigation links work correctly
- [ ] Images and CSS load properly
- [ ] Mobile menu functions correctly
- [ ] Contact form shows loading states
- [ ] Success/error messages display correctly
- [ ] No Python dependencies required
- [ ] Works on GitHub Pages
- [ ] API configuration is properly set

## Troubleshooting

### Contact Form Not Working
1. Check browser console for errors
2. Verify API endpoint URL in `config.js`
3. Ensure API server has CORS enabled
4. Test API endpoint directly with curl/Postman

### Assets Not Loading on GitHub Pages
1. Ensure all paths use relative references (`./static/`)
2. Check file names match exactly (case-sensitive)
3. Verify files are committed to repository

### Mobile Menu Not Working
1. Check browser console for JavaScript errors
2. Ensure `app.js` is loading correctly
3. Verify DOM elements exist in HTML

## Security Notes

- No API keys or secrets are stored in the static files
- All configuration is done through `config.js`
- Form submissions go to external API (no sensitive data stored locally)
- HTTPS is enforced through GitHub Pages settings
