import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import et from '/images/Et.jpeg';
import manzaraiyi from '/images/manzaraiyi.jpeg';
import normaloda from '/images/normaloda.jpeg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTranslations, type Locale } from '@/lib/i18n';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: translations.blog.title,
    description: 'Modatepe Restoran & Konaklama blog yazıları',
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const translations = await getTranslations(locale);

  const blogPosts = [
    {
      title: 'Karadeniz Mutfağının En Sevilen Lezzetleri',
      excerpt: 'Karadeniz mutfağının zengin lezzetlerini keşfedin. Hamsi, karalahana ve mısır ekmeği gibi bölgesel tatları...',
      image: et,
      date: '2024-01-15',
      readTime: '5 dakika',
      author: 'Modatepe Mutfak',
      category: 'Yemek',
      slug: 'karadeniz-mutfaginin-en-sevilen-lezzetleri'
    },
    {
      title: 'Trabzon Ortahisar Gezilecek Yerler',
      excerpt: 'Trabzon Ortahisar bölgesinde görülmesi gereken tarihi ve doğal güzellikler hakkında rehber...',
      image: manzaraiyi,
      date: '2024-01-10',
      readTime: '7 dakika',
      author: 'Modatepe',
      category: 'Gezi',
      slug: 'trabzon-ortahisar-gezi-rehberi'
    },
    {
      title: 'Doğa İçinde Huzurlu Konaklama',
      excerpt: 'Şehrin gürültüsünden uzakta, doğayla iç içe bir konaklama deneyimi yaşamanın faydaları...',
      image: normaloda,
      date: '2024-01-05',
      readTime: '4 dakika',
      author: 'Modatepe',
      category: 'Konaklama',
      slug: 'doga-icinde-huzurlu-konaklama'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-brand-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-green animate-fade-in">
            {translations.blog.title}
          </h1>
          <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
            Yöresel lezzetler, gezi rehberleri ve konaklama deneyimleri hakkında yazılarımızı keşfedin.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-green">{post.category}</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-brand-green text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-brand-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-brand-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-AR' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-block text-brand-green hover:text-green-700 font-semibold transition-colors"
                  >
                    {translations.blog.readMore} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}