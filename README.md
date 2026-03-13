# 🚀 Aldemir Software

<div align="center">

![Aldemir Software](https://img.shields.io/badge/Aldemir-Software-silver?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiAyMkgyMkwxMiAyWiIgZmlsbD0iI0UwRTBFMCIvPgo8L3N2Zz4=)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

### 💼 Your Entire Marketing Team All In One

*Modern, Premium ve Profesyonel Yazılım Çözümleri*

[🌐 Live Demo](https://aldemirsoftware.web.app) • [📧 İletişim](mailto:info@aldemirsoftware.com)

</div>

---

## ✨ Özellikler

### 🎨 Modern UI/UX Tasarım
- **Platinum/Silver Tema**: Premium gümüş tonlarında tasarım paleti
- **Gradient Backgrounds**: Dinamik ve etkileyici arka plan geçişleri
- **Smooth Animations**: Framer Motion ile akıcı animasyonlar
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Floating Icons**: İnteraktif yüzen sosyal medya ikonları

### 📱 Temel Bileşenler
- **Hero Section**: Etkileyici açılış bölümü
- **Services**: Sunulan hizmetler showcası
- **Projects**: Proje portföyü galerisi
- **Tech Stack**: Kullanılan teknolojiler
- **About**: Şirket hakkında bilgiler
- **Stats**: İstatistikler ve başarılar
- **Contact Form**: EmailJS entegrasyonlu iletişim formu

### 🎯 İleri Seviye Özellikler
- **Dynamic Form States**: 4 farklı buton durumu (idle, sending, success, error)
- **Success Modal**: Animasyonlu başarı bildirimi
- **Email Integration**: EmailJS ile otomatik e-posta gönderimi
- **Phone Field**: Uluslararası telefon numarası desteği
- **Form Validation**: Gerçek zamanlı form doğrulama
- **Backdrop Blur**: Modern glassmorphism efektleri

---

## 🛠️ Teknoloji Yığını

### Frontend Framework
```json
{
  "React": "18.2.0",
  "React DOM": "18.2.0",
  "React Scripts": "5.0.1"
}
```

### Animasyon & UI
```json
{
  "Framer Motion": "10.16.4",
  "React Icons": "5.5.0"
}
```

### Email Service
```json
{
  "@emailjs/browser": "4.4.1"
}
```

### Hosting & Deployment
```json
{
  "Firebase Hosting": "latest",
  "Firebase CLI": "latest"
}
```

---

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- Git

### Adım Adım Kurulum

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/ademaldemir/aldemirsoftware.git
cd aldemirsoftware
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **EmailJS Konfigürasyonu**

`src/components/Contact.js` dosyasında EmailJS ayarlarınızı güncelleyin:
```javascript
const serviceID = 'your_service_id';
const templateID = 'your_template_id';
const publicKey = 'your_public_key';
```

4. **Geliştirme sunucusunu başlatın**
```bash
npm start
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

---

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Firebase Deployment
```bash
# Firebase'e giriş yapın
firebase login

# Projeyi başlatın
firebase init

# Deploy edin
firebase deploy
```

### Otomatik Deployment
```bash
npm run build && firebase deploy --only hosting --project aldemirsoftware
```

---

## 📁 Proje Yapısı

```
aldemirsoftware/
├── 📂 public/
│   └── index.html              # Ana HTML dosyası
├── 📂 src/
│   ├── App.js                  # Ana uygulama bileşeni
│   ├── App.css                 # Global stil dosyası
│   ├── index.js                # Giriş noktası
│   ├── index.css               # Ana CSS dosyası
│   └── 📂 components/
│       ├── Navbar.js           # Navigasyon bileşeni
│       ├── Hero.js             # Hero section
│       ├── Services.js         # Hizmetler bölümü
│       ├── Projects.js         # Projeler galerisi
│       ├── TechStack.js        # Teknoloji yığını
│       ├── About.js            # Hakkında bölümü
│       ├── Stats.js            # İstatistikler
│       ├── Contact.js          # İletişim formu (EmailJS)
│       ├── Footer.js           # Footer bileşeni
│       ├── FloatingIcons.js    # Yüzen sosyal ikonlar
│       └── *.css               # Bileşen stilleri
├── 📂 .firebase/               # Firebase cache
├── .firebaserc                 # Firebase proje ayarları
├── firebase.json               # Firebase hosting config
├── package.json                # NPM bağımlılıkları
└── README.md                   # Bu dosya
```

---

## 🎨 Renk Paleti

```css
/* Primary Colors */
--platinum: #E8E8E8;
--silver: #C0C0C0;
--gray: #A9A9A9;

/* Background Gradients */
--bg-primary: linear-gradient(135deg, #0a0a1f 0%, #1a2a4e 50%, #0f1828 100%);
--bg-card: rgba(15, 24, 40, 0.6);

/* Accent Colors */
--accent-blue: #1a2a4e;
--accent-dark: #0a0a1f;
```

---

## 📧 EmailJS Entegrasyonu

### Template Yapısı
```html
Konu: Aldemir Software - Yeni Mesaj: {{name}}

Gönderen: {{name}}
Email: {{email}}
Telefon: {{phone}}

Mesaj:
{{message}}
```

### Kullanım
```javascript
emailjs.send(
  'service_fflabgt',      // Service ID
  'template_66bwfls',     // Template ID
  formData,               // Form verileri
  'Mb4U2Biz9r-h_aTMO'    // Public Key
)
```

---

## 🎯 Özelleştirme

### Renkleri Değiştirme
`src/App.css` ve bileşen CSS dosyalarında renk değişkenlerini güncelleyin.

### İçerik Güncelleme
Her bileşenin kendi `.js` dosyasında içeriği düzenleyebilirsiniz:
- `Hero.js` - Ana başlık ve açıklama
- `Services.js` - Hizmet kartları
- `Projects.js` - Proje galerisi
- `About.js` - Şirket bilgileri

### Animasyonları Özelleştirme
Framer Motion kullanarak `animate`, `initial`, `transition` props'larını düzenleyin.

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Firebase Deployment Hatası
```bash
# Eğer "no project ID" hatası alıyorsanız:
firebase logout
firebase login
firebase deploy --project aldemirsoftware
```

### EmailJS Connection Error
Gmail kullanıyorsanız, EmailJS dashboard'da "Advanced" → "Go to EmailJS (unsafe)" seçeneğini kullanın.

---

## 🔍 SEO ve Google Görünürlüğü

### SEO Özellikleri
Bu proje Google aramalarında üst sıralarda görünmek için optimize edilmiştir:

✅ **Meta Tags**: Kapsamlı SEO meta tags
✅ **Open Graph**: Sosyal medya paylaşımları için optimize edilmiş
✅ **Schema.org**: Google için yapılandırılmış veri işaretlemesi
✅ **Sitemap**: Otomatik site haritası (`sitemap.xml`)
✅ **robots.txt**: Arama motoru botları için yönlendirme
✅ **Semantic HTML**: SEO dostu HTML5 yapısı
✅ **React Helmet**: Dinamik meta tag yönetimi
✅ **Mobile-First**: Mobil cihazlarda mükemmel performans

### Google'da Üst Sıralara Çıkma Rehberi
Detaylı SEO kurulum talimatları için `SEO_KURULUM_TALIMATLARI.md` dosyasına bakın.

**Hızlı Başlangıç:**
```bash
# SEO optimizasyon scriptini çalıştırın
./optimize.sh

# Build oluşturun
npm run build

# Firebase'e deploy edin
firebase deploy
```

**Yapılması Gerekenler:**
1. Google Search Console'a kayıt olun
2. Google Analytics kurulumu yapın
3. Sitemap'i Google'a gönderin
4. Google Business Profile oluşturun

Daha fazla bilgi için: [SEO Kurulum Talimatları](./SEO_KURULUM_TALIMATLARI.md)

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

## 👤 İletişim

**Aldemir Software**

- 🌐 Website: [aldemirsoftware.web.app](https://aldemirsoftware.web.app)
- 📧 Email: info@aldemirsoftware.com
- 💼 LinkedIn: [Aldemir Software](https://linkedin.com/company/aldemir-software)
- 🐱 GitHub: [@ademaldemir](https://github.com/ademaldemir)

---

## 🌟 Teşekkürler

Bu projeyi geliştirirken kullanılan teknolojiler:

- [React](https://reactjs.org/) - UI Framework
- [Framer Motion](https://www.framer.com/motion/) - Animasyon Kütüphanesi
- [EmailJS](https://www.emailjs.com/) - Email Service
- [Firebase](https://firebase.google.com/) - Hosting & Deployment
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

---

<div align="center">

### ⭐ Star vermeyi unutmayın!

Made with ❤️ by **Aldemir Software**

© 2024 Aldemir Software. All rights reserved.

</div>
