import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo-nonbck.png" alt="Aldemir Software Logo" width="40" height="40" />
              <span>ALDEMİR <span className="text-neon">SOFTWARE</span></span>
            </div>
            <p className="footer-tagline">
              Geleceklere İz Bırakan Teknoloji Çözümleri
            </p>
            <div className="footer-address">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Uşak, Türkiye</span>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Hizmetler</h4>
              <ul>
                <li><a href="#services">Yazılım Geliştirme</a></li>
                <li><a href="#services">Bulut Çözümleri</a></li>
                <li><a href="#services">Teknoloji Danışmanlığı</a></li>
                <li><a href="#services">Dijital Pazarlama</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Kurumsal</h4>
              <ul>
                <li><a href="#about">Hakkımızda</a></li>
                <li><a href="#projects">Projelerimiz</a></li>
                <li><a href="#tech">Teknolojiler</a></li>
                <li><a href="#contact">İletişim</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>İletişim</h4>
              <ul>
                <li><a href="mailto:ademaldemirx@icloud.com">ademaldemirx@icloud.com</a></li>
                <li><a href="tel:+905050784635">+90 505 078 46 35</a></li>
                <li><a href="https://www.linkedin.com/company/aldemi%CC%87rsoftware/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://instagram.com/aldemirsoft" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Aldemir Software. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
