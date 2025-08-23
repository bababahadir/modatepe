import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Modatepe Restoran & Konaklama',
    short_name: 'Modatepe',
    description: 'Trabzon Ortahisar\'da yöresel lezzetler ve konforlu konaklama hizmeti',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F3D2E',
    theme_color: '#0F3D2E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}