import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig, motion, useScroll } from "framer-motion";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Services from "./components/Services";
import Vision from "./components/Vision";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound";
import FAQPage from "./components/FAQPage";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import "./Space.css";
import "./components/HeroRefined.css";
import "./components/SolutionsShowcase.css";
import "./components/AboutCorporate.css";
import "./components/EngineeringInteractive.css";
import "./components/FuturisticCursor.css";
function App() {
  const { scrollYProgress } = useScroll();
  const [navigation, setNavigation] = useState(0);
  useEffect(() => {
    const update = () => setNavigation(value => value + 1);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  const faqPage = ["/sss", "/sss/", "/sss.html"].includes(window.location.pathname);
  const notFound = !faqPage && !["/", "/index.html"].includes(window.location.pathname);
  useEffect(() => {
    const navigateToHash = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) { if (navigation) window.scrollTo({ top: 0, behavior: "instant" }); return; }
      target.scrollIntoView({ block: "start", behavior: "instant" });
      if (id === "contact-form") target.focus({ preventScroll: true });
    };
    const frame = requestAnimationFrame(navigateToHash);
    window.addEventListener("load", navigateToHash, { once: true });
    window.addEventListener("hashchange", navigateToHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", navigateToHash);
      window.removeEventListener("hashchange", navigateToHash);
    };
  }, [notFound, faqPage, navigation]);
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <div className="App" onClickCapture={(event) => {
          const link = event.target.closest?.("a[href]");
          if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute("download")) return;
          const url = new URL(link.href, window.location.href);
          if (url.origin !== window.location.origin || url.pathname === window.location.pathname || /\.[a-z0-9]+$/i.test(url.pathname)) return;
          event.preventDefault();
          window.history.pushState({}, "", url.pathname + url.search + url.hash);
          setNavigation(value => value + 1);
        }} onDragStartCapture={(event) => {
          if (event.target.closest?.("img, svg, picture, a:has(img), a:has(svg)")) {
            event.preventDefault();
          }
        }}>
          <SEO notFound={notFound} faqPage={faqPage} />
          <a className="skip-link" href="#main-content">
            İçeriğe geç
          </a>
          <motion.div
            className="reading-progress"
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
          />
          {notFound ? <NotFound /> : faqPage ? <FAQPage /> : <><Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Services />
            <Vision />
            <Projects />
            <About />
            <TechStack />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop /></>}
          <MusicPlayer />
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
}
export default App;
