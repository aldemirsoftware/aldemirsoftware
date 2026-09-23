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
  return (
    <section className="sector-solutions" aria-labelledby="sector-solutions-title">
      <Reveal className="sector-heading">
        <div>
          <div className="eyebrow">SEKTÖREL ÇÖZÜMLER</div>
          <h3 id="sector-solutions-title">
            Sektörünüze özel<br />
            <span>dijital çözümler.</span>
          </h3>
        </div>
        <p>
          Web ve mobil çözümlerimizin yanında, sektörünüzün çalışma düzenine
          uyarlanan yönetim ve otomasyon sistemleri de geliştiriyoruz.
        </p>
      </Reveal>
      <Reveal>
        <ul className="sector-grid">
          {solutions.map(({ title, description, icon: Icon }, index) => (
            <li className="sector-item" key={title}>
              <div className="sector-item-top" aria-hidden="true">
                <Icon />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h4>{title}</h4>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="sector-footer">
        <p>Hazır kalıplar yerine, işletmenizin ihtiyaçlarına göre şekillenen sistemler.</p>
        <a className="text-link" href="#contact">
          İhtiyacınızı konuşalım <FiArrowUpRight aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
