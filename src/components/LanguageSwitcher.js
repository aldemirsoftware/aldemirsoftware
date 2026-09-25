import React from "react";
import { TurkishFlag } from "./Brand";
import { useTranslation } from "../i18n/Language";
import "./LanguageSwitcher.css";

function BritishFlag() {
  return <svg className="british-flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="60" height="40" rx="3" fill="#012169" />
    <svg width="60" height="40" viewBox="0 0 60 30" preserveAspectRatio="none">
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 30 15M60 30 30 15M60 0 30 15M0 30 30 15" stroke="#c8102e" strokeWidth="2" />
      <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V30M0 15H60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  </svg>;
}
export default function LanguageSwitcher() {
  const { t, language, setLanguage } = useTranslation();
  return <div className="language-switcher" role="group" aria-label={t("Dil seçimi")}>
    <button type="button" lang="tr" aria-label="Türkçe" title="Türkçe" aria-pressed={language === "tr"} onClick={() => setLanguage("tr")}><TurkishFlag /></button>
    <button type="button" lang="en" aria-label="English" title="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}><BritishFlag /></button>
    <button type="button" lang="de" aria-label="Deutsch" title="Deutsch" aria-pressed={language === "de"} onClick={() => setLanguage("de")}>
      <svg className="german-flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
        <path fill="#151515" d="M0 0h60v14H0z" />
        <path fill="#d00" d="M0 13.33h60v13.34H0z" />
        <path fill="#ffce00" d="M0 26.66h60V40H0z" />
      </svg>
    </button>
  </div>;
}
