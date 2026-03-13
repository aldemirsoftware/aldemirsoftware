import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
        >
          <div className="logo-icon">
            <img src="/logo-nonbck.png" alt="Aldemir Software Logo" width="32" height="32" />
          </div>
          <span className="logo-text"><span className="glow-text">ALDEMİR</span> SOFTWARE</span>
        </motion.div>
        
        <div className="navbar-links">
          <a href="#about" className="nav-link">
            Hakkımızda
          </a>
          <a href="#tech" className="nav-link">
            Teknoloji
          </a>
          <a href="#services" className="nav-link">
            Hizmetler
          </a>
          <a href="#projects" className="nav-link">
            Projeler
          </a>
          <a href="#contact" className="nav-link">
            İletişim
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
