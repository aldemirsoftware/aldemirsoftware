import { useTranslation } from "../i18n/Language";
import React from "react";
import Brand, { TurkishFlag } from "./Brand";
import { FiArrowUpRight } from "react-icons/fi";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>{t("Dijitalde sınırları aşan çözümler.")}</p>
          </div>
          <div className="footer-nav">
            <div>
              <h3>{t("Keşfedin")}</h3>
              <a href="#services">{t("Uzmanlıklarımız")}</a>
              <a href="#projects">{t("İş Ortaklarımız")}</a>
              <a href="#tech">{t("Teknolojiler")}</a>
            </div>
            <div>
              <h3>Aldemir Software</h3>
              <a href="#about">{t("Hakkımızda")}</a>
              <a href="#contact">{t("İletişim")}</a>
              <a href="/sss">{t("S.S.S")}</a>
            </div>
            <div>
              <h3>{t("Sosyal Medya")}</h3>
              <a href="https://x.com/aldemirsoftware" target="_blank" rel="noopener noreferrer">X <FiArrowUpRight aria-hidden="true" /></a>
              <a href="https://instagram.com/aldemirsoftware" target="_blank" rel="noopener noreferrer">Instagram <FiArrowUpRight aria-hidden="true" /></a>
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
            <span>{t("Türkiye'de üretiyoruz.")}<br />
              <strong>{t("Geleceğe değer katıyoruz.")}</strong>
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{t(" Aldemir Software. Tüm hakları saklıdır.")}</p>
          <span>WEB · SOFTWARE · DIGITAL SYSTEMS</span>
        </div>
        <p className="footer-photo-credit">{t("Samanyolu fotoğrafı: ")}<a href="https://www.eso.org/public/images/eso0932a/" target="_blank" rel="noopener noreferrer">ESO/S. Brunier</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>{t(" · Kadraj ve renk uyarlaması.")}</p>
      </div>
    </footer>
  );
}
