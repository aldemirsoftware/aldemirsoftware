import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaDatabase, FaAngular, FaJava, FaVuejs } from 'react-icons/fa';
import { SiTypescript, SiKubernetes, SiSpring, SiFlutter, SiMongodb } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import './TechStack.css';

const TechStack = () => {
  const technologies = [
    // Frontend Frameworks
    {
      name: 'React',
      icon: FaReact,
      description: 'Modern UI Geliştirme',
    },
    {
      name: 'Angular',
      icon: FaAngular,
      description: 'Frontend Framework',
    },
    {
      name: 'Vue.js',
      icon: FaVuejs,
      description: 'Progressive Framework',
    },
    {
      name: 'TypeScript',
      icon: SiTypescript,
      description: 'Tip Güvenli Geliştirme',
    },
    // Mobile Development
    {
      name: 'React Native',
      icon: TbBrandReactNative,
      description: 'Mobil Uygulama Geliştirme',
    },
    {
      name: 'Flutter',
      icon: SiFlutter,
      description: 'Cross-Platform Mobil',
    },
    // Backend & Enterprise
    {
      name: 'Node.js',
      icon: FaNodeJs,
      description: 'Backend Çözümleri',
    },
    {
      name: 'Java',
      icon: FaJava,
      description: 'Kurumsal Uygulamalar',
    },
    {
      name: 'Spring',
      icon: SiSpring,
      description: 'Java Framework',
    },
    {
      name: 'Python',
      icon: FaPython,
      description: 'Yapay Zeka & Veri Bilimi',
    },
    // Databases
    {
      name: 'MongoDB',
      icon: SiMongodb,
      description: 'NoSQL Veritabanı',
    },
    {
      name: 'Databases',
      icon: FaDatabase,
      description: 'Veri Yönetimi',
    },
    // DevOps & Cloud
    {
      name: 'Docker',
      icon: FaDocker,
      description: 'Containerization',
    },
    {
      name: 'Kubernetes',
      icon: SiKubernetes,
      description: 'Container Orchestration',
    },
    {
      name: 'AWS',
      icon: FaAws,
      description: 'Bulut Altyapısı',
    }
  ];

  return (
    <section className="tech-stack" id="tech">
      <div className="tech-container">
        <motion.div 
          className="tech-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title gradient-text">TEKNOLOJİLER</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Modern teknolojilerle güçlü çözümler</p>
        </motion.div>

        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="tech-card-inner">
                <div className="tech-icon">
                  <tech.icon />
                </div>
                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-description">{tech.description}</p>
                <div className="tech-glow"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
