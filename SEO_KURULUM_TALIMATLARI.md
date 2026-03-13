# SEO Kurulum Talimatları

## Tamamlanan İyileştirmeler ✅

### 1. HTML Meta Tags ve SEO Optimizasyonu
- ✅ Kapsamlı meta tags eklendi
- ✅ Open Graph (Facebook/LinkedIn paylaşımları için)
- ✅ Twitter Card meta tags
- ✅ Schema.org JSON-LD markup (Google için yapılandırılmış veri)
- ✅ Canonical URL
- ✅ Türkçe ve İngilizce dil desteği

### 2. robots.txt ve sitemap.xml
- ✅ robots.txt dosyası oluşturuldu (Google botlarının erişimi için)
- ✅ sitemap.xml oluşturuldu (site haritası)
- ✅ Tüm önemli sayfalar sitemap'e eklendi

### 3. React Helmet Async
- ✅ react-helmet-async kuruldu
- ✅ Dinamik SEO component'i oluşturuldu
- ✅ App.js'e entegre edildi

### 4. Semantic HTML
- ✅ Navbar'a header ve nav elementleri eklendi
- ✅ ARIA labels eklendi
- ✅ App.js'e main role eklendi

---

## Yapılması Gerekenler 📋

### ADIM 1: Google Search Console Kaydı
1. https://search.google.com/search-console adresine gidin
2. "Mülk Ekle" (Add Property) ile web sitenizi ekleyin
3. Sahiplik doğrulaması için aşağıdaki meta tag'i `public/index.html` dosyasına ekleyin:
   ```html
   <meta name="google-site-verification" content="BURAYA_GOOGLE_VERIFICATION_KODU" />
   ```
4. Site haritasını Google Search Console'a gönderin:
   - Sol menüden "Site Haritaları" (Sitemaps) seçin
   - `https://www.aldemirsoftware.com/sitemap.xml` URL'ini ekleyin

### ADIM 2: Google Analytics Kurulumu
1. https://analytics.google.com adresine gidin
2. Yeni bir özellik (property) oluşturun
3. Ölçüm Kimliğini (Measurement ID: G-XXXXXXXXXX) alın
4. Aşağıdaki kodu `public/index.html` dosyasının `<head>` bölümüne ekleyin:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### ADIM 3: Google İşletme Profili Oluşturma
1. https://business.google.com adresine gidin
2. "Aldemir Software" işletme profili oluşturun
3. Tüm bilgileri doldurun:
   - İşletme adı: Aldemir Software
   - Kategori: Yazılım Şirketi / Web Tasarım Ajansı
   - Adres (varsa)
   - Telefon numarası
   - Web sitesi: https://www.aldemirsoftware.com
   - E-posta: info@aldemirsoftware.com
   - Açıklama: SEO için optimize edilmiş açıklama ekleyin

### ADIM 4: Sosyal Medya Entegrasyonu
1. LinkedIn Company Page oluşturun
2. GitHub organizasyon profilini güncelleyin
3. Schema.org markup'taki sosyal medya linklerini güncelleyin (public/index.html'de)

### ADIM 5: İçerik Optimizasyonu
Anahtar kelimeler için içerik eklemeleri:
- "Aldemir Software" - Ana marka adı
- "web tasarım hizmetleri"
- "mobil uygulama geliştirme"
- "yazılım geliştirme Türkiye"
- "full stack developer"
- "SEO optimizasyonu"

### ADIM 6: Performans Optimizasyonu
```bash
# Lighthouse raporu çalıştırın
npm install -g lighthouse
lighthouse https://www.aldemirsoftware.com --view
```

### ADIM 7: Derleme ve Yayınlama
```bash
# Production derlemesi oluşturun
npm run build

# Firebase'e yayınlayın
firebase deploy
```

---

## SEO Kontrol Listesi

### Hemen Yapılacaklar:
- [ ] Google Search Console kaydı yap
- [ ] Google Analytics kurulumunu tamamla
- [ ] Site haritasını Google'a gönder
- [ ] Google İşletme Profili oluştur
- [ ] Sosyal medya linklerini güncelle

### Sürekli İyileştirmeler:
- [ ] Blog bölümü ekle (içerik SEO için kritik)
- [ ] Geri bağlantı stratejisi uygula (diğer sitelerden link al)
- [ ] Düzenli içerik güncellemeleri yap
- [ ] Sayfa hızı optimizasyonu
- [ ] Mobil uyumluluk testi
- [ ] Tüm görsellere alternatif metin (alt text) ekle

---

## Anahtar Kelime Stratejisi

### Birincil Anahtar Kelimeler:
1. "Aldemir Software"
2. "Aldemir"
3. "Web tasarım Türkiye"
4. "Mobil uygulama geliştirme"
5. "Yazılım şirketi Türkiye"

### İkincil Anahtar Kelimeler:
1. "React geliştirici Türkiye"
2. "Full stack geliştirme hizmetleri"
3. "Yazılım geliştirme şirketi"
4. "SEO optimizasyonu hizmetleri"
5. "E-ticaret çözümleri Türkiye"
6. "Kurumsal yazılım geliştirme"

---

## Beklenen Sonuçlar

**1-2 Hafta:** Google indeksleme başlar
**1-3 Ay:** "Aldemir" ve "Aldemir Software" aramaları için ilk sayfa
**3-6 Ay:** Organik trafik artışı görülür
**6-12 Ay:** Rekabetçi anahtar kelimeler için üst sıralarda yer alırsınız

---

## Faydalı Araçlar

1. **Google Search Console**: Arama performansı takibi
2. **Google Analytics**: Ziyaretçi ve trafik analizi
3. **Lighthouse**: Performans ve SEO skoru ölçümü
4. **SEMrush/Ahrefs**: Anahtar kelime araştırması (ücretli)
5. **Google PageSpeed Insights**: Sayfa hızı optimizasyonu
6. **Google İşletme Profili**: Yerel SEO için gerekli

---

## Önemli Notlar

⚠️ **Schema.org verilerini güncelleyin**: `public/index.html` dosyasında:
- Gerçek adres bilgisini ekleyin
- Telefon numarasını ekleyin
- Sosyal medya linklerini güncelleyin
- E-posta: info@aldemirsoftware.com olarak ayarlandı

⚠️ **Canonical URL'i kontrol edin**: https://www.aldemirsoftware.com olarak ayarlandı

⚠️ **Görsellere alt metin ekleyin**: Tüm `<img>` etiketlerinde `alt` özelliği olmalı

---

## İletişim

Bu dokümandaki adımları tamamladıktan sonra:
1. Google Search Console'da site doğrulamasını yapın
2. 2-3 gün sonra indeksleme durumunu kontrol edin
3. Aylık bazda SEO raporlarını inceleyin
4. Sorularınız için: info@aldemirsoftware.com
