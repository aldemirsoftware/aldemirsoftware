import React, { useEffect } from "react";
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
import "./App.css";
import "./Space.css";
import "./components/HeroRefined.css";
import "./components/SolutionsShowcase.css";
import "./components/AboutCorporate.css";
import "./components/EngineeringInteractive.css";
import "./components/FuturisticCursor.css";
function App() {
  const { scrollYProgress } = useScroll();
  const faqPage = ["/sss", "/sss/", "/sss.html"].includes(window.location.pathname);
  const notFound = (!faqPage && !["/", "/index.html"].includes(window.location.pathname)) || document.documentElement.dataset.page === "404";
  useEffect(() => {
    if (notFound || faqPage) return;
    const navigateToHash = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
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
  }, [notFound, faqPage]);
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <div className="App" onDragStartCapture={(event) => {
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
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
}
export default App;
