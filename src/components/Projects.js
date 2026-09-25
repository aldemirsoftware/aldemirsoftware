import { useTranslation } from "../i18n/Language";
import React from "react";
import { FiArrowUpRight, FiLink, FiGlobe } from "react-icons/fi";
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
  const { t } = useTranslation();
  return (
    <section
      className="section projects partners-section partners-showcase"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <Reveal className="partners-heading">
          <div>
            <div className="eyebrow">
              <span className="section-index">02 /</span>{t(" DEĞERLİ İŞ ORTAKLARIMIZ")}</div>
            <h2 id="projects-title">{t("Güveninizle güçleniyor,")}<br />
              <span>{t("birlikte ileriye gidiyoruz.")}</span>
            </h2>
          </div>
          <p>{t("Dijital yolculuklarına eşlik ettiğimiz şirket ve kurumlar. Her iş birliğinde aynı özen, ortak hedefler ve uzun vadeli teknoloji desteği.")}</p>
        </Reveal>
        <Reveal className="partners-intro-line">
          <span aria-hidden="true" />
          <p><FiLink aria-hidden="true" />{t(" TEKNOLOJİ PARTNERİ OLDUĞUMUZ MARKALAR")}</p>
          <span aria-hidden="true" />
        </Reveal>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <Reveal className="partner-entry" key={partner.brand} delay={index * 0.08}>
              <article className={`partner-card partner-${partner.brand}`}>
                <a
                  className="partner-card-link"
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`${partner.name} web sitesini ziyaret et (yeni sekmede açılır)`)}
                >
                <div className="partner-brand-stage">
                  <div className="partner-stage-heading"><span className="partner-category">{t(partner.category)}</span><FiArrowUpRight aria-hidden="true" /></div>
                  <div className="partner-halo" aria-hidden="true" />
                  <div className="partner-logo-wrap">
                    {partner.image ? (
                      <img
                        src={partner.image}
                        alt={t(`${partner.name} logosu`)}
                        width={partner.imageWidth}
                        height={partner.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : <MirBrand />}
                  </div>
                </div>
                <div className="partner-details">
                  <span className="partner-relationship"><FiLink aria-hidden="true" />{t(" Teknoloji partneriyiz")}</span>
                  <h3>{t(partner.name)}</h3>
                  <p>{t(partner.description)}</p>
                </div>
                <div className="partner-website">
                  <span>
                    <strong>{t("Web sitesini keşfedin")}</strong>
                    <span><FiGlobe aria-hidden="true" /> {t(partner.domain)}</span>
                  </span>
                  <FiArrowUpRight aria-hidden="true" />
                </div>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="partners-invitation">
          <div><span className="partners-invitation-label">{t("BİR SONRAKİ GÜÇLÜ İŞ BİRLİĞİ")}</span><p>{t("Birlikte yeni bir hikâye yazalım.")}</p></div>
          <a className="text-link" href="#contact">{t("Sizin de teknoloji partneriniz olalım ")}<FiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
