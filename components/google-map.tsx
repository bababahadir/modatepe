'use client';

interface GoogleMapProps {
  locale: string;
  translations: any;
}

export function GoogleMap({ locale, translations }: GoogleMapProps) {

const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.38344084475713!2d39.63172093425898!3d40.93470720849995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406440a14cd6dcb9%3A0xe524edf21b8be609!2sModatepe%20Restoran%20%26%20Otel%2C%20Bungalov!5e0!3m2!1str!2str!4v1755938570177!5m2!1str!2str";

  const directionsUrl = "https://www.google.com/maps/dir/40.9347328,39.6323385/Modatepe+Restoran+%26+Otel,+Bungalov,+Ayval%C4%B1+k%C3%B6y%C3%BC+Akyaz%C4%B1+%C3%BCzeri+ma%C4%9Fmat+yolu13.+Km,+61040+Ortahisar%2FTrabzon/@40.9347692,39.6295137,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x406440a14cd6dcb9:0xe524edf21b8be609!2m2!1d39.6318387!2d40.9347163?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden shadow-lg h-96">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Modatepe Restoran & Konaklama Konumu"
        />
      </div>
      
      <div className="text-center">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {translations.cta.getDirections}
        </a>
      </div>
    </div>
  );
}