#!/bin/bash

echo "🚀 Aldemir Software - SEO ve Performans Optimizasyonu"
echo "=================================================="
echo ""

# Derleme oluştur
echo "📦 Production derlemesi oluşturuluyor..."
npm run build

# Derleme boyutunu kontrol et
echo ""
echo "📊 Derleme boyutu:"
du -sh build/

# Lighthouse raporu oluştur (eğer kuruluysa)
if command -v lighthouse &> /dev/null
then
    echo ""
    echo "🔍 Lighthouse raporu oluşturuluyor..."
    lighthouse http://localhost:3000 \
        --output html \
        --output-path ./lighthouse-report.html \
        --chrome-flags="--headless" \
        --only-categories=performance,accessibility,best-practices,seo
    echo "✅ Rapor oluşturuldu: lighthouse-report.html"
else
    echo ""
    echo "⚠️  Lighthouse kurulu değil. Kurmak için:"
    echo "   npm install -g lighthouse"
fi

echo ""
echo "✅ Optimizasyon kontrolü tamamlandı!"
echo ""
echo "Sonraki adımlar:"
echo "1. Build klasörünü Firebase'e yayınlayın: firebase deploy"
echo "2. Google Search Console'a site haritası gönderin"
echo "3. Lighthouse raporunu inceleyin"
echo "4. SEO_KURULUM_TALIMATLARI.md dosyasını okuyun"
