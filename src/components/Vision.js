import React from "react";
import { FiSliders, FiTarget, FiSend } from "react-icons/fi";
import Reveal from "./Reveal";
const principles = [
  {
    title: "Denge",
    image: "balance",
    icon: FiSliders,
    caption: "DİJİTALDE BÜYÜMENİN DENGESİ",
    description:
      "Performans, kullanıcı deneyimi ve sürdürülebilir altyapıyı aynı stratejide buluşturuyoruz.",
  },
  {
    title: "Strateji",
    image: "strategy",
    icon: FiTarget,
    caption: "GÖRÜNÜRLÜĞÜN ARKASINDAKİ STRATEJİ",
    description:
      "Doğru hamlelerle görünürlüğünüzü güçlendiriyor, markanıza kalıcı değer katıyoruz.",
  },
  {
    title: "Sadelik",
    image: "simplicity",
    icon: FiSend,
    caption: "DERİN AKIL ARKA PLANDA",
    description:
      "Karmaşık süreçleri sade, estetik ve kullanıcı odaklı dijital deneyimlere dönüştürüyoruz.",
  },
];
export default function Vision() {
  return (
    <section
      className="section vision"
      id="vision"
      aria-labelledby="vision-title"
    >
      <div className="container">
        <Reveal className="vision-heading">
          <div className="eyebrow">
            <span className="signal-line" /> YAKLAŞIMIMIZ
          </div>
          <h2 id="vision-title">
            Dijital gücün <span>3 temeli.</span>
          </h2>
          <p>Dengeli büyüme, stratejik görünürlük ve sade dijital deneyim.</p>
        </Reveal>
        <div className="vision-grid">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.title}
              delay={i * 0.08}
              className={`vision-card glass-card vision-${principle.image}`}
            >
              <div className="vision-art" aria-hidden="true">
                <img
                  src={`/images/${principle.image}.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="1122"
                  height="1402"
                />
              </div>
              <div className="vision-body">
                <span className="vision-icon">
                  <principle.icon aria-hidden="true" />
                </span>
                <h3>{principle.title}</h3>
                <span className="luminous-rule" aria-hidden="true" />
                <p>{principle.description}</p>
                <span className="vision-caption">{principle.caption}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="vision-statement">
          <span>Derin akıl arka planda.</span>
          <strong>Sadelik ön planda.</strong>
        </Reveal>
      </div>
    </section>
  );
}
