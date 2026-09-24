import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FiGlobe, FiCode, FiSmartphone, FiCloud, FiBarChart2, FiSettings, FiArrowUpRight, FiMaximize2, FiX, FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import Reveal from "./Reveal";

const services = [
  {
    id: "web", icon: FiGlobe, label: "Web çözümleri",
    outcome: "Güçlü bir dijital ilk izlenim.",
    titleParts: ["Markanızın dijitaldeki", "en güçlü karşılığı."],
    description: "Markanızın kimliğini yansıtan kurumsal siteler ve alışverişi kolaylaştıran e-ticaret deneyimleri geliştiriyoruz. Her ekranda hızlı, erişilebilir ve arama motorlarıyla uyumlu bir yapı kuruyoruz.",
    items: ["Kurumsal web siteleri & kampanya sayfaları", "E-ticaret & özel web uygulamaları", "Mobil uyumlu, erişilebilir arayüzler"],
  },
  {
    id: "software", icon: FiCode, label: "Özel yazılım",
    outcome: "Daha az tekrar. Daha fazla kontrol.",
    titleParts: ["Yazılım,", "işinize uyum sağlasın."],
    description: "Ekibinizin çalışma biçimine göre tasarlanan yönetim panelleri ve otomasyon sistemleriyle dağınık iş akışlarını birleştiriyoruz. Tekrarlayan işleri azaltıyor, operasyonlarınızı tek merkezden yönetmenizi sağlıyoruz.",
    items: ["İşinize özel yönetim panelleri", "CRM, ERP & sistem entegrasyonları", "İş akışı & süreç otomasyonu"],
  },
  {
    id: "mobile", icon: FiSmartphone, label: "Mobil uygulama",
    outcome: "Müşterinizle her an bağlantıda.",
    titleParts: ["İyi bir deneyim,", "her zaman elinizin altında."],
    description: "iOS ve Android uygulamalarıyla hizmetlerinizi müşterilerinizin günlük hayatına taşıyoruz. Sade kullanım, doğru zamanda bildirim ve büyümeye hazır altyapıyla kalıcı bir mobil deneyim oluşturuyoruz.",
    items: ["iOS & Android uygulamaları", "Kullanıcı deneyimi & bildirim sistemleri", "Ölçeklenebilir mobil altyapı"],
  },
  {
    id: "cloud", icon: FiCloud, label: "Dijital altyapı",
    outcome: "Bugünün ihtiyaçları, yarının kapasitesi.",
    titleParts: ["Büyümenizi taşıyan", "sağlam bir altyapı."],
    description: "Bulut sistemlerini, veri yönetimini ve güvenlik odaklı altyapıyı birlikte ele alıyoruz. İş sürekliliğini destekleyen, izlenebilir ve ihtiyaçlarınızla birlikte ölçeklenebilen sistemler kuruyoruz.",
    items: ["Bulut sistemleri & veri yönetimi", "Güvenlik odaklı altyapı & izleme", "Yedekleme & süreklilik planlaması"],
  },
  {
    id: "data", icon: FiBarChart2, label: "Veri & raporlama",
    outcome: "Veriden içgörüye, içgörüden aksiyona.",
    titleParts: ["Verilerinizi karar", "gücüne dönüştürün."],
    description: "Farklı kaynaklardaki verileri anlaşılır raporlarda ve canlı panellerde buluşturuyoruz. Performansınızı takip etmenizi, değişimleri görmenizi ve sonraki adımı veriye dayanarak planlamanızı kolaylaştırıyoruz.",
    items: ["Canlı raporlama & özel paneller", "Analitik izleme", "Anlaşılır veri görselleştirmeleri"],
  },
  {
    id: "strategy", icon: FiSettings, label: "Akıllı sistemler",
    image: "/images/smart-systems.jpg",
    outcome: "Birbirine bağlı süreçler. Tek merkezden güçlü yönetim.",
    titleParts: ["İşinizin tüm süreçleri,", "aynı merkezde."],
    description: "Yönetim panellerinizi, otomasyonlarınızı ve iş uygulamalarınızı birbiriyle konuşan bir yapıda buluşturuyoruz. Operasyonlarınızı tek merkezden takip etmenizi, tekrarlayan işleri otomatikleştirmenizi ve güncel verilerle karar almanızı sağlıyoruz.",
    items: ["İşinize özel yönetim panelleri", "Süreç otomasyonu & entegre iş sistemleri", "Veri odaklı yönetim & operasyon takibi"],
  },
];

