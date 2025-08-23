// app/[locale]/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTranslations, type Locale } from '@/lib/i18n';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

interface BlogPostProps {
  params: { locale: Locale; slug: string };
}

/**
 * Helper: try to read all post slugs from content/posts directory.
 * - If content/posts exists and contains files like `my-slug.md` or `my-slug.json`,
 *   we'll return filenames without extension as slugs.
 * - If not present, fallback to a hard-coded list of slugs (so static export won't fail).
 */
function getAllSlugsFromFS(): string[] {
  try {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir);
    const slugs = files
      .filter((f) => {
        // accept .md, .mdx, .json, .html — adjust as you use
        return /\.(md|mdx|json|html)$/.test(f);
      })
      .map((f) => f.replace(/\.[^/.]+$/, ''));
    // dedupe
    return Array.from(new Set(slugs));
  } catch (err) {
    return [];
  }
}

// Metadata
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  const postTitle = 'Blog Yazısı - Modatepe';
  
  return {
    title: postTitle,
    description: 'Modatepe Restoran & Konaklama blog yazısı',
  };
}

/**
 * Important: With output: "export" we MUST return all route params at build time.
 * This implementation:
 * 1) tries to read slugs from content/posts (best practice for many static sites),
 * 2) if none found, falls back to a hardcoded list (so you won't get missing param errors).
 *
 * To make this future-proof: add your posts as files in content/posts/.
 * Example: content/posts/karadeniz-mutfagi-lezzetleri.json
 */
export async function generateStaticParams() {
  // supported locales — keep in sync with your i18n config
  const locales: Locale[] = ['tr', 'en'] as Locale[];

  // try reading real slugs from content/posts
  let slugs = getAllSlugsFromFS();

  // fallback list (adjust to include all your blog slugs)
  if (slugs.length === 0) {
    slugs = [
      'karadeniz-mutfaginin-en-sevilen-lezzetleri',
      'karadeniz-mutfagi-lezzetleri', // include possible variants if you used different slugs
      'trabzon-ortahisar-gezi-rehberi',
      'doga-icinde-huzurlu-konaklama',
      'geleneksel-tas-ev-mimarisi',
      'karadeniz-mutfagi-lezzetleri' // add any other known slugs
    ];
  }

  // build params for each locale/slug combination
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

/**
 * Helper: try to read a post JSON from content/posts/{slug}.json
 * Expected simple JSON shape:
 * {
 *   "title": "...",
 *   "content": "<p>html</p>",
 *   "image": "/images/.. or external url",
 *   "date": "2024-01-15",
 *   "readTime": "5 dakika",
 *   "author": "Modatepe",
 *   "category": "Yemek"
 * }
 *
 * If file not found or invalid, return null (caller will use placeholder).
 */
function readPostFromFS(slug: string) {
  try {
    const pJson = path.join(process.cwd(), 'content', 'posts', `${slug}.json`);
    if (fs.existsSync(pJson)) {
      const raw = fs.readFileSync(pJson, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed;
    }
    // optionally support .md/.mdx parsing here later
    return null;
  } catch (err) {
    return null;
  }
}

// Sayfa componenti
export default async function BlogPostPage({ params: { locale, slug } }: BlogPostProps) {
  const translations = await getTranslations(locale);

  // Try to load real post from content/posts/{slug}.json
  const postFromFS = readPostFromFS(slug);

  const post = postFromFS ?? {
    // fallback placeholder (so page still renders if FS data missing)
    title: 'Karadeniz Mutfağının En Sevilen Lezzetleri',
    content: `
      <p>Karadeniz mutfağı, Türkiye'nin en zengin ve çeşitli mutfaklarından biridir...</p>
      <h2>Hamsi: Karadeniz'in Vazgeçilmezi</h2>
      <p>Bu küçük balık bölge insanının vazgeçilmez besin kaynağıdır...</p>
      <h2>Karalahana: Sağlık Deposu</h2>
      <p>Karalahana hem lezzetli hem de son derece sağlıklıdır...</p>
      <h2>Mısır Ekmeği</h2>
      <p>Mısır ekmeği, özellikle peynir ve tereyağı ile unutulmazdır...</p>
    `,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: '2024-01-15',
    readTime: '5 dakika',
    author: 'Modatepe Mutfak',
    category: 'Yemek'
  };

  // Related posts (could also be loaded from FS or a central data file)
  // Make sure every related slug you use is also present in generateStaticParams (or present in content/posts/)
  const relatedPosts = [
    {
      title: 'Trabzon Ortahisar Gezilecek Yerler',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=400',
      slug: 'trabzon-ortahisar-gezi-rehberi'
    },
    {
      title: 'Doğa İçinde Huzurlu Konaklama',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      slug: 'doga-icinde-huzurlu-konaklama'
    },
    {
      title: 'Geleneksel Taş Ev Mimarisi',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
      slug: 'geleneksel-tas-ev-mimarisi'
    }
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

      {/* Article Header */}
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
                <span>{new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-AR' : 'en-US')}</span>
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

      {/* Featured Image */}
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

      {/* Article Content */}
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
            {relatedPosts.map((relatedPost, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
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
