import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title gradient-text">BİZ KİMİZ?</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img src="/logo-nonbck.png" alt="Aldemir Software Logo" className="about-logo" />
            </div>
            <div className="company-name">
              <h3>ALDEMİR SOFTWARE</h3>
              <p>Yazılım · Teknoloji · Danışmanlık · Pazarlama</p>
            </div>
          </motion.div>

          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-block">
              <p className="highlight-text">
                7 yıldır, küresel liderlere ve sektörün öncü kurumlarına stratejik dijital dönüşüm ve inovasyon danışmanlığı sağlıyoruz.
              </p>
            </div>

            <div className="text-block">
              <p>
                Güncel teknolojiler ve sektör bilgi birikimimizle, müşterilerimizin rekabet gücünü artıran sürdürülebilir çözümler sunuyoruz.
              </p>
            </div>

            <div className="text-block">
              <p>
                Vizyonumuz, ortaklarımızın geleceğe güçlü adımlarla ilerlemesini sağlamaktır.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
