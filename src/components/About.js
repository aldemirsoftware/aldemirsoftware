import React from "react";
import { FiArrowUpRight, FiUsers, FiLink, FiTrendingUp } from "react-icons/fi";
import { TurkishFlag } from "./Brand";
import Reveal from "./Reveal";
const principles = [
  [
    "Uzman ekip",
    "Fikrinizi anlamaktan sistemi hayata geçirmeye kadar her aşamada mühendislik disiplini.",
    FiUsers,
  ],
  [
    "Uzun vadeli iş ortaklığı",
    "Açık iletişim, birlikte alınan kararlar ve ihtiyaçlarınızla gelişen bir yol haritası.",
    FiLink,
  ],
  [
    "Sürekli gelişim",
    "Yayına çıktıktan sonra da bakım, destek ve iyileştirmeyle ürününüzün yanında.",
    FiTrendingUp,
  ],
];
export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <Reveal className="about-brand-panel">
          <div className="about-space-image" aria-hidden="true">
            <img
              src="/images/orbital-horizon.jpg"
              alt=""
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="eyebrow">ALDEMİR SOFTWARE</div>
          <img
            src="/logo-nonbck.png"
            alt="Aldemir Software logosu"
            loading="lazy"
            width="300"
            height="300"
          />
          <div className="about-brand-caption">
            <TurkishFlag />
            <p>
              Teknoloji üretiyor,
              <br />
              <strong>değer katıyoruz.</strong>
            </p>
          </div>
          <div className="about-panel-footer">
            <span>UŞAK, TÜRKİYE</span>
            <span>GELECEĞE BİRLİKTE</span>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <div className="eyebrow">
            <span className="section-index">03 /</span> BİZ ALDEMİR SOFTWARE'İZ
          </div>
          <h2 id="about-title">
            Teknolojide sınır yok.
            <br />
            <span>Hedeflerinizde de olmasın.</span>
          </h2>
          <p className="about-intro">
            Hayallerinizi gerçeğe dönüştürmek için yanınızdayız. Uşak'tan
            dünyaya uzanan bir vizyonla, işinize özel yazılımlar ve güçlü
            dijital sistemler geliştiriyoruz.
          </p>
          <div className="principles">
            {principles.map(([title, description, Icon]) => (
              <div className="principle" key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#contact" className="text-link">
            Geleceğe birlikte <FiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
