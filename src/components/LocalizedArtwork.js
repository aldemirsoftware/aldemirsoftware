import React from "react";
import { useTranslation } from "../i18n/Language";
import "./EnglishArtwork.css";

export default function LocalizedArtwork({ title, description, items = [], Icon }) {
  const { t } = useTranslation();
  return <div className="english-artwork" style={{ backgroundImage: "linear-gradient(180deg, #02091430, #02091488 60%, #020914), url('/images/orbital-background.jpg')" }}>
    <div className="english-artwork-brand"><img src="/logo-nonbck.png" alt="" width="72" height="72" /><span>ALDEMİR<small>SOFTWARE</small></span></div>
    <span className="english-artwork-kicker">{t("ENGINEERED FOR YOUR FUTURE")}</span>
    <strong className="english-artwork-title">{t(title)}</strong>
    <div className="english-artwork-orbit" aria-hidden="true"><span /><span />{Icon && <Icon />}</div>
    <p>{t(description)}</p>
    {items.length > 0 && <ul>{items.map(item => <li key={item}>{t(item)}</li>)}</ul>}
    <span className="english-artwork-footer">aldemirsoftware.com</span>
  </div>;
}
