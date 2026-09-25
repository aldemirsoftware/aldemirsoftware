import { useTranslation } from "../i18n/Language";
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight, FiArrowDown, FiGlobe, FiCode,
  FiSmartphone, FiLayers, FiPause, FiPlay,
} from "react-icons/fi";
import { TurkishFlag } from "./Brand";
import OrbitalScene from "./OrbitalScene";

export const heroSlides = [
  {
    label: "Geleceğin yörüngesi",
    eyebrow: "ALDEMİR SOFTWARE · HEDEFİNİZ GELECEK",
    lines: ["Markanızı geleceğin", "yörüngesine", "taşıyoruz."],
    descriptionParts: ["Mühendislik gücümüzü markanızın hedefleriyle buluşturuyoruz.", "Özel yazılım, web ve mobil çözümlerle büyümenize sağlam bir rota çiziyoruz."],
  },
  {
    label: "Özel yazılım",
    eyebrow: "İŞİNİZİ ANLAYAN TEKNOLOJİ PARTNERİNİZ",
    lines: ["İşinize özel", "yazılımlar,", "kalıcı çözümler."],
    descriptionParts: ["İhtiyaçlarınızı anlayarak web, mobil ve kurumsal yazılım çözümleri geliştiriyor;", "işinizi sürdürülebilir bir altyapıyla büyütüyoruz."],
  },
  {
    label: "Web ve mobil",
    eyebrow: "WEB VE MOBİL UYGULAMA GELİŞTİRME",
    lines: ["Markanızı yansıtan", "web ve mobil", "deneyimler."],
    descriptionParts: ["Müşterilerinizin size kolayca ulaşmasını sağlayan,", "hızlı, erişilebilir ve markanızla uyumlu dijital deneyimler tasarlıyoruz."],
  },
  {
    label: "İş süreçleri",
    eyebrow: "YÖNETİM SİSTEMLERİ VE OTOMASYON",
    lines: ["İş süreçlerinizi", "tek merkezden", "yönetin."],
    descriptionParts: ["Operasyonlarınızı, verilerinizi ve ekiplerinizi iş akışınıza özel sistemlerle bir araya getiriyor;", "süreçlerinizi görünür ve yönetilebilir kılıyoruz."],
  },
  {
    label: "Dijital dönüşüm",
    eyebrow: "GÜVENLİ ALTYAPI, SÜRDÜRÜLEBİLİR GELİŞİM",
    lines: ["Dijital dönüşümü", "sağlam bir temelle", "başlatın."],
    descriptionParts: ["Bulut altyapısı, veri yönetimi ve sistem entegrasyonlarıyla işinizi geleceğe hazırlıyor;", "güvenlik ve performansı birlikte ele alıyoruz."],
  },
  {
    label: "Teknoloji ortaklığı",
    eyebrow: "UZUN VADELİ TEKNOLOJİ ORTAKLIĞI",
    lines: ["Fikirden yayına,", "her aşamada", "yanınızdayız."],
    descriptionParts: ["Analiz, tasarım ve geliştirmeden bakım ve desteğe kadar projenizin sorumluluğunu paylaşıyor;", "değişen ihtiyaçlarınıza birlikte çözüm üretiyoruz."],
  },
  {
    label: "Dijitalde sınırları aşın",
    eyebrow: "YAZILIM GÜCÜMÜZLE DAHA İLERİYE",
    lines: ["Dijitalde sınırları", "aşan güç:", "Aldemir Software."],
    descriptionParts: ["İddiamızı geliştirdiğimiz yazılımlara yansıtıyoruz.", "Karmaşık ihtiyaçları güçlü sistemlere dönüştürüyor, işinize yeni hareket alanları açıyoruz."],
  },
  {
    label: "Yeni ufuklar",
    eyebrow: "GÜÇLÜ MÜHENDİSLİK · BÜYÜK HEDEFLER",
    lines: ["Güçlü yazılımlarla", "yeni ufuklara", "birlikte."],
    descriptionParts: ["Büyük hedeflerin arkasında sağlam bir teknoloji vardır.", "Fikrinizi ölçeklenebilir yazılıma dönüştürüyor, her yeni aşamada yanınızda yer alıyoruz."],
  },
];

