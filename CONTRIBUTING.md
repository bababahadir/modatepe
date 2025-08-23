# Contributing to Modatepe Website

Thank you for your interest in contributing to the Modatepe Restaurant & Accommodation website!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/modatepe-website.git
   cd modatepe-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Gmail credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
app/
├── [locale]/           # Multi-language routes
│   ├── page.tsx        # Homepage
│   ├── restoran/       # Restaurant page
│   ├── konaklama/      # Accommodation page
│   ├── blog/           # Blog system
│   └── iletisim/       # Contact page
├── api/                # API routes
│   ├── contact/        # Contact form handler
│   └── feedback/       # Feedback form handler
└── globals.css         # Global styles

components/
├── ui/                 # shadcn/ui components
├── header.tsx          # Site header
├── footer.tsx          # Site footer
├── contact-form.tsx    # Contact form
├── feedback-form.tsx   # Feedback form
└── google-map.tsx      # Map component

locales/
├── tr.json            # Turkish translations
├── en.json            # English translations
└── ar.json            # Arabic translations
```

## Code Style

- Use TypeScript for all new code
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Use shadcn/ui components when possible
- Maintain responsive design principles

## Adding New Languages

1. Create new translation file in `/locales/`
2. Add locale to `lib/i18n.ts`
3. Update language switcher component
4. Test RTL support if needed

## Adding New Pages

1. Create page in appropriate locale directory
2. Add translations to all language files
3. Update navigation components
4. Add to sitemap if needed

## Testing

- Test all forms with real email configuration
- Verify responsive design on all devices
- Test multi-language functionality
- Check SEO meta tags and structured data

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request with clear description

## Contact

For questions about contributing, please open an issue or contact the maintainers.