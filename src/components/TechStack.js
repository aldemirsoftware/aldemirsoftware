import { useTranslation } from "../i18n/Language";
import React from "react";
import Reveal from "./Reveal";
import Engineering from "./Engineering";
import SectorSolutions from "./SectorSolutions";

export default function TechStack() {
  const { t } = useTranslation();
  return (
    <section
      className="section tech-section"
      id="tech"
      aria-labelledby="tech-title"
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-index">04 /</span>{t(" TEKNOLOJİLER")}</div>
            <h2 id="tech-title">{t("Görünenden ")}<span>{t("daha fazlasını")}</span>
              <br />{t("inşa ediyoruz.")}</h2>
          </div>
          <p>{t("Kullandığımız en güncel teknolojilerle,")}<br />{t("işinizi bugün olduğu kadar geleceğe de taşıyoruz.")}</p>
        </Reveal>
        <Engineering />
        <SectorSolutions />
      </div>
    </section>
  );
}
