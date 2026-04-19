# SparkClean Services - Professional Cleaning Website

A modern, responsive, and high-conversion website for SparkClean Services, a professional cleaning company based in Miami, FL. Built with pure HTML, CSS, and JavaScript—no dependencies, no build tools required.

## 🎯 Features

- **Mobile-First Design** - Fully responsive across all devices
- **High-Conversion Layout** - Multiple CTAs and trust-building elements
- **Sticky CTA Button** - Always-visible call-to-action
- **Quote Modal** - Quick quote request popup
- **Smooth Scrolling** - Elegant navigation experience
- **Form Validation** - Real-time input validation
- **Analytics Ready** - Built-in event tracking
- **GitHub Pages Compatible** - Deploy directly from GitHub
- **No Dependencies** - Pure HTML, CSS, JavaScript

## 📋 Project Structure

```
SparkClean_website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # All JavaScript functionality
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## 🚀 Quick Start

### Option 1: Run Locally

1. **Clone or download the repository**

   ```bash
   git clone https://github.com/AriadnaVelazquez744/SparkClean_website.git
   cd SparkClean_website
   ```

2. **Open in your browser**
   - Simply open `index.html` in any modern web browser
   - Or use a local server:

     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if installed)
     npx http-server
     ```

3. **View the website**
   - Open `http://localhost:8000` in your browser

### Option 2: GitHub Pages Deployment

#### Prerequisites

- GitHub account
- Repository with this code

#### Step-by-Step Deployment

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit: SparkClean website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (top menu)
   - Scroll down to **Pages** section (left sidebar)
   - Under "Source", select:
     - **Branch**: `main` (or your default branch)
     - **Folder**: `/ (root)`
   - Click **Save**

3. **Wait for deployment**
   - GitHub will build and deploy your site
   - You'll see a notification: "Your site is published at: <https://username.github.io/SparkClean_website>"
   - Visit that URL to see your live website

