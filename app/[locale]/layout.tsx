import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getTranslations, getDirection, type Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const translations = await getTranslations(locale);
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1785692102378858"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-white">
        <Header locale={locale} translations={translations} />
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={locale} translations={translations} />
      </body>
    </html>
  );
}

export { generateStaticParams } from '@/lib/i18n';