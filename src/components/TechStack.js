import React from "react";
import Reveal from "./Reveal";
import Engineering from "./Engineering";
import SectorSolutions from "./SectorSolutions";

export default function TechStack() {
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
              <span className="section-index">04 /</span> TEKNOLOJİLER
            </div>
            <h2 id="tech-title">
              Görünenden <span>daha fazlasını</span>
              <br />
              inşa ediyoruz.
            </h2>
          </div>
          <p>
            Kullandığımız en güncel teknolojilerle,
            <br />
            işinizi bugün olduğu kadar geleceğe de taşıyoruz.
          </p>
        </Reveal>
        <Engineering />
        <SectorSolutions />
      </div>
    </section>
  );
}
