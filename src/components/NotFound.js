import { useTranslation } from "../i18n/Language";
import React from "react";
import SpacePage from "./SpacePage";
export default function NotFound() {
  const { t } = useTranslation();
  return <SpacePage>
    <span className="eyebrow">{t("404 / SAYFA BULUNAMADI")}</span>
    <h1>{t("Rotanın biraz")}<br /><span>{t("dışına çıktık.")}</span></h1>
    <p>{t("Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Yeni bir başlangıç için ana sayfaya dönebilir, projeniz için bizimle iletişime geçebilirsiniz.")}</p>
  </SpacePage>;
}
