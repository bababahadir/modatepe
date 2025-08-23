import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { FaTripadvisor } from "react-icons/fa";


interface FooterProps {
  locale: Locale;
  translations: any;
}

export function Footer({ locale, translations }: FooterProps) {
  const quickLinks = [
    { name: translations.nav.home, href: `/${locale}` },
    { name: translations.nav.restaurant, href: `/${locale}/restoran` },
    { name: translations.nav.accommodation, href: `/${locale}/konaklama` },
    { name: translations.nav.blog, href: `/${locale}/blog` },
    { name: translations.nav.contact, href: `/${locale}/iletisim` },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/modateperestaurant/about/?_rdr', icon: Facebook },
    { name: 'Instagram', href: 'https://www.instagram.com/modateperestoran/', icon: Instagram },
    { name: 'FaTripadvisor', href: 'https://www.tripadvisor.com.tr/Restaurant_Review-g298039-d13847054-Reviews-Modatepe_Restoran-Trabzon_Ortahisar_Turkish_Black_Sea_Coast.html', icon: FaTripadvisor },
  ];

  return (
    <footer className="bg-brand-green text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Modatepe</h3>
            <p className="text-green-100 text-sm mb-4">
              Trabzon Ortahisar'ın muhteşem manzarasında yöresel lezzetler ve konforlu konaklama.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{translations.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{translations.contact.info.title}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+90 532 448 49 84</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>murat60bir@Outlook.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Ortahisar, Trabzon</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{translations.hours.opening}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">{translations.footer.socialMedia}</h4>
            <p className="text-green-100 text-sm mb-4">
              Sosyal medya hesaplarımızı takip edin, güncel haberler ve özel fırsatları kaçırmayın.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-green-100 hover:text-white transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-100 text-sm">
          {translations.footer.copyright}
        </div>
      </div>
    </footer>
  );
}