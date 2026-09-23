import React from "react";
import {
  FiGlobe,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiBarChart2,
  FiCompass,
  FiArrowUpRight,
} from "react-icons/fi";
import Reveal from "./Reveal";

const services = [
  {
    id: "web",
    icon: FiGlobe,
    word: "WEB",
    title: "Markanıza güç katan web çözümleri",
    description:
      "Kurumsal web siteleri, e-ticaret deneyimleri ve SEO uyumlu arayüzlerle markanız için güçlü bir dijital vitrin.",
    items: [
      "Kurumsal web & landing page",
      "E-ticaret & özel web uygulamaları",
      "Mobil uyumlu, erişilebilir arayüzler",
    ],
  },
  {
    id: "software",
    icon: FiCode,
    word: "SOFTWARE",
    title: "İşinizi yöneten akıllı sistemler",
    description:
      "Yönetim paneli, otomasyon ve özel yazılım çözümleriyle süreçlerinizi tek merkezden güçlendiriyoruz.",
    items: [
      "Özel yönetim panelleri",
      "CRM, ERP & sistem entegrasyonları",
      "İş akışı & süreç otomasyonu",
    ],
  },
  {
    id: "mobile",
    icon: FiSmartphone,
    word: "MOBILE",
    title: "Markanızı cebe taşıyan uygulamalar",
    description:
      "iOS ve Android çözümleriyle kullanıcı deneyimini hız, sadelik ve erişilebilirlikle buluşturuyoruz.",
    items: [
      "iOS & Android uygulamaları",
      "Bildirim & kullanıcı deneyimi",
      "Ölçeklenebilir mobil altyapı",
    ],
  },
  {
    id: "cloud",
    icon: FiCloud,
    word: "CLOUD",
    title: "Bugünden yarına hazır olun",
    description:
      "Bulut sistemleri, güvenlik odaklı altyapı ve veri yönetimiyle dijital dönüşümünüze sağlam bir temel kuruyoruz.",
    items: [
      "AWS, Azure & bulut sistemleri",
      "DevOps, CI/CD & izleme",
      "Yedekleme & süreklilik planlaması",
    ],
  },
  {
    id: "data",
    icon: FiBarChart2,
    word: "DATA",
    title: "Kararlarınızı güçlendiren veri",
    description:
      "Anlık analiz, özel raporlar ve veri odaklı panellerle süreçlerinizi görünür, ölçülebilir ve yönetilebilir hâle getiriyoruz.",
    items: [
      "Canlı raporlama & özel dashboard",
      "Analitik izleme",
      "Veri görselleştirme",
    ],
  },
  {
    id: "strategy",
    icon: FiCompass,
    word: "STRATEGY",
    title: "Görünürlüğün arkasındaki strateji",
    description:
      "Teknik altyapı, içerik ve doğru hamlelerle markanızı arama sonuçlarında güçlendiriyoruz.",
    items: [
      "Teknoloji & dijital dönüşüm danışmanlığı",
      "Teknik SEO & performans optimizasyonu",
      "Dijital pazarlama & sosyal medya",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section services orbital-services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-index">01 /</span> ÇÖZÜM EVRENİMİZ
            </div>
            <h2 id="services-title">
              Fikrinizi yörüngeye
              <br />
              <span>taşıyan altyapı.</span>
            </h2>
          </div>
          <p>
            Web, mobil uygulama ve yönetim paneli çözümlerini markanıza özel
            tasarlıyor; güçlü sistemlerle büyümenize ivme kazandırıyoruz.
          </p>
        </Reveal>
        <div className="solutions-grid">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 3) * 0.06}
              className="solution-reveal"
            >
              <article
                className={`solution-card glass-card solution-${service.id}`}
                id={`solution-${service.id}`}
              >
                <div className="solution-art" aria-hidden="true">
                  <img
                    src={`/images/${service.id}.jpg`}
                    alt=""
                    width="1122"
                    height="1402"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="solution-body">
                  <div className="solution-category">
                    <service.icon aria-hidden="true" />
                    <span>{service.word}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="service-link"
                    aria-label={`${service.title} hakkında görüşelim`}
                  >
                    Projenizi konuşalım <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
