import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ notFound = false, faqPage = false }) {
  return (
    <Helmet>
      <title>{notFound ? "404 · Sayfa Bulunamadı | Aldemir Software" : faqPage ? "S.S.S · Sıkça Sorulan Sorular | Aldemir Software" : "Aldemir Software | Uşak Özel Yazılım ve Web Çözümleri"}</title>
      <meta name="description" content={notFound ? "Aradığınız sayfa bulunamadı. Aldemir Software ana sayfasına dönün veya yazılım projeniz için bizimle iletişime geçin." : faqPage ? "Aldemir Software hizmetleri, proje süreci, bütçe, entegrasyon ve teknik destek hakkında sıkça sorulan soruların yanıtlarını keşfedin." : "Uşak merkezli Aldemir Software; özel yazılım, web ve mobil uygulama, kurumsal yönetim sistemleri ve teknoloji danışmanlığıyla işletmenizi geleceğe taşır."} />
      <meta name="robots" content={notFound ? "noindex, follow" : "index, follow, max-image-preview:large"} />
      {!notFound && <link rel="canonical" href={faqPage ? "https://www.aldemirsoftware.com/sss" : "https://www.aldemirsoftware.com/"} />}
    </Helmet>
  );
}
