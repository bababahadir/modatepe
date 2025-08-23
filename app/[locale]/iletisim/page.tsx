import { Metadata } from 'next';
import { ContactInfo } from '@/components/contact-info';
import { ContactForm } from '@/components/contact-form';
import { FeedbackForm } from '@/components/feedback-form';
import { GoogleMap } from '@/components/google-map';
import { getTranslations, type Locale } from '@/lib/i18n';

interface ContactPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: translations.contact.title,
    description: 'Modatepe Restoran & Konaklama iletişim bilgileri ve rezervasyon',
  };
}

export default async function ContactPage({ params: { locale } }: ContactPageProps) {
  const translations = await getTranslations(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-brand-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-green animate-fade-in">
            {translations.contact.title}
          </h1>
          <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
            Sorularınız, rezervasyon talepleriniz ve geri bildirimleriniz için bize ulaşın.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <ContactInfo locale={locale} translations={translations} />

      {/* Contact Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ContactForm locale={locale} translations={translations} />
            
            {/* Feedback Form */}
            <FeedbackForm locale={locale} translations={translations} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
            {translations.home.location.title}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <GoogleMap locale={locale} translations={translations} />
          </div>
        </div>
      </section>
    </>
  );
}