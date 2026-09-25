import { useTranslation } from "../i18n/Language";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import Reveal from "./Reveal";
const emptyForm = { name: "", email: "", phone: "", message: "" };
export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const sending = useRef(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (status !== "sending") setStatus("idle");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_fflabgt",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_66bwfls",
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "Mb4U2Biz9r-h_aTMO",
      );
      setStatus("success");
      setFormData(emptyForm);
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  };
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-orbit" aria-hidden="true">
        <img
          src="/images/orbital-horizon.jpg"
          alt=""
          width="1672"
          height="941"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="container contact-layout">
        <Reveal className="contact-copy">
          <div className="eyebrow">
            <span className="section-index">05 /</span>{t(" BİRLİKTE BAŞLAYALIM")}</div>
          <h2 id="contact-title">{t("Projelerinizi birlikte")}<br />
            <span>{t("yörüngeye taşıyalım.")}</span>
          </h2>
          <p>{t("Web, mobil ve özel yazılım altyapılarıyla markanızı geleceğe taşıyoruz. Hedeflerinizi paylaşın; ilk adımı birlikte planlayalım.")}</p>
          <a className="contact-email" href="mailto:info@aldemirsoftware.com">
            info@aldemirsoftware.com <FiArrowUpRight aria-hidden="true" />
          </a>
          <div className="contact-details">
            <a href="tel:+905050784635">
              <FiPhone aria-hidden="true" /> +90 505 078 46 35
            </a>
            <span>
              <FiMapPin aria-hidden="true" />{t(" Uşak, Türkiye")}</span>
          </div>
          <div className="contact-socials">
            <a href="https://x.com/aldemirsoftware" target="_blank" rel="noopener noreferrer">X <FiArrowUpRight aria-hidden="true" /></a>
            <a
              href="https://www.linkedin.com/company/aldemi%CC%87rsoftware/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/aldemirsoftware"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <Reveal id="contact-form" tabIndex={-1} className="contact-form-wrapper glass-card">
          <div className="form-heading">
            <h3>{t("Projenizi anlatın.")}</h3>
            <FiMail aria-hidden="true" />
          </div>
          <p className="form-intro">{t("İhtiyacınızı paylaşın, birlikte değerlendirelim.")}</p>
          <form onSubmit={handleSubmit} aria-busy={status === "sending"}>
            <fieldset disabled={status === "sending"}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t("Adınız soyadınız ")}<span>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("Adınız ve soyadınız")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t("E-posta adresiniz ")}<span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("siz@sirketiniz.com")}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t("Telefon ")}<span className="optional">{t("(isteğe bağlı)")}</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+90 5__ ___ __ __"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t("Neler yapmak istiyorsunuz? ")}<span>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("Projeniz, hedefleriniz ve ihtiyaçlarınız…")}
                />
              </div>
              <p className="form-note">{t("Lütfen yalnızca projenizi değerlendirmemiz için gerekli bilgileri paylaşın.")}</p>
              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={status === "sending"}
              >
                {t(status === "sending" ? "Gönderiliyor…" : "Mesajınızı gönderin")}
                <FiArrowUpRight aria-hidden="true" />
              </button>
            </fieldset>
            <div className="form-feedback" role="status" aria-live="polite">
              {status === "success" && (
                <p className="feedback-success">
                  <FiCheckCircle aria-hidden="true" />{t(" Mesajınız iletildi. Sizinle iletişime geçeceğiz.")}</p>
              )}
              {status === "error" && (
                <p className="feedback-error">
                  <FiAlertCircle aria-hidden="true" />
                  <span>{t("Mesajınız gönderilemedi. Tekrar deneyebilir veya")}{t(" ")}
                    <a href="mailto:info@aldemirsoftware.com">{t("e-posta ile ulaşabilirsiniz.")}</a>
                  </span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
