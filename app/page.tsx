import { redirect } from 'next/navigation'
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Modatepe Restoran - Trabzon Kahvaltı & Et Mekanı</title>
        <meta
          name="description"
          content="Trabzon’un en güzel kahvaltı ve et restoranı Modatepe. Manzaralı kahvaltı, kaliteli et lezzetleri ve sıcak ortam. Hemen rezervasyon yapın!"
        />

        {/* ✅ JSON-LD Snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Modatepe",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Trabzon",
                addressLocality: "Ortahisar",
                addressRegion: "Trabzon",
                addressCountry: "TR",
              },
              telephone: "+90-532-448-49-84",
              servesCuisine: "Kahvaltı, Et, Türk Mutfağı",
              priceRange: "$$",
              url: "https://modatepe.vercel.app/",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.6",
                reviewCount: "1000+",
              },
              openingHours: "Mo-Su 08:00-23:00",
            }),
          }}
        />
      </Head>

      <main>
        <h1>Modatepe Restoran’a Hoş Geldiniz</h1>
      </main>
    </>
  );
}

export default function RootPage() {
  // Redirect to default locale (Turkish)
  redirect('/tr')
}
