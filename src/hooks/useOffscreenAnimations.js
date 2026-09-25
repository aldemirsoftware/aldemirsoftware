import { useEffect } from "react";

export default function useOffscreenAnimations(route) {
  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;
    const sections = [...document.querySelectorAll("main > section, .engineering-story, .sector-solutions")];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.dataset.sceneVisible = String(entry.isIntersecting);
      });
    }, { rootMargin: "150px" });
    sections.forEach(section => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach(section => delete section.dataset.sceneVisible);
    };
  }, [route]);
}
