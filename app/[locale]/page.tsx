import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import manzara4k from '/images/manzara4k.jpeg';
import galeri2 from '/images/galeri2.jpeg';
import kahvalti from '/images/Kahvalti.jpeg';
import koridor from '/images/koridor.jpeg';
import galeri4 from '/images/galeri4.jpeg';
import bungalov from '/images/bungalov.jpeg';
import manzaraiyi from '/images/manzaraiyi.jpeg';
import et from '/images/Et.jpeg';
import normaloda from '/images/normaloda.jpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleMap } from '@/components/google-map';
import { getTranslations, type Locale } from '@/lib/i18n';
import { MessageCircle, MapPin, Utensils, Home, Eye } from 'lucide-react';

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: translations.home.hero.title,
    description: translations.home.hero.subtitle,
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const translations = await getTranslations(locale);

  const whatsappUrl = "https://wa.me/905324484984?text=Merhaba,%20Modatepe'de%20rezervasyon%20yapmak%20istiyorum.";

  const highlights = [
    {
      icon: Eye,
      title: translations.home.highlights.scenic.title,
      description: translations.home.highlights.scenic.description,
      image: manzara4k
    },
    {
      icon: Utensils,
      title: translations.home.highlights.local.title,
      description: translations.home.highlights.local.description,
      image: et
    },
    {
      icon: Home,
      title: translations.home.highlights.comfort.title,
      description: translations.home.highlights.comfort.description,
      image: normaloda
    }
  ];

  const galleryImages = [
    galeri2,
    kahvalti,
    koridor,
    galeri4,
    bungalov,
    manzaraiyi
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={manzara4k}
          alt={translations.home.hero.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {translations.home.hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {translations.home.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button asChild className="whatsapp-btn text-lg px-8 py-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                {translations.cta.bookNow}
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
              <Link href={`/${locale}/konaklama`}>
                {translations.home.hero.accommodation}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.home.highlights.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-brand-green">
                    <highlight.icon className="w-6 h-6" />
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brand-gray-600 leading-relaxed">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.home.gallery.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative h-48 md:h-64 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
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