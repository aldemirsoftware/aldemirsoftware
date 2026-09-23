import React from "react";
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
  return (
    <div className="engineering-story">
      <Reveal className="engineering-visual">
        <img
          src="/images/engineering-depth.jpg"
          alt="Suyun üzerinde küçük bir bölümü, suyun altında çok daha büyük gövdesi görünen buzdağı; yazılımın görünmeyen mühendislik altyapısını temsil ediyor."
          width="1448"
          height="1086"
          loading="lazy"
          decoding="async"
        />
        <div className="iceberg-caption">
          <span>GÖRÜNEN HİZMETLERİMİZ</span>
          <span>GÖRÜNMEYEN GÜCÜMÜZ</span>
        </div>
      </Reveal>
      <div className="engineering-layers">
        <Reveal className="engineering-layer glass-card">
          <span className="layer-label">01 / GÖRÜNEN</span>
          <h3>Görünen Hizmetlerimiz</h3>
          <ul>
            <li>
              <FiMonitor aria-hidden="true" /> Web Tasarım & Geliştirme
            </li>
            <li>
              <FiCode aria-hidden="true" /> Özel Yazılım Çözümleri
            </li>
            <li>
              <FiSmartphone aria-hidden="true" /> Mobil Uygulama Geliştirme
            </li>
            <li>
              <FiPieChart aria-hidden="true" /> Yönetim Paneli Sistemleri
            </li>
            <li>
              <FiShoppingCart aria-hidden="true" /> E-Ticaret Çözümleri
            </li>
            <li>
              <FiUser aria-hidden="true" /> Dijital Danışmanlık
            </li>
            <li>
              <FiTrendingUp aria-hidden="true" /> SEO & Performans Optimizasyonu
            </li>
            <li>
              <FiHeadphones aria-hidden="true" /> Bakım & Destek Hizmetleri
            </li>
          </ul>
        </Reveal>
        <Reveal
          className="engineering-layer engineering-layer-deep glass-card"
          delay={0.1}
        >
          <span className="layer-label">02 / GÖRÜNMEYEN</span>
          <h3>Görünmeyen Gücümüz</h3>
          <ul>
            <li>
              <FiZap aria-hidden="true" /> Modern & Güncel Teknolojiler
            </li>
            <li>
              <FiShield aria-hidden="true" /> Güvenli & Ölçeklenebilir Altyapı
            </li>
            <li>
              <FiActivity aria-hidden="true" /> Performans & Hız Optimizasyonu
            </li>
            <li>
              <FiCode aria-hidden="true" /> Temiz, Sürdürülebilir Kod
            </li>
            <li>
              <FiLock aria-hidden="true" /> Veri Güvenliği & Gizlilik
            </li>
            <li>
              <FiRefreshCw aria-hidden="true" /> Sürekli Güncelleme & İyileştirme
            </li>
            <li>
              <FiGrid aria-hidden="true" /> Entegrasyon & Otomasyon
            </li>
            <li>
              <FiCloud aria-hidden="true" /> Yedekleme & Felaket Kurtarma
            </li>
            <li>
              <FiBarChart2 aria-hidden="true" /> Analiz & Raporlama
            </li>
            <li>
              <FiCheckCircle aria-hidden="true" /> Test & Kalite Güvencesi
            </li>
          </ul>
        </Reveal>
      </div>
      <Reveal className="engineering-quote">
        <p>
          Güncel teknolojiler, sağlam altyapı,
          <br />
          sürekli iyileştirme ile <strong>kalıcı çözümler.</strong>
        </p>
      </Reveal>
    </div>
  );
}
