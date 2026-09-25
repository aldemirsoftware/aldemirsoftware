import { useTranslation } from "../i18n/Language";
import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import OrbitalScene from "./OrbitalScene";
import "./NotFound.css";

export default function SpacePage({ children, className = "" }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(!document.hidden);
  useEffect(() => {
    const update = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return <main id="main-content" className={`not-found hero-refined ${className}`} tabIndex={-1}>
    <LanguageSwitcher />
    <OrbitalScene reduced={reduced} active={active} />
    <div className="orbital-shade" aria-hidden="true" />
    <a className="not-found-brand" href="/" aria-label={t("Aldemir Software ana sayfa")}><img src="/logo-nonbck.png" alt="" width="48" height="48" /> ALDEMİR SOFTWARE</a>
    <div className="container not-found-copy">
      {children}
      <div className="hero-actions"><a className="button button-primary" href="/">{t("Ana sayfaya dön ↗")}</a><a className="button" href="/#contact-form">{t("Bize ulaşın")}</a></div>
    </div>
  </main>;
}
