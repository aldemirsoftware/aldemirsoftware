import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <SEO />
        <Navbar />
        <main role="main">
          <Hero />
          <About />
          <Services />
          <Projects />
          <TechStack />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </HelmetProvider>
  );
}

export default App;
