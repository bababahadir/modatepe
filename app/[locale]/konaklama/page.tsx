import { Metadata } from 'next';
import Image from 'next/image';
import normaloda from '/images/normaloda.jpeg';
import deluxeoda from '/images/deluxeoda.jpeg';
import normaltasev from '/images/normaltasev.jpeg';
import deluxetasev from '/images/deluxetaşev.jpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getTranslations, type Locale } from '@/lib/i18n';
import { MessageCircle, Users, Wifi, Car, Coffee } from 'lucide-react';

interface AccommodationPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: AccommodationPageProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: translations.accommodation.title,
    description: translations.accommodation.intro,
  };
}

export default async function AccommodationPage({ params: { locale } }: AccommodationPageProps) {
  const translations = await getTranslations(locale);

  const whatsappUrl = "https://wa.me/905324484984?text=Merhaba,%20Modatepe'de%20rezervasyon%20yapmak%20istiyorum.";

  const roomTypes = [
    {
      title: translations.accommodation.rooms.normalRoom.title,
      description: translations.accommodation.rooms.normalRoom.description,
      count: translations.accommodation.rooms.normalRoom.count,
      image: normaloda,
      amenities: ['WiFi', 'Klima', '2 Kişilik', 'Banyo']
    },
    {
      title: translations.accommodation.rooms.deluxeRoom.title,
      description: translations.accommodation.rooms.deluxeRoom.description,
      count: translations.accommodation.rooms.deluxeRoom.count,
      image: deluxeoda,
      amenities: ['WiFi', 'Klima', '2+2 Kişilik', 'Geniş oda']
    },
    {
      title: translations.accommodation.rooms.normalStoneHouse.title,
      description: translations.accommodation.rooms.normalStoneHouse.description,
      count: translations.accommodation.rooms.normalStoneHouse.count,
      image: normaltasev,
      amenities: ['WiFi', 'Çift Banyo','2+2 Kişilik']
    },
    {
      title: translations.accommodation.rooms.deluxeStoneHouse.title,
      description: translations.accommodation.rooms.deluxeStoneHouse.description,
      count: translations.accommodation.rooms.deluxeStoneHouse.count,
      image: deluxetasev,
      amenities: ['WiFi', 'Çift Kat', '5+2 Kişilik','Çift Banyo']
    }
  ];

  const faqs = [
    {
      question: translations.accommodation.faq.q1,
      answer: translations.accommodation.faq.a1
    },
    {
      question: translations.accommodation.faq.q2,
      answer: translations.accommodation.faq.a2
    },
    {
      question: translations.accommodation.faq.q3,
      answer: translations.accommodation.faq.a3
    },
    {
      question: translations.accommodation.faq.q4,
      answer: translations.accommodation.faq.a4
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <Image
          src={normaloda}
          alt={translations.accommodation.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {translations.accommodation.title}
          </h1>
        </div>
      </section>

      {/* Accommodation Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-brand-gray-600 leading-relaxed mb-8">
              {translations.accommodation.intro}
            </p>

            <Button asChild className="whatsapp-btn text-lg px-8 py-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                {translations.cta.bookNow}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.accommodation.rooms.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {roomTypes.map((room, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {room.count}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-brand-green text-xl">
                    {room.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-brand-gray-600 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full whatsapp-btn">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {translations.cta.bookNow}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-brand-green">Ücretsiz WiFi</h3>
              <p className="text-sm text-brand-gray-600">Tüm odalarda hızlı internet</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-brand-green">Ücretsiz Park</h3>
              <p className="text-sm text-brand-gray-600">Güvenli otopark alanı</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-brand-green">Kahvaltı</h3>
              <p className="text-sm text-brand-gray-600">Serpme kahvaltı servisi</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-brand-green">7/24 Resepsiyon</h3>
              <p className="text-sm text-brand-gray-600">Her zaman yanınızda</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.accommodation.faq.title}
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl px-6 border-0 shadow-md">
                  <AccordionTrigger className="text-left font-semibold text-brand-green hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-gray-600 leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}