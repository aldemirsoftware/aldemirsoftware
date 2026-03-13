import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const texts = useMemo(() => [
    "ile Web Sitenizi Hayata Geçirin",
    "ile Mobil Uygulamanızı Geliştirin",
    "ile E-Ticaret Çözümlerinizi Oluşturun",
    "ile Kurumsal Yazılımınızı İnşa Edin",
    "ile Dijital Dönüşümünüzü Gerçekleştirin",
    "ile Bulut Tabanlı Çözümler Edinin",
    "ile Modern Web Uygulamaları Yapın",
    "ile API ve Backend Sistemleri Geliştirin"
  ], []);

  const badgeTexts = useMemo(() => [
    "Profesyonel Yazılım Geliştirme",
    "Kurumsal Dijital Çözümler",
    "7+ Yıllık Sektör Deneyimi",
    "Uluslararası Standartlarda Hizmet",
    "Yenilikçi Teknoloji Çözümleri",
    "Müşteri Odaklı Yaklaşım"
  ], []);
  
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(true);

  // Badge rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeVisible(false);
      setTimeout(() => {
        setBadgeIndex((prev) => (prev + 1) % badgeTexts.length);
        setBadgeVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [badgeTexts.length]);

  // Start typing after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Typing and deleting animation
  useEffect(() => {
    if (!startTyping) return;

    const currentText = texts[textIndex];

    if (!isDeleting && currentIndex < currentText.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === currentText.length) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setCurrentIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [currentIndex, isDeleting, displayText, textIndex, texts, startTyping]);

  // Advanced Particle System - Synthwave Style
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 
          { r: 192, g: 192, b: 192 } : // Platinum
          { r: 45, g: 62, b: 111 }; // Dark Navy
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;

        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = (1000 - this.z) / 1000 * 4;
        const opacity = (1000 - this.z) / 1000;

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.8})`;
        ctx.fill();

        return { x, y, opacity };
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 31, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and connect particles
      const positions = [];
      particles.forEach(particle => {
        particle.update();
        const pos = particle.draw();
        positions.push(pos);
      });

      // Connect nearby particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(192, 192, 192, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: badgeVisible ? 1 : 0,
              scale: badgeVisible ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-pulse"></span>
            <span className="badge-text">{badgeTexts[badgeIndex]}</span>
          </motion.div>

          <div className="hero-title-container">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="glitch" data-text="ALDEMİR SOFTWARE">
                ALDEMİR SOFTWARE
              </span>
            </motion.h1>
            
            <motion.div
              className="hero-subtitle-dynamic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="gradient-text">{displayText}</span>
              <span className="cursor-blink">|</span>
            </motion.div>
          </div>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <button className="cta-button" onClick={() => {
              const isMobile = window.innerWidth <= 768;
              const target = isMobile ? document.querySelector('#contact-form') : document.querySelector('.contact');
              target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              <span className="btn-text">Proje Başlat</span>
              <span className="btn-icon">→</span>
              <div className="btn-glow"></div>
            </button>
          </motion.div>

          {/* Tech Indicators */}
          <motion.div 
            className="tech-indicators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="indicator">
              <div className="indicator-dot"></div>
              <span>Yazılım</span>
            </div>
            <div className="indicator">
              <div className="indicator-dot"></div>
              <span>Teknoloji</span>
            </div>
            <div className="indicator">
              <div className="indicator-dot"></div>
              <span>Danışmanlık</span>
            </div>
            <div className="indicator">
              <div className="indicator-dot"></div>
              <span>Pazarlama</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
