const fs = require('node:fs');
const source = fs.readFileSync('build/index.html', 'utf8');
const homeTitle = 'Aldemir Software | Uşak Özel Yazılım ve Web Çözümleri';
const origin = 'https://www.aldemirsoftware.com';
function page({ title, description, path, noindex = false }) {
  let html = source.replaceAll(homeTitle, title)
    .replace(/(<meta[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*content=")[^"]+/g, '$1' + description)
    .replace(/(<meta[^>]*(?:name|property)="(?:og:url|twitter:url)"[^>]*content=")[^"]+/g, '$1' + origin + path);
  if (noindex) {
    html = html.replace(/(<meta[^>]*name="robots"[^>]*content=")[^"]+/, '$1noindex, follow')
      .replace(/<link[^>]*rel="canonical"[^>]*>/g, '')
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
      .replace(/<meta[^>]*(?:name|property)="(?:og:url|twitter:url)"[^>]*>/g, '');
  } else {
    html = html.replace(/(<link[^>]*rel="canonical"[^>]*href=")[^"]+/, '$1' + origin + path);
  }
  return html;
}
fs.writeFileSync('build/sss.html', page({
  title: 'S.S.S · Sıkça Sorulan Sorular | Aldemir Software',
  description: 'Aldemir Software hizmetleri, proje süreci, bütçe, entegrasyon ve teknik destek hakkında sıkça sorulan soruların yanıtlarını keşfedin.',
  path: '/sss',
}));
fs.writeFileSync('build/404.html', page({
  title: '404 · Sayfa Bulunamadı | Aldemir Software',
  description: 'Aradığınız sayfa bulunamadı. Aldemir Software ana sayfasına dönün veya yazılım projeniz için bizimle iletişime geçin.',
  path: '/404', noindex: true,
}));
console.log('FAQ and 404 pages generated with distinct search and sharing metadata.');
