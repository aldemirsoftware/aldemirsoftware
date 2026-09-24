const fs = require('node:fs');
const faqDescription = 'Aldemir Software hizmetleri, proje süreci, bütçe, entegrasyon ve teknik destek hakkında sıkça sorulan soruların yanıtlarını keşfedin.';
const faqHtml = fs.readFileSync('build/index.html', 'utf8')
  .replaceAll('Aldemir Software | Uşak Özel Yazılım ve Web Çözümleri', 'S.S.S · Sıkça Sorulan Sorular | Aldemir Software')
  .replace(/(<meta[^>]*(?:name="description"|property="og:description"|property="twitter:description")[^>]*content=")[^"]+/g, '$1' + faqDescription)
  .replace(/(<link[^>]*rel="canonical"[^>]*href=")[^"]+/, '$1https://www.aldemirsoftware.com/sss')
  .replace(/(<meta[^>]*property="(?:og:url|twitter:url)"[^>]*content=")[^"]+/g, '$1https://www.aldemirsoftware.com/sss');
fs.writeFileSync('build/sss.html', faqHtml);
let html = fs.readFileSync('build/index.html', 'utf8');
html = html.replaceAll('Aldemir Software | Uşak Özel Yazılım ve Web Çözümleri', '404 · Sayfa Bulunamadı | Aldemir Software');
html = html.replace('<html lang="tr">', '<html lang="tr" data-page="404">')
  .replace(/<title[^>]*>.*?<\/title>/, '<title data-rh="true">404 · Sayfa Bulunamadı | Aldemir Software</title>')
  .replace(/(<meta[^>]*name="robots"[^>]*content=")[^"]+/, '$1noindex, follow')
  .replace(/(<meta[^>]*name="description"[^>]*content=")[^"]+/, '$1Aradığınız sayfa bulunamadı. Aldemir Software ana sayfasına dönün veya bizimle iletişime geçin.')
  .replace(/<link[^>]*rel="canonical"[^>]*>/, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
fs.writeFileSync('build/404.html', html);
console.log('404.html: shared orbital scene, unique metadata and noindex generated.');
