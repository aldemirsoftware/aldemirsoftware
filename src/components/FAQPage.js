import React from "react";
import SpacePage from "./SpacePage";
import FAQ from "./FAQ";
export default function FAQPage() {
  return <SpacePage className="faq-page">
    <span className="eyebrow">ALDEMİR SOFTWARE / S.S.S</span>
    <h1>Sıkça sorulan<br /><span>sorular.</span></h1>
    <p>Hizmetlerimiz ve birlikte çalışma sürecimiz hakkında merak ettikleriniz.</p>
    <FAQ />
  </SpacePage>;
}
