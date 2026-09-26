# Yayın ve SEO kontrolü — 26 Eylül 2026

## Hazırlananlar

- Ana sayfa, SSS ve 404 için ayrı başlık ve açıklamalar; canonical ve paylaşım metadataları.
- Uşak web tasarım, özel yazılım, mobil uygulama ve bilişim danışmanlığı hizmetlerini açıklayan görünür içerik; İngilizce ve Almanca çevirileri.
- Organization ve WebSite yapılandırılmış verileri: marka, Uşak konumu, telefon, e-posta ve kurumsal sosyal hesaplar. Gerçek açık adres, çalışma saatleri veya müşteri puanları uydurulmadı.
- robots.txt taramaya açık; sitemap.xml yalnızca ana sayfa ve SSS içeriyor. Google doğrulama etiketi korundu.
- 404 belgesinde noindex; canonical kaldırıldı. SSS paylaşım URL’si kendi sayfasını gösteriyor.
- Bölüm sırası: Hero, Hakkımızda, İş Ortaklarımız, Teknolojiler, Uzmanlıklarımız; ardından mevcut vizyon ve iletişim bölümleri.
- Önceki mobil performans önlemleri korunuyor: hafif görseller, mobilde WebGL/müzik kısıtlaması ve ekran dışı animasyonların durdurulması.

## Yayında yapılması gerekenler

1. Güncel build klasörünü gerçek hosting ortamına yükleyin. Bu çalışma canlıya yayımlanmadı; depoda şu anda hosting yapılandırması yok.
2. `/sss` adresini `sss.html` belgesine HTTP 200 ile eşleyin. Bulunmayan yollar `404.html` belgesini gerçek HTTP 404 durumuyla sunmalı; bütün yolları 200 ile ana sayfaya yönlendirmeyin.
3. HTTPS ve www kanonik alan adına kalıcı yönlendirmeleri kontrol edin. Hash içeren JS/CSS için uzun önbellek; HTML için yeniden doğrulama kullanın.
4. Search Console’da doğrulamayı kontrol edip `https://www.aldemirsoftware.com/sitemap.xml` gönderin. Ana sayfa ve `/sss` için URL Denetimi → Canlı URL’yi Test Et → Dizine Eklenmesini İste adımlarını uygulayın. Hesaba erişim olmadan gönderim yapılmadı.
5. Mobil gerçek cihazda uzun kaydırma testi ve PageSpeed Insights ölçümü yapın; Search Console sayfa indeksleme ve Core Web Vitals raporlarını izleyin.

Dil seçimi aynı URL üzerinde çalışıyor; ayrı dil URL’leri olmadığı için yanıltıcı hreflang etiketleri eklenmedi. Google indeksleme ve sıralama garantisi verilemez. Yerel görünürlük için gerçek işletme bilgileriyle Google İşletme Profili ayrıca tamamlanabilir.

Kaynaklar:
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
