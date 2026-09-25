import useLightweightScene from "../hooks/useLightweightScene";
import { useTranslation } from "../i18n/Language";
import React, { useEffect, useRef, useState } from "react";
import {
  FiMonitor,
  FiSmartphone,
  FiPieChart,
  FiShoppingCart,
  FiUser,
  FiTrendingUp,
  FiHeadphones,
  FiZap,
  FiShield,
  FiActivity,
  FiCode,
  FiLock,
  FiRefreshCw,
  FiGrid,
  FiCloud,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import Reveal from "./Reveal";
export default function Engineering() {
  const lightweight = useLightweightScene();
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [paths, setPaths] = useState({});
  const storyRef = useRef(null);
  const cardInteraction = (key) => ({
    tabIndex: 0,
    onPointerEnter: () => setActive(key),
    onPointerLeave: (event) => {
      if (!event.currentTarget.contains(document.activeElement)) setActive(null);
    },
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
  });
  useEffect(() => {
    const root = storyRef.current;
    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const next = {};
      ["surface", "depth"].forEach((key) => {
        const source = root.querySelector(`[data-zone="${key}"]`).getBoundingClientRect();
        const target = root.querySelector(`#engineering-${key}`).getBoundingClientRect();
        const x = source.left + source.width * .7 - bounds.left;
        const y = source.top + source.height * .5 - bounds.top;
        const endX = target.left - bounds.left;
        const endY = target.top + 55 - bounds.top;
        const mid = x + (endX - x) * .55;
        next[key] = `M ${x} ${y} C ${mid} ${y}, ${mid} ${endY}, ${endX} ${endY}`;
      });
      setPaths(next);
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.querySelectorAll(".engineering-visual, .engineering-layer").forEach(el => observer.observe(el));
    measure();
    return () => observer.disconnect();
  }, [active]);
  return (
    <div className="engineering-story engineering-interactive" ref={storyRef} data-active={active || "none"}>
      <div className="engineering-ocean" aria-hidden="true" />
      <svg className="iceberg-connectors" aria-hidden="true">
        {["surface", "depth"].map(key => <path key={key} className={active === key ? "is-active" : ""} d={paths[key]} pathLength="1" />)}
      </svg>
      <Reveal className="engineering-visual">
        <img
          src={lightweight ? "/images/mobile/engineering-depth.jpg" : "/images/engineering-depth.jpg"}
          alt={t("Suyun üzerinde küçük bir bölümü, suyun altında çok daha büyük gövdesi görünen buzdağı; yazılımın görünmeyen mühendislik altyapısını temsil ediyor.")}
          width="1448"
          height="1086"
          loading="lazy"
          decoding="async"
        />
        <div className="iceberg-water" aria-hidden="true"><i /><i /><i /></div>
        <div className="iceberg-caustics" aria-hidden="true" />
        {[ ["surface", "Görünen hizmetlerimizi keşfedin"], ["depth", "Görünmeyen gücümüzü keşfedin"] ].map(([key, label]) => (
          <button key={key} type="button" className={`iceberg-zone iceberg-zone-${key}`} data-zone={key}
            aria-label={t(label)} aria-controls={`engineering-${key}`} aria-pressed={active === key}
            onPointerEnter={() => setActive(key)} onPointerLeave={(event) => { if (event.pointerType !== "touch" && document.activeElement !== event.currentTarget) setActive(null); }}
            onFocus={() => setActive(key)} onBlur={() => setActive(null)} onClick={() => {
              setActive(key);
              if (window.matchMedia("(max-width: 700px)").matches) {
                document.getElementById(`engineering-${key}`).scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
              }
            }}>
            <span className="iceberg-beacon" aria-hidden="true" />
            <span className="iceberg-zone-label">{t(key === "surface" ? "01 / Görünen" : "02 / Görünmeyen")}</span>
          </button>
        ))}
        <div className="iceberg-caption">
          <span>{t("GÖRÜNEN HİZMETLERİMİZ")}</span>
          <span>{t("GÖRÜNMEYEN GÜCÜMÜZ")}</span>
        </div>
      </Reveal>
      <div className="engineering-layers">
        <Reveal id="engineering-surface" className="engineering-layer glass-card" {...cardInteraction("surface")}>
          <span className="layer-label">{t("01 / GÖRÜNEN")}</span>
          <h3>{t("Görünen Hizmetlerimiz")}</h3>
          <ul>
            <li>
              <FiMonitor aria-hidden="true" />{t(" Web Tasarım & Geliştirme")}</li>
            <li>
              <FiCode aria-hidden="true" />{t(" Özel Yazılım Çözümleri")}</li>
            <li>
              <FiSmartphone aria-hidden="true" />{t(" Mobil Uygulama Geliştirme")}</li>
            <li>
              <FiPieChart aria-hidden="true" />{t(" Yönetim Paneli Sistemleri")}</li>
            <li>
              <FiShoppingCart aria-hidden="true" />{t(" E-Ticaret Çözümleri")}</li>
            <li>
              <FiUser aria-hidden="true" />{t(" Dijital Danışmanlık")}</li>
            <li>
              <FiTrendingUp aria-hidden="true" />{t(" SEO & Performans Optimizasyonu")}</li>
            <li>
              <FiHeadphones aria-hidden="true" />{t(" Bakım & Destek Hizmetleri")}</li>
          </ul>
        </Reveal>
        <Reveal
          id="engineering-depth"
          {...cardInteraction("depth")}
          className="engineering-layer engineering-layer-deep glass-card"
          delay={0.1}
        >
          <span className="layer-label">{t("02 / GÖRÜNMEYEN")}</span>
          <h3>{t("Görünmeyen Gücümüz")}</h3>
          <ul>
            <li>
              <FiZap aria-hidden="true" />{t(" Modern & Güncel Teknolojiler")}</li>
            <li>
              <FiShield aria-hidden="true" />{t(" Güvenli & Ölçeklenebilir Altyapı")}</li>
            <li>
              <FiActivity aria-hidden="true" />{t(" Performans & Hız Optimizasyonu")}</li>
            <li>
              <FiCode aria-hidden="true" />{t(" Temiz, Sürdürülebilir Kod")}</li>
            <li>
              <FiLock aria-hidden="true" />{t(" Veri Güvenliği & Gizlilik")}</li>
            <li>
              <FiRefreshCw aria-hidden="true" />{t(" Sürekli Güncelleme & İyileştirme")}</li>
            <li>
              <FiGrid aria-hidden="true" />{t(" Entegrasyon & Otomasyon")}</li>
            <li>
              <FiCloud aria-hidden="true" />{t(" Yedekleme & Felaket Kurtarma")}</li>
            <li>
              <FiBarChart2 aria-hidden="true" />{t(" Analiz & Raporlama")}</li>
            <li>
              <FiCheckCircle aria-hidden="true" />{t(" Test & Kalite Güvencesi")}</li>
          </ul>
        </Reveal>
      </div>
      <Reveal className="engineering-quote">
        <p>{t("Güncel teknolojiler, sağlam altyapı,")}<br />{t("sürekli iyileştirme ile ")}<strong>{t("kalıcı çözümler.")}</strong>
        </p>
      </Reveal>
    </div>
  );
}
