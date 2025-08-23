# Modatepe Restoran & Konaklama Web Sitesi

Trabzon Ortahisar'da hizmet veren Modatepe Restoran & Konaklama için modern, çok dilli ve SEO optimize web sitesi.

## 🚀 Özellikler

- **Modern Teknolojiler**: Next.js 13+ App Router, React, TypeScript
- **Çok Dilli Destek**: Türkçe (TR), İngilizce (EN), Arapça (AR) - RTL desteği
- **Responsive Tasarım**: Tüm cihazlarda optimum görüntüleme
- **SEO Optimize**: Meta etiketleri, JSON-LD, sitemap
- **İletişim Formları**: E-posta entegrasyonu ile otomatik gönderim
- **WhatsApp Entegrasyonu**: Rezervasyon için direkt WhatsApp bağlantısı
- **Google Maps**: Konum gösterimi ve yol tarifi
- **Blog Sistemi**: Dinamik blog yazıları ve kategoriler
- **Erişilebilirlik**: WCAG AA standartlarına uygun

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın
`.env.local` dosyası oluşturun ve şu değişkenleri ekleyin:

```env
# Gmail SMTP Ayarları
GMAIL_USER=murat60bir@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
```

#### Gmail App Password Oluşturma:
1. Google Hesabınıza gidin: https://myaccount.google.com/
2. "Güvenlik" sekmesine tıklayın
3. "2 Aşamalı Doğrulama"yı etkinleştirin
4. "Uygulama parolaları" seçeneğine tıklayın
5. "E-posta" kategorisi seçin ve parola oluşturun
6. Oluşturulan parolayı `GMAIL_APP_PASSWORD` değişkenine ekleyin

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışmaya başlayacak.

## 📁 Proje Yapısı

```
app/
├── [locale]/           # Çok dilli route yapısı
│   ├── page.tsx        # Ana sayfa
│   ├── restoran/       # Restoran sayfası
│   ├── konaklama/      # Konaklama sayfası
│   ├── blog/           # Blog sistemi
│   └── iletisim/       # İletişim sayfası
├── api/                # API routes
│   ├── contact/        # İletişim formu
│   └── feedback/       # Geri bildirim formu
└── globals.css         # Global stiller

components/
├── ui/                 # shadcn/ui bileşenleri
├── header.tsx          # Site başlığı
├── footer.tsx          # Site altbilgisi
├── contact-form.tsx    # İletişim formu
├── feedback-form.tsx   # Geri bildirim formu
└── google-map.tsx      # Harita bileşeni

locales/
├── tr.json            # Türkçe çeviriler
├── en.json            # İngilizce çeviriler
└── ar.json            # Arapça çeviriler
```

## 🌐 Çok Dilli Destek

Site 3 dilde kullanılabilir:
- **Türkçe (TR)**: Varsayılan dil
- **İngilizce (EN)**: İkincil dil
- **Arapça (AR)**: RTL düzen desteği ile

Dil dosyaları `locales/` klasöründe JSON formatında bulunur.

## 📧 E-posta Entegrasyonu

İletişim ve geri bildirim formları Gmail SMTP üzerinden çalışır:
- Güvenli SMTP bağlantısı
- Spam koruması ve rate limiting
- Form doğrulama (Zod ile)
- Kullanıcı dostu hata mesajları

## 🚀 Dağıtım

### Vercel (Önerilen)
```bash
npm run build
```

### Diğer Platformlar
```bash
npm run build
npm start
```

## 🔧 Özelleştirme

### Renk Paleti
`app/globals.css` dosyasında CSS değişkenleri:
- `--brand-green: #0F3D2E` - Ana marka rengi
- `--brand-gray-100: #F4F5F7` - Açık gri
- `--brand-gray-600: #6B7280` - Koyu gri

### İletişim Bilgileri
- **Telefon**: +90 532 448 49 84
- **E-posta**: murat60bir@gmail.com
- **Adres**: Ortahisar, Trabzon
- **Çalışma Saatleri**: 09:00 – 22:00

### WhatsApp Entegrasyonu
Rezervasyon butonları WhatsApp'a yönlendirir:
```
https://wa.me/905324484984?text=Merhaba,%20Modatepe'de%20rezervasyon%20yapmak%20istiyorum.
```

## 📱 Responsive Tasarım

- **Mobil**: < 768px
- **Tablet**: 768px - 1024px  
- **Masaüstü**: > 1024px

Tüm bileşenler Tailwind CSS ile responsive olarak tasarlandı.

## 🔍 SEO Optimizasyonu

- Meta etiketleri (title, description)
- Open Graph ve Twitter Cards
- JSON-LD structured data
- XML sitemap
- robots.txt
- Çok dilli hreflang etiketleri

## 📞 Destek

Teknik destek için: [GitHub Issues](https://github.com/your-repo/issues)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.