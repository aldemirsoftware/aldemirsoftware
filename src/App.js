import React from "react";
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
import "./App.css";
import "./Space.css";
import "./components/HeroRefined.css";
import "./components/SolutionsShowcase.css";
import "./components/AboutCorporate.css";
function App() {
  const { scrollYProgress } = useScroll();
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <div className="App">
          <SEO />
          <a className="skip-link" href="#main-content">
            İçeriğe geç
          </a>
          <motion.div
            className="reading-progress"
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
          />
          <Navbar />
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
          <ScrollToTop />
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
}
export default App;
