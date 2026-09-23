import React from "react";
import Brand, { TurkishFlag } from "./Brand";
import { FiArrowUpRight } from "react-icons/fi";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>Dijitalde sınırları aşan çözümler.</p>
          </div>
          <div className="footer-nav">
            <div>
              <h3>Keşfedin</h3>
              <a href="#services">Uzmanlıklarımız</a>
              <a href="#projects">İş Ortaklarımız</a>
              <a href="#tech">Teknolojiler</a>
            </div>
            <div>
              <h3>Aldemir Software</h3>
              <a href="#about">Hakkımızda</a>
              <a href="#contact">İletişim</a>
              <a
                href="https://www.linkedin.com/company/aldemi%CC%87rsoftware/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-origin">
            <TurkishFlag />
            <span>
              Türkiye'de üretiyoruz.
              <br />
              <strong>Geleceğe değer katıyoruz.</strong>
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Aldemir Software. Tüm hakları saklıdır.
          </p>
          <span>WEB · SOFTWARE · DIGITAL SYSTEMS</span>
        </div>
      </div>
    </footer>
  );
}
