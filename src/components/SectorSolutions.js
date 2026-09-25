import { useTranslation } from "../i18n/Language";
import React from "react";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCoffee,
  FiHome,
  FiSettings,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { LuBuilding2, LuStethoscope } from "react-icons/lu";
import { TbDental } from "react-icons/tb";
import Reveal from "./Reveal";
import "./SectorSolutions.css";

const solutions = [
  {
    title: "İnşaat & Şantiye Yönetimi",
    description: "Proje takibi, şantiye operasyonları, maliyet kontrolü ve satış süreçleri tek merkezde.",
    icon: FiTool,
  },
  {
    title: "Klinik & Muayenehane Yönetimi",
    description: "Randevu, hasta takibi, muayene geçmişi, doküman arşivi ve tahsilat yönetimi.",
    icon: LuStethoscope,
  },
  {
    title: "Diş Kliniği Yönetimi",
    description: "Randevular, hasta kayıtları, diş şeması, tedavi planları ve ödeme takibi.",
    icon: TbDental,
  },
  {
    title: "Dijital İşletme Yönetimi",
    description: "Kafe ve restoranlar için QR menü, masa yönetimi, mutfak ekranı ve stok takibi.",
    icon: FiCoffee,
  },
  {
    title: "Fabrika & Üretim Otomasyonu",
    description: "Üretim takibi, stok yönetimi, makine durumları, performans analizi ve anlık raporlama.",
    icon: FiSettings,
  },
  {
    title: "Emlak Ofisi Yönetimi",
    description: "Portföyler, ilanlar, müşteri ilişkileri ve satış süreçleri için bütünleşik yönetim.",
    icon: FiHome,
  },
  {
    title: "Site & Tesis Yönetimi",
    description: "Aidat takibi, sakin portalı, teknik operasyonlar, arıza talepleri ve bakım planları.",
    icon: LuBuilding2,
  },
  {
    title: "Bayi & Kurumsal Müşteri Yönetimi",
    description: "Bayi portalı, sipariş ve stok yönetimi, cari hesaplar, fiyatlandırma ve raporlama.",
    icon: FiUsers,
  },
  {
    title: "Hukuk Bürosu Yönetimi",
    description: "Dosyalar, süreler, müvekkil kayıtları, belge arşivi ve tahsilat süreçlerinin takibi.",
    icon: FiBriefcase,
  },
];

export default function SectorSolutions() {
  const { t } = useTranslation();
  return (
    <section className="sector-solutions" aria-labelledby="sector-solutions-title">
      <div className="sector-cosmos" aria-hidden="true">
        <div className="sector-nebula" />
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <g className="sector-orbits" fill="none" stroke="currentColor">
            <ellipse cx="600" cy="350" rx="530" ry="190" transform="rotate(-24 600 350)" />
            <ellipse cx="600" cy="350" rx="460" ry="270" transform="rotate(28 600 350)" />
            <ellipse cx="600" cy="350" rx="320" ry="310" />
          </g>
          <g fill="currentColor"><circle cx="135" cy="185" r="2" /><circle cx="1030" cy="190" r="3" /><circle cx="890" cy="560" r="2" /><circle cx="350" cy="600" r="3" /><circle cx="640" cy="75" r="2" /></g>
        </svg>
      </div>
      <Reveal className="sector-heading">
        <div>
          <div className="eyebrow">{t("SEKTÖREL ÇÖZÜMLER")}</div>
          <h3 id="sector-solutions-title">{t("Sektörünüze özel")}<br />
            <span>{t("dijital çözümler.")}</span>
          </h3>
        </div>
        <p>{t("Web ve mobil çözümlerimizin yanında, sektörünüzün çalışma düzenine uyarlanan yönetim ve otomasyon sistemleri de geliştiriyoruz.")}</p>
      </Reveal>
      <Reveal>
        <ul className="sector-grid">
          {solutions.map(({ title, description, icon: Icon }, index) => (
            <li className="sector-item" key={title}>
              <a className="sector-card" href="#contact" aria-label={t(`${title} hakkında görüşelim`)}>
              <div className="sector-item-top" aria-hidden="true">
                <Icon />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h4>{t(title)}</h4>
              <p>{t(description)}</p>
              <span className="sector-card-link">{t("Birlikte geliştirelim ")}<FiArrowUpRight aria-hidden="true" /></span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="sector-footer">
        <p>{t("Hazır kalıplar yerine, işletmenizin ihtiyaçlarına göre şekillenen sistemler.")}</p>
        <a className="text-link" href="#contact">{t("İhtiyacınızı konuşalım ")}<FiArrowUpRight aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
