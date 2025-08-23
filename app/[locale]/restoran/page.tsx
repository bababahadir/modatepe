import { Metadata } from 'next';
import Image from 'next/image';
import et from '/images/Et.jpeg';
import kahvalti from '/images/Kahvalti.jpeg';
import kahvalt2 from '/images/kahvalt2.jpeg';
import koridor from '/images/koridor.jpeg';
import koridor2 from '/images/koridor2.jpeg';
import vaybe from '/images/vaybe.jpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTranslations, type Locale } from '@/lib/i18n';
import { MessageCircle, Clock } from 'lucide-react';

interface RestaurantPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: translations.restaurant.title,
    description: translations.restaurant.intro,
  };
}

export default async function RestaurantPage({ params: { locale } }: RestaurantPageProps) {
  const translations = await getTranslations(locale);

  const whatsappUrl = "https://wa.me/905324484984?text=Merhaba,%20Modatepe'de%20rezervasyon%20yapmak%20istiyorum.";

  const menuItems = {
    breakfast: [
      { name: 'Serpme Kahvaltı', price: '₺600', description: 'Sıcaklar dahil kişi başı kahvaltı ücretimizdir. Kayana Kuymak Kalem böreği Cips Turşu ve Patates kavurması sahanda yumurta semaver ve soğuklar dahildir. Tek kişilik kahvaltı verilmemekte ve çocuk için sevis ücreti alınmamaktadır' }
    ],
    mainCourses: [
      { name: '250g dana antrikot porsiyon', price: '₺700', description: 'Yanlızca yerli jersey' },
      { name: '250g kuzu pirzola porsiyon', price: '₺700', description: 'Balıkesir kıvırcık kuzu' },
      { name: '300g köfte porsiyon', price: '₺500', description: 'Orijinal Akcaabat jersey köfte' },
      { name: 'Saç kavurma porsiyon', price: '₺700', description: 'Meşhur jersey saç kavurma' },
      { name: '300g tavuk ızgara porsiyon', price: '₺700', description: 'Banvit kemiksiz pirzola' }
    ],
    desserts: [
      { name: 'Sütlaç', price: '₺125', description: 'Hamsiköy sütlacı' }
    ]
  };

  const galleryImages = [
    et,
    kahvalti,
    kahvalt2,
    koridor,
    koridor2,
    vaybe
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <Image
          src={et}
          alt={translations.restaurant.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {translations.restaurant.title}
          </h1>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-brand-gray-600 leading-relaxed mb-8">
              {translations.restaurant.intro}
            </p>
            
            <div className="flex items-center justify-center gap-4 bg-brand-gray-100 rounded-2xl py-6 px-8 mb-8">
              <Clock className="w-6 h-6 text-brand-green" />
              <span className="text-lg font-semibold text-brand-green">
                {translations.hours.opening}
              </span>
            </div>

            <Button asChild className="whatsapp-btn text-lg px-8 py-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                {translations.cta.bookNow}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.restaurant.menu.title}
          </h2>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="breakfast" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="breakfast">{translations.restaurant.menu.breakfast}</TabsTrigger>
                <TabsTrigger value="mainCourses">{translations.restaurant.menu.mainCourses}</TabsTrigger>
                <TabsTrigger value="desserts">{translations.restaurant.menu.desserts}</TabsTrigger>
              </TabsList>

              {Object.entries(menuItems).map(([category, items]) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="grid gap-4">
                    {items.map((item, index) => (
                      <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-brand-green mb-2">
                                {item.name}
                              </h3>
                              <p className="text-brand-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-brand-green">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green">
            {translations.restaurant.gallery.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative h-48 md:h-64 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Image
                  src={image}
                  alt={`Restaurant gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}