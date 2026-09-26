import { useTranslation } from "../i18n/Language";
import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiUsers, FiLink, FiTrendingUp, FiMapPin } from "react-icons/fi";
import { TurkishFlag } from "./Brand";
import Reveal from "./Reveal";
const principles = [
  [
    "Stratejiden uygulamaya",
    "İhtiyaç analizi, teknoloji danışmanlığı ve yazılım geliştirmeyi aynı hedef etrafında birleştiriyoruz.",
    FiUsers,
  ],
  [
    "Uzun vadeli iş ortaklığı",
    "Şeffaf iletişim ve işinizi anlayan bir yaklaşımla, ihtiyaçlarınızla birlikte gelişen çözümler sunuyoruz.",
    FiLink,
  ],
  [
    "Sürekli gelişim",
    "Yayına aldıktan sonra da bakım, destek ve iyileştirmeyle yatırımınızın değerini korumaya odaklanıyoruz.",
    FiTrendingUp,
  ],
];
export default function About() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const reset = () => {
    panelRef.current?.style.setProperty("--brand-rx", "0deg");
    panelRef.current?.style.setProperty("--brand-ry", "0deg");
  };
  const tilt = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    panelRef.current.style.setProperty("--brand-rx", ((0.5 - (event.clientY - rect.top) / rect.height) * 8) + "deg");
    panelRef.current.style.setProperty("--brand-ry", (((event.clientX - rect.left) / rect.width - 0.5) * 10) + "deg");
  };
  return (
    <section className="section about about-corporate" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <Reveal className="about-emblem-reveal">
          <div className="about-emblem-stage" onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
          <div className="about-emblem-panel" ref={panelRef}>
          <div className="about-emblem-space" aria-hidden="true">
            <img src="/images/orbital-background.jpg" alt="" width="1672" height="941" loading="lazy" decoding="async" />
          </div>
          <div className="about-emblem-grid" aria-hidden="true" />
          <div className="about-emblem-orbit about-emblem-orbit-one" aria-hidden="true" />
          <div className="about-emblem-orbit about-emblem-orbit-two" aria-hidden="true" />
          <div className="about-emblem-topline"><span>ALDEMİR SOFTWARE</span><span className="about-emblem-point" aria-hidden="true" /></div>
          <div className="about-logo-focus"><img
            src="/logo-nonbck.png"
            alt={t("Aldemir Software logosu")}
            loading="lazy"
            width="300"
            height="300"
          /></div>
          <div className="about-emblem-wordmark"><strong>ALDEMİR</strong><span>SOFTWARE</span></div>
          <p className="about-emblem-promise">{t("Güçlü mühendislik.")}<br /><span>{t("Geleceğe yön veren çözümler.")}</span></p>
          <div className="about-emblem-footer">
            <div className="about-emblem-origin">
              <TurkishFlag />
              <span>{t("Türkiye'den")}<br /><strong>{t("Dünyaya.")}</strong></span>
            </div>
            <div className="about-emblem-location">
              <span>{t("UŞAK, TÜRKİYE")}</span>
              <FiMapPin aria-hidden="true" />
            </div>
          </div>
          </div>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <div className="eyebrow">
            <span className="section-index">01 /</span>{t(" BİZ ALDEMİR SOFTWARE'İZ")}</div>
          <h2 id="about-title">{t("Teknolojiyi işiniz için")}<br />
            <span>{t("kalıcı değere dönüştürüyoruz.")}</span>
          </h2>
          <div className="about-narrative">
            <p><strong>{t("Uşak merkezli Aldemir Software olarak")}</strong>{t(", şirketlerin, kurumların ve girişimcilerin dijital dönüşümüne eşlik ediyoruz. Stratejik teknoloji danışmanlığından özel yazılım geliştirmeye kadar, iş hedeflerinizi merkeze alan bir yaklaşımla çalışıyoruz.")}</p>
            <p>{t("Uşak’ta web tasarım, özel yazılım ve mobil uygulama geliştirme hizmetleri sunuyoruz. Web tabanlı iş programları, e-ticaret ve kurumsal yönetim sistemlerini işletmenizin çalışma biçimine göre tasarlıyor; bilişim ve teknoloji danışmanlığıyla dijital süreçlerinizi güçlendiriyoruz.")}</p>
            <p className="about-vision-statement">{t("Vizyonumuz, teknoloji partneri olduğumuz her işletmenin geleceğe güvenle ilerlemesini sağlamak; bugünün ihtiyaçlarını karşılarken yarının fırsatlarına hazır olmaktır.")}</p>
          </div>
          <div className="principles">
            {principles.map(([title, description, Icon]) => (
              <div className="principle" key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#contact" className="text-link">{t("İşinizi ve hedeflerinizi konuşalım ")}<FiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
