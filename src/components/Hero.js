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
    description: "Mühendislik gücümüzü markanızın hedefleriyle buluşturuyoruz. Özel yazılım, web ve mobil çözümlerle büyümenize sağlam bir rota çiziyoruz.",
  },
  {
    label: "Özel yazılım",
    eyebrow: "İŞİNİZİ ANLAYAN TEKNOLOJİ PARTNERİNİZ",
    lines: ["İşinize özel", "yazılımlar,", "kalıcı çözümler."],
    description: "İhtiyaçlarınızı anlayarak web, mobil ve kurumsal yazılım çözümleri geliştiriyor; işinizi sürdürülebilir bir altyapıyla büyütüyoruz.",
  },
  {
    label: "Web ve mobil",
    eyebrow: "WEB VE MOBİL UYGULAMA GELİŞTİRME",
    lines: ["Markanızı yansıtan", "web ve mobil", "deneyimler."],
    description: "Müşterilerinizin size kolayca ulaşmasını sağlayan, hızlı, erişilebilir ve markanızla uyumlu dijital deneyimler tasarlıyoruz.",
  },
  {
    label: "İş süreçleri",
    eyebrow: "YÖNETİM SİSTEMLERİ VE OTOMASYON",
    lines: ["İş süreçlerinizi", "tek merkezden", "yönetin."],
    description: "Operasyonlarınızı, verilerinizi ve ekiplerinizi iş akışınıza özel sistemlerle bir araya getiriyor; süreçlerinizi görünür ve yönetilebilir kılıyoruz.",
  },
  {
    label: "Dijital dönüşüm",
    eyebrow: "GÜVENLİ ALTYAPI, SÜRDÜRÜLEBİLİR GELİŞİM",
    lines: ["Dijital dönüşümü", "sağlam bir temelle", "başlatın."],
    description: "Bulut altyapısı, veri yönetimi ve sistem entegrasyonlarıyla işinizi geleceğe hazırlıyor; güvenlik ve performansı birlikte ele alıyoruz.",
  },
  {
    label: "Teknoloji ortaklığı",
    eyebrow: "UZUN VADELİ TEKNOLOJİ ORTAKLIĞI",
    lines: ["Fikirden yayına,", "her aşamada", "yanınızdayız."],
    description: "Analiz, tasarım ve geliştirmeden bakım ve desteğe kadar projenizin sorumluluğunu paylaşıyor; değişen ihtiyaçlarınıza birlikte çözüm üretiyoruz.",
  },
  {
    label: "Dijitalde sınırları aşın",
    eyebrow: "YAZILIM GÜCÜMÜZLE DAHA İLERİYE",
    lines: ["Dijitalde sınırları", "aşan güç:", "Aldemir Software."],
    description: "İddiamızı geliştirdiğimiz yazılımlara yansıtıyoruz. Karmaşık ihtiyaçları güçlü sistemlere dönüştürüyor, işinize yeni hareket alanları açıyoruz.",
  },
  {
    label: "Yeni ufuklar",
    eyebrow: "GÜÇLÜ MÜHENDİSLİK · BÜYÜK HEDEFLER",
    lines: ["Güçlü yazılımlarla", "yeni ufuklara", "birlikte."],
    description: "Büyük hedeflerin arkasında sağlam bir teknoloji vardır. Fikrinizi ölçeklenebilir yazılıma dönüştürüyor, her yeni aşamada yanınızda yer alıyoruz.",
  },
];

const destinations = [
  ["Web çözümleri", "Kurumsal siteler ve e-ticaret", "#solution-web", FiGlobe],
  ["Özel yazılım", "İşinize uyarlanan sistemler", "#solution-software", FiCode],
  ["Mobil uygulamalar", "iOS ve Android deneyimleri", "#solution-mobile", FiSmartphone],
  ["Dijital altyapı", "Bulut ve sistem entegrasyonu", "#solution-cloud", FiLayers],
];

export default function Hero() {
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
            <div className="eyebrow"><span className="signal-line" />{slide.eyebrow}</div>
            <h1 id="hero-title">
              {slide.lines.map((line, lineIndex) => (
                <span className={lineIndex === 2 ? "hero-line hero-line-accent" : "hero-line"} key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-description">{slide.description}</p>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">Projenizi konuşalım <FiArrowUpRight aria-hidden="true" /></a>
            <a href="#services" className="button button-glass">Çözümlerimizi inceleyin <FiArrowDown aria-hidden="true" /></a>
          </div>
          <div className="hero-slide-controls" role="group" aria-label="Tanıtım mesajları">
            <div className="hero-slide-selectors">
              {heroSlides.map((item, itemIndex) => (
                <button
                  type="button"
                  key={item.label}
                  className="hero-slide-selector"
                  aria-label={item.label}
                  aria-pressed={index === itemIndex}
                  onClick={() => { setIndex(itemIndex); setPaused(true); }}
                  onFocus={() => setPaused(true)}
                ><span /></button>
              ))}
            </div>
            <span className="hero-slide-count" aria-hidden="true">0{index + 1} / 0{heroSlides.length}</span>
            {!reduced && (
              <button type="button" className="hero-slide-toggle" aria-label={paused ? "Otomatik geçişi başlat" : "Otomatik geçişi durdur"} onClick={() => setPaused((value) => !value)}>
                {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
              </button>
            )}
          </div>
          <div className="hero-origin">
            <TurkishFlag />
            <span>Uşak’tan Türkiye’ye.<small>İşiniz için güvenilir teknoloji ortaklığı.</small></span>
          </div>
        </div>
        <div className="hero-scene-caption" aria-hidden="true">İhtiyacınıza özel yazılım.<br /><span>Uzun vadeli iş ortaklığı.</span></div>
      </div>
      <div className="container orbital-footer">
        <div className="mission-dock" aria-label="Çözüm alanlarımız">
          {destinations.map(([name, description, href, Icon]) => (
            <a href={href} key={name}>
              <Icon aria-hidden="true" />
              <div><strong>{name}</strong><span>{description}</span></div>
              <FiArrowUpRight className="dock-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
