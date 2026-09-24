# Yayın öncesi SEO ve performans

- Ana sayfa: benzersiz Türkçe başlık ve açıklama; canonical, Organization verisi ve sosyal paylaşım görseli.
- Bulunmayan yollar: aynı OrbitalScene bileşeni, ayrı başlık/açıklama ve noindex. `npm run build` sonrasında `scripts/build-404.cjs` gerçek Firebase hata belgesini üretir. Genel SPA rewrite kaldırıldı; bölüm bağlantıları hash kullandığından çalışmaya devam eder. Yeni bağımsız sayfa eklendiğinde hosting yapılandırması ayrıca güncellenmelidir.
- robots.txt: bütün botlar için JS/CSS dahil tarama açık; sitemap mevcut. Dosyanın doğru adı robots.txt'dir.
- Hız: kullanılmayan hero preload kaldırıldı, gerçek arka plan ön yükleniyor. Font CSS import zinciri kaldırıldı. Hash içeren statik dosyalara bir yıllık immutable cache, görsellere bir günlük cache eklendi. Akıllı sistemler görseli yaklaşık 2,6 MB yerine 368 KB JPEG olarak kullanılıyor. Mevcut görsel lazy-loading ve ekran dışında animasyon durdurma korunuyor.
- Beş soruluk erişilebilir SSS eklendi. Formda başarılı gönderim mesajı zaten var.

## Kontrol

Üretim derlemesi ve 11 test başarılı. Yerel Firebase Hosting: ana sayfa HTTP 200, bulunmayan yol HTTP 404. 404 masaüstü/mobil görsel kontrolü yapıldı. Canlı siteye deploy yapılmadı; canlı Core Web Vitals veya Lighthouse puanı ölçülmedi.

## Dış bilgi gerektiren maddeler

Search Console etiketi mevcut; hesap doğrulaması ve sitemap gönderimi hesap üzerinden kontrol edilmeli. Gerçek müşteri yorumları, takım fotoğrafları, vaka sonuçları ve açık ofis adresi sağlanmadan eklenmedi. Gizlilik metni için gerçek veri işleme/saklama süreçleri belirlenmeli; uydurma politika yayınlanmadı.

Kaynaklar: https://firebase.google.com/docs/hosting/full-config ve https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
