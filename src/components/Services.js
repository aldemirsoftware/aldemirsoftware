import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaCloud, FaChartLine } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: 'Yazılım Geliştirme',
      description: 'İşletmenize özel, yenilikçi yazılım çözümleri ile dijital dönüşümü hızlandırın',
      features: [
        'Kurumsal Web Uygulamaları',
        'Mobil Uygulama Geliştirme',
        'E-Ticaret ve B2B Platformları',
        'CRM & ERP Entegrasyon Sistemleri'
      ],
      icon: FaCode
    },
    {
      title: 'Teknoloji Danışmanlığı',
      description: 'Deneyimli ekibimizle teknoloji stratejinizi optimize edin ve rekabet avantajı elde edin',
      features: [
        'Dijital Dönüşüm Yol Haritası',
        'Teknoloji Altyapısı Planlaması',
        'Kurumsal Sistem Mimarisi',
        'Siber Güvenlik Danışmanlığı'
      ],
      icon: FaLaptopCode
    },
    {
      title: 'Bulut Çözümleri',
      description: 'Modern bulut teknolojileri ile esnek, güvenli ve ölçeklenebilir altyapılar kurun',
      features: [
        'AWS & Azure Bulut Mimarisi',
        'DevOps & CI/CD Pipeline',
        'Container Teknolojileri',
        'Mikroservis Dönüşümü'
      ],
      icon: FaCloud
    },
    {
      title: 'Dijital Pazarlama & Analitik',
      description: 'Veri odaklı pazarlama stratejileri ile markanızı büyütün ve hedef kitlenize ulaşın',
      features: [
        'Entegre Dijital Pazarlama',
        'Arama Motoru Optimizasyonu',
        'İleri Düzey Veri Analizi',
        'Sosyal Medya Stratejisi'
      ],
      icon: FaChartLine
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title gradient-text">HİZMETLERİMİZ</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="service-icon">
                <service.icon />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="feature-bullet">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="service-glow"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
