import { useTranslation } from "../i18n/Language";
import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ notFound = false, faqPage = false }) {
  const { t, language } = useTranslation();
  const title = t(notFound ? "404 · Sayfa Bulunamadı | Aldemir Software" : faqPage ? "S.S.S · Sıkça Sorulan Sorular | Aldemir Software" : "Aldemir Software | Uşak Özel Yazılım ve Web Çözümleri");
  const description = t(notFound ? "Aradığınız sayfa bulunamadı. Aldemir Software ana sayfasına dönün veya yazılım projeniz için bizimle iletişime geçin." : faqPage ? "Aldemir Software hizmetleri, proje süreci, bütçe, entegrasyon ve teknik destek hakkında sıkça sorulan soruların yanıtlarını keşfedin." : "Uşak merkezli Aldemir Software; özel yazılım, web ve mobil uygulama, kurumsal yönetim sistemleri ve teknoloji danışmanlığıyla işletmenizi geleceğe taşır.");
  return (
    <Helmet>
      <html lang={language} />
      <meta property="og:locale" content={({ en: "en_GB", de: "de_DE", tr: "tr_TR" })[language]} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="description" content={description} />
      <meta name="robots" content={t(notFound ? "noindex, follow" : "index, follow, max-image-preview:large")} />
      {!notFound && <link rel="canonical" href={faqPage ? "https://www.aldemirsoftware.com/sss" : "https://www.aldemirsoftware.com/"} />}
    </Helmet>
  );
}
