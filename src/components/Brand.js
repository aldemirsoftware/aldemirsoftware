import { useTranslation } from "../i18n/Language";
import React from "react";

export function TurkishFlag({ className = "" }) {
  const { t } = useTranslation();
  return (
    <svg
      className={`turkish-flag ${className}`}
      viewBox="0 0 60 40"
      role="img"
      aria-label={t("Türk bayrağı")}
    >
      <rect width="60" height="40" rx="3" fill="#e30a17" />
      <circle cx="22" cy="20" r="10" fill="white" />
      <circle cx="24.5" cy="20" r="8" fill="#e30a17" />
      <path d="m30 20 9.05-2.94-5.59 7.69v-9.5l5.59 7.69Z" fill="white" />
    </svg>
  );
}

export default function Brand() {
  const { t } = useTranslation();
  return (
    <a className="brand" href="#home" aria-label={t("Aldemir Software ana sayfa")}>
      <img src="/logo-nonbck.png" alt="" width="46" height="46" />
      <span>
        <span className="brand-name">ALDEMİR</span>
        <span className="brand-sub">SOFTWARE</span>
      </span>
    </a>
  );
}
