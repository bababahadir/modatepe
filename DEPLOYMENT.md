# Deployment Guide

## Environment Variables

Before deploying, make sure to set up the following environment variables:

### Required Variables

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to "Security" tab
3. Enable "2-Step Verification"
4. Go to "App passwords"
5. Select "Mail" category and generate password
6. Use the generated 16-character password as `GMAIL_APP_PASSWORD`

## Deployment Options

### 1. Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/modatepe-website)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### 2. Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`
4. Add environment variables in Netlify dashboard

### 3. Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Domain Configuration

Update the following files with your domain:

- `next.config.js` - Update images domains if needed
- `app/sitemap.ts` - Update site URLs
- `components/seo-head.tsx` - Update canonical URLs

## Contact Form Configuration

The contact forms use Gmail SMTP. Make sure to:

1. Set up Gmail App Password (see above)
2. Configure environment variables
3. Test form submission in production

## Multi-language Support

The site supports:
- Turkish (TR) - Default
- English (EN)
- Arabic (AR) - RTL support

Language files are in `/locales/` directory.