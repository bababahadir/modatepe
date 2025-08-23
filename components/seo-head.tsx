import { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

interface SeoProps {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  image?: string;
}

export function generateMetadata({
  locale,
  title,
  description,
  pathname,
  image = '/og-image.jpg'
}: SeoProps): Metadata {
  const siteUrl = 'https://modatepe.com';
  const url = `${siteUrl}/${locale}${pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: `${siteUrl}/tr${pathname}`,
        en: `${siteUrl}/en${pathname}`,
        ar: `${siteUrl}/ar${pathname}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Modatepe Restoran & Konaklama',
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }],
      locale: locale === 'tr' ? 'tr_TR' : locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD Structured Data Components
export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Modatepe Restoran",
          "description": "Trabzon Ortahisar'da yöresel lezzetler sunan restoran",
          "url": "https://modatepe.com",
          "telephone": "+905324484984",
          "email": "murat60bir@outlook.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ortahisar",
            "addressRegion": "Trabzon",
            "addressCountry": "TR"
          },
          "openingHours": "Mo-Su 09:00-22:00",
          "acceptsReservations": true,
          "priceRange": "$$",
          "servesCuisine": "Turkish",
          "image": "https://modatepe.com/restaurant-image.jpg"
        })
      }}
    />
  );
}

export function LodgingJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": "Modatepe Konaklama",
          "description": "Trabzon Ortahisar'da konforlu konaklama hizmeti",
          "url": "https://modatepe.com",
          "telephone": "+905324484984",
          "email": "murat60bir@outlook.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ortahisar",
            "addressRegion": "Trabzon",
            "addressCountry": "TR"
          },
          "checkinTime": "14:00",
          "checkoutTime": "12:00",
          "petsAllowed": true,
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Free WiFi",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification", 
              "name": "Free Parking",
              "value": true
            }
          ]
        })
      }}
    />
  );
}