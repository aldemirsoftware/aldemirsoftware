import useLightweightScene from "../hooks/useLightweightScene";
import { useTranslation } from "../i18n/Language";
import React from "react";
import { FiSliders, FiTarget, FiSend } from "react-icons/fi";
import LocalizedArtwork from "./LocalizedArtwork";
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
  const lightweight = useLightweightScene();
  const { t, language } = useTranslation();
  return (
    <section
      className="section vision"
      id="vision"
      aria-labelledby="vision-title"
    >
      <div className="container">
        <Reveal className="vision-heading">
          <div className="eyebrow">
            <span className="signal-line" />{t(" YAKLAŞIMIMIZ")}</div>
          <h2 id="vision-title">{t("Dijital gücün ")}<span>{t("3 temeli.")}</span>
          </h2>
          <p>{t("Dengeli büyüme, stratejik görünürlük ve sade dijital deneyim.")}</p>
        </Reveal>
        <div className="vision-grid">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.title}
              delay={i * 0.08}
              className={`vision-card glass-card vision-${principle.image}`}
            >
              <div className="vision-art" aria-hidden="true">
                {language !== "tr" ? <LocalizedArtwork title={principle.title} description={principle.caption} Icon={principle.icon} /> : <img
                  src={`/images/${lightweight ? "mobile/" : ""}${principle.image}.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="1122"
                  height="1402"
                />}
              </div>
              <div className="vision-body">
                <span className="vision-icon">
                  <principle.icon aria-hidden="true" />
                </span>
                <h3>{t(principle.title)}</h3>
                <span className="luminous-rule" aria-hidden="true" />
                <p>{t(principle.description)}</p>
                <span className="vision-caption">{t(principle.caption)}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="vision-statement">
          <span>{t("Derin akıl arka planda.")}</span>
          <strong>{t("Sadelik ön planda.")}</strong>
        </Reveal>
      </div>
    </section>
  );
}
