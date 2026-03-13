import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Aldemir Software - Profesyonel Web ve Mobil Uygulama Geliştirme",
  description = "Aldemir Software olarak web tasarım, mobil uygulama geliştirme, SEO optimizasyonu ve dijital pazarlama hizmetleri sunuyoruz. Tüm pazarlama ekibiniz tek bir çatı altında!",
  keywords = "Aldemir Software, Aldemir, web tasarım, mobil uygulama, yazılım geliştirme, SEO, dijital pazarlama, React, Node.js, Python",
  image = "https://www.aldemirsoftware.com/logo-nonbck.png",
  url = "https://www.aldemirsoftware.com"
}) => {
  return (
    <Helmet>
      {/* Birincil Meta Etiketleri */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
