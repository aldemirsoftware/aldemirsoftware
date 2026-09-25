import { useTranslation } from "../i18n/Language";
import React from "react";
import SpacePage from "./SpacePage";
import FAQ from "./FAQ";
export default function FAQPage() {
  const { t } = useTranslation();
  return <SpacePage className="faq-page">
    <span className="eyebrow">{t("ALDEMİR SOFTWARE / S.S.S")}</span>
    <h1>{t("Sıkça sorulan")}<br /><span>{t("sorular.")}</span></h1>
    <p>{t("Hizmetlerimiz ve birlikte çalışma sürecimiz hakkında merak ettikleriniz.")}</p>
    <FAQ />
  </SpacePage>;
}
