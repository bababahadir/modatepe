import { notFound } from 'next/navigation';

export const locales = ['tr', 'en', 'ar'] as const;
export type Locale = typeof locales[number];

export const defaultLocale = 'tr' as const;

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`../locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}