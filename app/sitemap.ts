import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://modatepe.com';
  
  const routes = ['', '/restoran', '/konaklama', '/blog', '/iletisim'];
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  // Add homepage
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
  });

  // Add pages for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}