const destinations = [
  ["Web çözümleri", "Kurumsal siteler ve e-ticaret", "#solution-web", FiGlobe],
  ["Özel yazılım", "İşinize uyarlanan sistemler", "#solution-software", FiCode],
  ["Mobil uygulamalar", "iOS ve Android deneyimleri", "#solution-mobile", FiSmartphone],
  ["Dijital altyapı", "Bulut ve sistem entegrasyonu", "#solution-cloud", FiLayers],
];

export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const slide = heroSlides[index];

  useEffect(() => {
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(heroRef.current);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (reduced || paused || hovered || !visible) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 8500);
    return () => clearInterval(timer);
  }, [reduced, paused, hovered, visible]);

  return (
    <section className="orbital-hero hero-refined" id="home" ref={heroRef} aria-labelledby="hero-title">
      <OrbitalScene reduced={reduced} active={visible} />
      <div className="orbital-shade" aria-hidden="true" />
      <div className="container orbital-content">
        <div className="orbital-copy" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className="hero-message" key={index} aria-live={paused ? "polite" : "off"}>
            <div className="eyebrow"><span className="signal-line" />{t(slide.eyebrow)}</div>
            <h1 id="hero-title">
              {slide.lines.map((line, lineIndex) => (
                <span className={lineIndex === 2 ? "hero-line hero-line-accent" : "hero-line"} key={line}>{t(line)}</span>
              ))}
            </h1>
            <p className="hero-description">{(slide.descriptionParts || [slide.description]).map((part, idx, arr) => (<React.Fragment key={idx}>{t(part)}{idx < arr.length - 1 && <br />}</React.Fragment>))}</p>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">{t("Projenizi konuşalım ")}<FiArrowUpRight aria-hidden="true" /></a>
            <a href="#services" className="button button-glass">{t("Çözümlerimizi inceleyin ")}<FiArrowDown aria-hidden="true" /></a>
          </div>
          <div className="hero-slide-controls" role="group" aria-label={t("Tanıtım mesajları")}>
            <div className="hero-slide-selectors">
              {heroSlides.map((item, itemIndex) => (
                <button
                  type="button"
                  key={item.label}
                  className="hero-slide-selector"
                  aria-label={t(item.label)}
                  aria-pressed={index === itemIndex}
                  onClick={() => { setIndex(itemIndex); setPaused(true); }}
                  onFocus={() => setPaused(true)}
                ><span /></button>
              ))}
            </div>
            <span className="hero-slide-count" aria-hidden="true">0{index + 1} / 0{heroSlides.length}</span>
            {!reduced && (
              <button type="button" className="hero-slide-toggle" aria-label={t(paused ? "Otomatik geçişi başlat" : "Otomatik geçişi durdur")} onClick={() => setPaused((value) => !value)}>
                {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
              </button>
            )}
          </div>
          <div className="hero-origin">
            <TurkishFlag />
            <span>{t("Uşak’tan Türkiye’ye.")}<small>{t("İşiniz için güvenilir teknoloji ortaklığı.")}</small></span>
          </div>
        </div>
        <div className="hero-scene-caption" aria-hidden="true">{t("İhtiyacınıza özel yazılım.")}<br /><span>{t("Uzun vadeli iş ortaklığı.")}</span></div>
      </div>
      <div className="container orbital-footer">
        <div className="mission-dock" aria-label={t("Çözüm alanlarımız")}>
          {destinations.map(([name, description, href, Icon]) => (
            <a href={href} key={name}>
              <Icon aria-hidden="true" />
              <div><strong>{t(name)}</strong><span>{t(description)}</span></div>
              <FiArrowUpRight className="dock-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
