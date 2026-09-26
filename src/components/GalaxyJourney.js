import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import "./GalaxyJourney.css";
import useLightweightScene from "../hooks/useLightweightScene";

const stars = Array.from({ length: 90 }, (_, i) => ({
  x: ((i * 73.137 + 19) % 100).toFixed(2),
  y: ((i * 47.713 + 7) % 100).toFixed(2),
  size: i % 13 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
}));

export default function GalaxyJourney() {
  const lightweight = useLightweightScene();
  const scene = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame;
    const update = () => {
      frame = null;
      if (!scene.current) return;
      const hero = document.querySelector(".orbital-hero");
      const start = hero?.offsetHeight || window.innerHeight;
      const distance = Math.max(0, window.scrollY - start * .45);
      const progress = Math.min(1, distance / Math.max(1, document.documentElement.scrollHeight - window.innerHeight - start * .45));
      const mobile = lightweight;
      const stage = progress;
      const oceanRect = document.querySelector(".engineering-story")?.getBoundingClientRect();
      const ocean = oceanRect ? Math.max(0, Math.min(1, (window.innerHeight - oceanRect.top) / (window.innerHeight * .65), oceanRect.bottom / (window.innerHeight * .65))) : 0;
      const weight = (center, spread) => Math.max(0, 1 - Math.abs(stage - center) / spread);
      scene.current.style.setProperty("--ocean", String(ocean));
      scene.current.style.setProperty("--sun", String(weight(.18, .22) * (1 - ocean)));
      scene.current.style.setProperty("--saturn", String(weight(.52, .26) * (1 - ocean)));
      scene.current.style.setProperty("--earth", String(weight(.86, .3) * (1 - ocean)));
      scene.current.style.setProperty("--planet-drift", reduced ? "0px" : `${(stage - .5) * -180}px`);
      scene.current.style.setProperty("--journey-opacity", String(Math.min(1, distance / (start * .55))));
      scene.current.style.setProperty("--journey-scale", reduced ? "1" : String(1 + progress * (mobile ? .04 : .12)));
      scene.current.style.setProperty("--journey-x", reduced ? "0px" : `${Math.sin(progress * Math.PI * 1.5) * (mobile ? 25 : 100)}px`);
      scene.current.style.setProperty("--journey-y", reduced ? "0px" : `${-progress * (mobile ? 70 : 160)}px`);
      scene.current.style.setProperty("--star-shift", reduced ? "0px" : `${-progress * 240}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const visibility = () => { scene.current?.setAttribute("data-paused", String(document.hidden)); };
    update();
    visibility();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", visibility);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); document.removeEventListener("visibilitychange", visibility); };
  }, [reduced, lightweight]);
  return <div ref={scene} className="galaxy-journey" aria-hidden="true">
    <div className="journey-milkyway" style={{ backgroundImage: `url(/images/space/${lightweight ? "milky-way-mobile.jpg" : "milky-way-eso.jpg"})` }} />
    <div className="journey-nebula" />
    <div className="journey-stars">{(lightweight ? stars.slice(0, 24) : stars).map((star, i) => <i key={i} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: `${-(i % 9)}s`, animationDuration: `${5 + i % 7}s` }} />)}</div>
    <div className="journey-dust" />
    <div className="journey-solar"><div className="journey-sun" /><div className="journey-mars" /></div>
    <div className="journey-saturn"><div className="journey-rings" /><div className="journey-gas-planet" /></div>
    <div className="journey-earth" style={{ backgroundImage: "url(/images/space/earth-day.jpg)" }} />
    <div className="journey-burst" />
    <div className="journey-meteor journey-meteor-second" />
    <div className="journey-ocean"><div className="journey-water-rays" /><div className="journey-water-surface" /></div>
    <div className="journey-meteor" />
    <div className="journey-vignette" />
  </div>;
}
