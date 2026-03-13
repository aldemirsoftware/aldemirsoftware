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
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [showGameIcon, setShowGameIcon] = useState(false);
  const gameLoopRef = useRef(null);

  // Snake Game Logic
  useEffect(() => {
    if (!showGame || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = [...newSnake[0]];

        // Move head based on direction
        switch (direction) {
          case 'UP': head[1] -= 1; break;
          case 'DOWN': head[1] += 1; break;
          case 'LEFT': head[0] -= 1; break;
          case 'RIGHT': head[0] += 1; break;
          default: break;
        }

        // Check wall collision
        if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head[0] === food[0] && head[1] === food[1]) {
          setGameScore(prev => prev + 10);
          setFood([
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20)
          ]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [showGame, direction, food, gameOver]);

  // Handle keyboard input for Snake
  useEffect(() => {
    if (!showGame) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGame]);

  // Reset game when modal opens
  useEffect(() => {
    if (showGame) {
      setSnake([[10, 10]]);
      setFood([15, 15]);
      setDirection('RIGHT');
      setGameScore(0);
      setGameOver(false);
    }
  }, [showGame]);

  // Disable scroll when modal is open
  useEffect(() => {
    if (showGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGame]);

  // Show game icon after 15 seconds (mobile only)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        setShowGameIcon(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

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
      
      {/* Futuristic Scanline Effect */}
      <div className="scanline"></div>
      
      {/* Modern Turkish Flag Animation */}
      <motion.div 
        className="turkish-flag-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <svg className="turkish-flag" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
          {/* Flag background with subtle gradient */}
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E30A17" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C70014" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Red background */}
          <rect width="240" height="160" fill="url(#redGradient)" className="flag-background"/>
          
          {/* White crescent */}
          <g className="flag-crescent">
            <circle cx="85" cy="80" r="38" fill="#ffffff" filter="url(#glow)"/>
            <circle cx="95" cy="80" r="30" fill="url(#redGradient)"/>
          </g>
          
          {/* White star */}
          <g className="flag-star" transform="translate(130, 80)">
            <path 
              d="M 0,-30 L 7,-10 L 28,-10 L 11,2 L 18,22 L 0,10 L -18,22 L -11,2 L -28,-10 L -7,-10 Z"
              fill="#ffffff"
              filter="url(#glow)"
            />
          </g>
        </svg>
        
        {/* Made in Turkey Badge */}
        <motion.div 
          className="turkey-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="badge-flag">🇹🇷</span>
          <span className="badge-label">Made in Turkey</span>
        </motion.div>
      </motion.div>
      
      <div className="hero-container">
        <div className="hero-content hero-content-reveal">
          <motion.div 
            className="hero-badge"
            animate={{ 
              opacity: badgeVisible ? 1 : 0,
              scale: badgeVisible ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-pulse"></span>
            <span className="badge-text">{badgeTexts[badgeIndex]}</span>
          </motion.div>

          {/* Hidden Game Icon - Only on Mobile after 15 seconds */}
          {showGameIcon && (
            <motion.div
              className="game-icon-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="game-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Snake oyununa şimdi başlayabilirsin
              </motion.div>
              <motion.div
                className="game-icon-trigger"
                onClick={() => setShowGame(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="game-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9C4 7.34315 5.34315 6 7 6H17C18.6569 6 20 7.34315 20 9V14C20 15.6569 18.6569 17 17 17H7C5.34315 17 4 15.6569 4 14V9Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 11H9M8 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="15.5" cy="10.5" r="0.75" fill="currentColor"/>
                  <circle cx="17" cy="12" r="0.75" fill="currentColor"/>
                  <circle cx="14" cy="12" r="0.75" fill="currentColor"/>
                  <circle cx="15.5" cy="13.5" r="0.75" fill="currentColor"/>
                  <path d="M7 17L5.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M17 17L18.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}

          <div className="hero-title-container">
            <h1 className="hero-title">
              <span className="glitch" data-text="ALDEMİR SOFTWARE">
                ALDEMİR SOFTWARE
              </span>
            </h1>
            
            <div className="hero-subtitle-dynamic">
              <span className="gradient-text">{displayText}</span>
              <span className="cursor-blink">|</span>
            </div>
          </div>

          <p className="hero-subtitle">
          </p>

          <div className="hero-buttons">
            <button className="cta-button" onClick={() => {
              const isMobile = window.innerWidth <= 768;
              const contactForm = document.querySelector('.contact-form-wrapper');
              const contactSection = document.querySelector('.contact');
              
              if (isMobile && contactForm) {
                // Mobilde formu ekranın tam ortasına getir
                const formTop = contactForm.getBoundingClientRect().top + window.pageYOffset;
                const formHeight = contactForm.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollTo = formTop - (windowHeight / 2) + (formHeight / 2);
                
                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
              } else if (contactSection) {
                // Desktop'ta section'ı ortala
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}>
              <span className="btn-text">Proje Başlat</span>
              <span className="btn-icon">→</span>
              <div className="btn-glow"></div>
            </button>
          </div>

          {/* Tech Indicators */}
          <div className="tech-indicators">
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
          </div>
        </div>
      </div>

      {/* Easter Egg Game Modal - Snake Game */}
      {showGame && (
        <motion.div 
          className="game-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowGame(false)}
        >
          <motion.div 
            className="game-container"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="game-close" onClick={() => setShowGame(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3>Snake Oyunu</h3>
            <p>{gameOver ? 'Oyun Bitti!' : 'Ok tuşları ile yönlendir'}</p>
            <div className="game-score">Skor: {gameScore}</div>
            
            {/* Snake Game Board */}
            <div className="snake-board">
              {Array.from({ length: 20 }).map((_, row) => (
                <div key={row} className="snake-row">
                  {Array.from({ length: 20 }).map((_, col) => {
                    const isSnake = snake.some(segment => segment[0] === col && segment[1] === row);
                    const isHead = snake[0] && snake[0][0] === col && snake[0][1] === row;
                    const isFood = food[0] === col && food[1] === row;
                    
                    return (
                      <div
                        key={`${row}-${col}`}
                        className={`snake-cell ${isSnake ? (isHead ? 'snake-head' : 'snake-body') : ''} ${isFood ? 'snake-food' : ''}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="snake-controls-wrapper">
              <button className="control-left" onClick={() => setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev)}>←</button>
              
              <div className="snake-controls-center">
                <div className="control-row">
                  <button onClick={() => setDirection(prev => prev !== 'DOWN' ? 'UP' : prev)}>↑</button>
                </div>
                <div className="control-row">
                  <button onClick={() => setDirection(prev => prev !== 'UP' ? 'DOWN' : prev)}>↓</button>
                </div>
              </div>
              
              <button className="control-right" onClick={() => setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev)}>→</button>
            </div>

            {gameOver && (
              <button className="game-reset" onClick={() => {
                setSnake([[10, 10]]);
                setFood([15, 15]);
                setDirection('RIGHT');
                setGameScore(0);
                setGameOver(false);
              }}>Tekrar Oyna</button>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
