import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import et from '/images/Et.jpeg';
import manzaraiyi from '/images/manzaraiyi.jpeg';
import normaloda from '/images/normaloda.jpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

interface BlogPostParams {
  locale: string;
  slug: string;
}

/* -- FS Helper -- */
function getAllSlugsFromFS(): string[] {
  try {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir);
    return files
      .filter((f) => /\.(md|mdx|json|html)$/.test(f))
      .map((f) => f.replace(/\.[^/.]+$/, ''));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: BlogPostParams;
}): Promise<Metadata> {
  const translations = await getTranslations(params.locale as Locale);
  return {
    title: 'Blog Yazısı - Modatepe',
    description: 'Modatepe Restoran & Konaklama blog yazısı',
  };
}

export async function generateStaticParams(): Promise<
  { locale: string; slug: string }[]
> {
  const locales = ['tr', 'en', 'ar'];

  let slugs = getAllSlugsFromFS();
  if (slugs.length === 0) {
    slugs = [
      'karadeniz-mutfaginin-en-sevilen-lezzetleri',
      'karadeniz-mutfagi-lezzetleri',
      'trabzon-ortahisar-gezi-rehberi',
      'doga-icinde-huzurlu-konaklama',
      'geleneksel-tas-ev-mimarisi',
    ];
  }

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

function readPostFromFS(slug: string) {
  try {
    const pJson = path.join(process.cwd(), 'content', 'posts', `${slug}.json`);
    if (fs.existsSync(pJson)) {
      return JSON.parse(fs.readFileSync(pJson, 'utf8'));
    }
    return null;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: BlogPostParams;
}) {
  const { locale, slug } = params;
  const translations = await getTranslations(locale as Locale);

  const postFromFS = readPostFromFS(slug);
  const post = postFromFS ?? {
    title: 'Karadeniz Mutfağının En Sevilen Lezzetleri',
    content: `<p>Karadeniz mutfağı, Türkiye'nin en zengin ve çeşitli mutfaklarından biridir...</p>`,
    image: et,
    date: '2024-01-15',
    readTime: '5 dakika',
    author: 'Modatepe Mutfak',
    category: 'Yemek',
  };

  const relatedPosts = [
    {
      title: 'Trabzon Ortahisar Gezilecek Yerler',
      image: manzaraiyi,
      slug: 'trabzon-ortahisar-gezi-rehberi',
    },
    {
      title: 'Doğa İçinde Huzurlu Konaklama',
      image: normaloda,
      slug: 'doga-icinde-huzurlu-konaklama',
    },
  ];

  return (
    <>
      {/* Back Button */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {translations.blog.backToList}
            </Link>
          </Button>
        </div>
      </section>

      {/* Title + Meta */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            <Badge className="bg-brand-green">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-brand-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.date).toLocaleDateString(
                    locale === 'tr'
                      ? 'tr-TR'
                      : locale === 'ar'
                      ? 'ar-AR'
                      : 'en-US'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none prose-headings:text-brand-green prose-headings:font-bold prose-p:text-brand-gray-600 prose-p:leading-relaxed prose-a:text-brand-green"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-brand-green">
            {translations.blog.relatedPosts}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedPosts.map((relatedPost, i) => (
              <Card
                key={i}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 overflow-hidden rounded-t-2xl">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-brand-green text-lg line-clamp-2">
                    {relatedPost.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    className="text-brand-green hover:text-green-700 font-semibold text-sm transition-colors"
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
