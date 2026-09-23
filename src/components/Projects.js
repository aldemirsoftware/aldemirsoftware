import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import "./Partners.css";

const partners = [
  {
    name: "Uşak Eczacı Odası",
    category: "MESLEK KURULUŞU",
    description: "Türk Eczacıları Birliği 46. Bölge Uşak Eczacı Odası.",
    image: "/images/partners/usak-eczaci-odasi.png",
    imageWidth: 512,
    imageHeight: 512,
    brand: "usak",
    website: "https://usakeczaciodasi.org.tr/",
    domain: "usakeczaciodasi.org.tr",
  },
  {
    name: "Mir Yapı Mühendislik",
    category: "İNŞAAT & MÜHENDİSLİK",
    description: "Yapı ve mühendislik alanında birlikte değer ürettiğimiz iş ortağımız.",
    brand: "mir",
    website: "https://www.miryapimuhendislik.com/",
    domain: "miryapimuhendislik.com",
  },
  {
    name: "Aldemir Mimarlık",
    category: "MİMARLIK & TASARIM",
    description: "Mimarlık ve tasarım alanında dijital yolculuğuna eşlik ettiğimiz iş ortağımız.",
    image: "/images/partners/aldemir-mimarlik.png",
    imageWidth: 977,
    imageHeight: 1141,
    brand: "aldemir",
    website: "https://www.aldemirmimarlik.com/",
    domain: "aldemirmimarlik.com",
  },
];

// Mir Yapı's official website uses this typographic brand mark.
function MirBrand() {
  return (
    <div className="partner-mir-brand" aria-hidden="true">
      <div className="partner-mir-name">
        <span className="partner-mir-bars"><i /><i /><i /></span>
        <span>mir yapı</span>
      </div>
      <div className="partner-mir-subtitle"><span>MÜHENDİSLİK</span></div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      className="section projects partners-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <Reveal className="section-heading partners-heading">
          <div>
            <div className="eyebrow">
              <span className="section-index">02 /</span> DEĞERLİ İŞ ORTAKLARIMIZ
            </div>
            <h2 id="projects-title">
              Birlikte
              <br />
              <span>değer üretiyoruz.</span>
            </h2>
          </div>
          <p>
            Teknoloji partneri olduğumuz şirket ve kurumlarla güvene dayalı,
            uzun vadeli iş birlikleri kuruyoruz. Bize duydukları güveni,
            birlikte ürettiğimiz her işte özenle taşıyoruz.
          </p>
        </Reveal>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <Reveal className="partner-entry" key={partner.brand} delay={index * 0.08}>
              <article className={`partner-card partner-${partner.brand}`}>
                <div className="partner-brand-stage">
                  <span className="partner-category">{partner.category}</span>
                  <div className="partner-logo-wrap">
                    {partner.image ? (
                      <img
                        src={partner.image}
                        alt={`${partner.name} logosu`}
                        width={partner.imageWidth}
                        height={partner.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : <MirBrand />}
                  </div>
                </div>
                <div className="partner-details">
                  <span className="partner-relationship">Teknoloji partneriyiz</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                </div>
                <a
                  className="partner-website"
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name} web sitesini ziyaret et (yeni sekmede açılır)`}
                >
                  <span>
                    <strong>Web sitesini ziyaret et</strong>
                    <span>{partner.domain}</span>
                  </span>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="partners-invitation">
          <p>Güçlü iş birlikleri, kalıcı değer.</p>
          <a className="text-link" href="#contact">
            Sizin de teknoloji partneriniz olalım <FiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