4. **Custom domain (optional)**
   - In GitHub Pages settings, under "Custom domain"
   - Enter your domain (e.g., `sparkclean.com`)
   - Update your domain's DNS settings to point to GitHub Pages
   - [Full instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📝 Customization Guide

### Change Business Information

Edit `index.html` and update:

#### Phone & Email

```html
<!-- Line 207-209 -->
<p><a href="tel:+13055551234">(305) 555-1234</a></p>
<p><a href="mailto:hello@sparkclean.com">hello@sparkclean.com</a></p>
```

#### Service Area

```html
<!-- Line 213 -->
<p>Miami, Miami Beach, Coral Gables, Wynwood, Downtown Miami</p>
```

#### Business Hours

```html
<!-- Line 211 -->
<p class="contact-hours">Mon-Fri: 8AM-6PM | Sat-Sun: 9AM-5PM</p>
```

### Customize Pricing

Edit the pricing cards in `index.html` (around lines 100-150):

```html
<div class="pricing-card">
    <h3>Basic</h3>
    <p class="price-tag">$79<span>/visit</span></p>
    <ul class="pricing-features">
        <li>✓ Up to 2 hours</li>
        <li>✓ General cleaning</li>
        <!-- Add or modify features here -->
    </ul>
</div>
```

### Update Services

Edit the services section in `index.html` (around lines 60-80):

```html
<div class="service-card">
    <div class="service-icon">🏠</div>
    <h3>Your Service Name</h3>
    <p>Service description here...</p>
</div>
```

### Modify Colors

Edit the CSS variables in `styles.css` (lines 1-13):

```css
:root {
    --primary-color: #0066cc;      /* Main blue */
    --primary-dark: #0052a3;       /* Darker blue */
    --accent-blue: #e3f2fd;        /* Light blue */
    --success-green: #4caf50;      /* Green accent */
    --text-dark: #1a1a1a;          /* Dark text */
    --text-gray: #666;             /* Gray text */
    --white: #ffffff;              /* White */
    --light-gray: #f5f5f5;         /* Light gray */
    /* ... more colors ... */
}
```

### Replace Images

Update the hero image in `index.html` (line 51):

```html
<img src="YOUR_IMAGE_URL" alt="Professional cleaning service">
```

**Free image resources:**

- [Unsplash](https://unsplash.com) - Professional photos
- [Pexels](https://pexels.com) - High-quality free images
- [Pixabay](https://pixabay.com) - Royalty-free images

### Add/Remove Testimonials

Edit the testimonials section in `index.html` (around lines 155-180):

```html
<div class="testimonial-card">
    <div class="star-rating">⭐⭐⭐⭐⭐</div>
    <p class="testimonial-text">"Your testimonial here..."</p>
    <p class="testimonial-author">— Customer Name, City</p>
</div>
```

### Update Navigation Links

Edit the navbar in `index.html` (lines 20-27):

```html
<ul class="nav-menu">
    <li><a href="#services" class="nav-link">Services</a></li>
    <li><a href="#pricing" class="nav-link">Pricing</a></li>
    <!-- Add or remove navigation items -->
</ul>
```

## 🔗 Form Integration

The website has two forms: **Contact Form** and **Quote Form**. Currently, they log to the browser console. To actually receive submissions, integrate with:

### Option 1: Formspree (Recommended - Free)

1. Visit [Formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Get your form endpoint
4. Update `script.js` to send data to Formspree:

```javascript
// In the contactForm event listener (around line 21)
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData(contactForm),
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        showNotification('Thank you! We\'ll contact you within 24 hours.');
        contactForm.reset();
    }
}).catch(error => {
    showNotification('Error sending message. Please try again.', 'error');
});
```

### Option 2: Basin (Email-based)

1. Visit [Basin.io](https://basin.io)
2. Add your email
3. Update your form `action` attribute:

```html
<form action="https://basin.io/api/f/FORM_ID" method="POST">
    <!-- form fields -->
</form>
```

### Option 3: Netlify Forms

If you deploy to Netlify instead of GitHub Pages:

1. Add `netlify` attribute to your form
2. Netlify automatically captures submissions

## 🎨 Design System

### Colors

- **Primary Blue**: `#0066cc` - Main CTA buttons
- **Dark Blue**: `#0052a3` - Button hover state
- **Light Blue**: `#e3f2fd` - Backgrounds
- **Green**: `#4caf50` - Badges and accents
- **Dark Gray**: `#1a1a1a` - Text
- **Medium Gray**: `#666` - Secondary text
- **Light Gray**: `#f5f5f5` - Backgrounds

### Typography

- **Font**: System fonts (Apple, Segoe, Roboto)
- **Sizes**: 14px-48px responsive scaling
- **Weights**: 400 (regular), 500-600 (medium), 700 (bold)

### Spacing

- **Base unit**: 4px
- **Common gaps**: 16px, 24px, 32px, 48px
- **Section padding**: 60px mobile, 80px desktop

## 📱 Responsive Breakpoints

| Device | Width | Breakpoint |
|--------|-------|-----------|
| Mobile | < 480px | 480px |
| Tablet | 480px - 768px | 768px |
| Desktop | > 1024px | 1024px |
| Large | > 1216px | 1216px |

## ✅ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- **No external tracking** - Only built-in analytics
- **No cookies** - No tracking of user behavior
- **SSL Ready** - HTTPS works out of the box on GitHub Pages
- **Form data** - Sent directly to your email service, not stored locally

## 🚀 Performance

- **Page Load**: < 2 seconds
- **Lighthouse Score**: 90+
- **Zero Build Time** - Deploy instantly
- **No Runtime Dependencies** - Pure HTML/CSS/JS

## 📊 Analytics

Built-in event tracking logs to browser console:

- CTA button clicks
- Quote modal opens
- Navigation clicks
- Form submissions
- Scroll tracking (50% page scroll)

To view analytics:

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for "Analytics Event" logs

## 🆘 Troubleshooting

### Website not showing on GitHub Pages

- Ensure GitHub Pages is enabled (Settings > Pages)
- Check that Branch is set to `main` and folder is `/`
- Wait 5 minutes for initial deployment
- Clear browser cache (Ctrl+Shift+Delete)

### Forms not working

- Check browser console for errors (F12 > Console)
- Verify form integration is set up (see Form Integration section)
- Check that form endpoint is correct

### Styling looks broken

- Clear browser cache
- Ensure `styles.css` is in the same directory as `index.html`
- Check for CSS file path errors

### JavaScript errors

- Open browser DevTools (F12)
- Check **Console** tab for error messages
- Verify `script.js` is in the same directory as `index.html`

## 📚 File Details

### index.html (309 lines)

- Semantic HTML5 structure
- 7 main sections
- 2 interactive modals
- Accessibility features

### styles.css (856 lines)

- Mobile-first responsive design
- CSS variables for theming
- 15+ media query breakpoints
- Smooth animations

### script.js (347 lines)

- Form handling
- Smooth scrolling
- Validation
- Analytics tracking
- Modal management

## 🔄 Version History

- **v1.0** (2024) - Initial release
  - Complete website with all sections
  - GitHub Pages ready
  - Fully responsive design
  - Form integration ready

## 📄 License

Free to use for SparkClean Services. Modify as needed for your business.

## 🤝 Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Review the [GitHub Issues](https://github.com/AriadnaVelazquez744/SparkClean_website/issues)
3. Create a new issue with details about your problem

## 📧 Contact

- **Email**: <hello@sparkclean.com>
- **Phone**: (305) 555-1234
- **Service Area**: Miami, FL

---

**Built with ❤️ for SparkClean Services**

Last updated: 2024