function SolutionArtwork({ service, onOpen }) {
  const reduced = useReducedMotion();
  const frameRef = useRef(null);
  const reset = () => {
    frameRef.current?.style.setProperty("--tilt-x", "0deg");
    frameRef.current?.style.setProperty("--tilt-y", "0deg");
  };
  const tilt = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    frameRef.current.style.setProperty("--tilt-x", ((0.5 - (event.clientY - rect.top) / rect.height) * 5) + "deg");
    frameRef.current.style.setProperty("--tilt-y", (((event.clientX - rect.left) / rect.width - 0.5) * 6) + "deg");
  };
  return (
    <div className="solution-stage" onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="solution-orbit solution-orbit-one" aria-hidden="true" />
      <div className="solution-orbit solution-orbit-two" aria-hidden="true" />
      <div className="solution-poster-frame" ref={frameRef}>
        <button type="button" className="solution-poster-button" onClick={() => onOpen(service)} aria-label={service.label + " görselini büyüt"}>
          <img src={service.image || "/images/" + service.id + ".jpg"} alt={service.label + ": " + service.outcome} width="1122" height="1402" loading="lazy" decoding="async" />
        </button>
      </div>
      <button type="button" className="solution-expand" onClick={() => onOpen(service)} aria-label={service.label + " görselini incele"}><FiMaximize2 aria-hidden="true" /> Görseli incele</button>
    </div>
  );
}

export default function Services() {
  const [preview, setPreview] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const returnFocus = useRef(null);
  useEffect(() => {
    if (!preview) return undefined;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [preview]);
  const openPreview = (service) => {
    returnFocus.current = document.activeElement;
    setZoomed(false);
    setPreview(service);
  };
  return (
    <section id="services" className="section services orbital-services solutions-showcase" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow"><span className="section-index">01 /</span> ÇÖZÜM EVRENİMİZ</div>
            <h2 id="services-title">İşinizin her boyutuna,<br /><span>doğru dijital çözüm.</span></h2>
          </div>
          <p>İlk temas noktanızdan arka plandaki operasyonlarınıza kadar, birbiriyle uyumlu dijital çözümler geliştiriyoruz. İhtiyacınız olan alanı keşfedin.</p>
        </Reveal>
        <nav className="solution-navigation" aria-label="Çözüm alanlarına hızlı erişim">
          {services.map((service, i) => <a key={service.id} href={"#solution-" + service.id}><span>0{i + 1}</span><service.icon aria-hidden="true" />{service.label}</a>)}
        </nav>
        <div className="solution-gallery">
          {services.map((service, i) => (
            <article key={service.id} className={"solution-feature solution-feature-" + service.id} id={"solution-" + service.id} aria-labelledby={"solution-title-" + service.id}>
              <Reveal className="solution-visual-reveal"><SolutionArtwork service={service} onOpen={openPreview} /></Reveal>
              <Reveal className="solution-details" delay={0.12}>
                <div className="solution-heading-line"><span className="solution-icon"><service.icon aria-hidden="true" /></span><span>{service.label}</span><span className="solution-number" aria-hidden="true">0{i + 1} / 06</span></div>
                <h3 id={"solution-title-" + service.id}>{(service.titleParts || [service.title]).map((part, idx, arr) => (<React.Fragment key={idx}>{part}{idx < arr.length - 1 && <br />}</React.Fragment>))}</h3>
                <p className="solution-description">{service.description}</p>
                <ul className="solution-capabilities">{service.items.map(item => <li key={item}><FiCheck aria-hidden="true" />{item}</li>)}</ul>
                <p className="solution-outcome"><span aria-hidden="true" />{service.outcome}</p>
                <a href="#contact" className="solution-cta" aria-label={service.label + " projenizi konuşalım"}>Projenizi konuşalım <FiArrowUpRight aria-hidden="true" /></a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
      {preview && (
        <dialog ref={dialogRef} className="solution-dialog" aria-labelledby="solution-preview-title" onCancel={(event) => { event.preventDefault(); setPreview(null); }} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
          <div className="solution-preview-toolbar">
            <h2 id="solution-preview-title">{preview.label}</h2>
            <button type="button" aria-label={zoomed ? "Görseli ekrana sığdır" : "Görsele yakınlaş"} aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}<span>{zoomed ? "Ekrana sığdır" : "Yakınlaştır"}</span></button>
            <button type="button" aria-label="Görseli kapat" onClick={() => setPreview(null)}><FiX aria-hidden="true" /></button>
          </div>
          <div className={"solution-preview-scroll" + (zoomed ? " is-zoomed" : "")} tabIndex={0} aria-label="Görsel alanı; yakınlaştırdıktan sonra kaydırabilirsiniz">
            <img src={preview.image || "/images/" + preview.id + ".jpg"} alt={preview.label + " hizmet afişi"} width="1122" height="1402" />
          </div>
        </dialog>
      )}
    </section>
  );
}
