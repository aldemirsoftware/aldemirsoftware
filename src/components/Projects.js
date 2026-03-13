import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTasks, FaChartBar, FaRobot, FaWifi, FaCut } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'E-Ticaret Platformu',
      category: 'Web Development',
      description: 'Büyük ölçekli e-ticaret çözümü',
      tech: ['React', 'Node.js', 'MongoDB'],
      icon: FaShoppingCart
    },
    {
      title: 'İnşaat Proje Takip Sistemi',
      category: 'Web Application',
      description: 'Mimar ve inşaat mühendislerinin müşteri projelerini ve tüm proje detaylarını gerçek zamanlı takip etmesini sağlayan entegre yönetim platformu',
      tech: ['Angular', 'TypeScript', 'PostgreSQL'],
      icon: FaTasks
    },
    {
      title: 'CRM Sistemi',
      category: 'Enterprise',
      description: 'Müşteri ilişkileri yönetimi platformu',
      tech: ['Vue.js', 'Laravel', 'MySQL'],
      icon: FaChartBar
    },
    {
      title: 'AI Chatbot',
      category: 'AI & ML',
      description: 'Yapay zeka destekli müşteri destek botu',
      tech: ['Python', 'TensorFlow', 'NLP'],
      icon: FaRobot
    },
    {
      title: 'IoT Dashboard',
      category: 'IoT',
      description: 'Gerçek zamanlı IoT veri görselleştirme',
      tech: ['Angular', 'WebSocket', 'D3.js'],
      icon: FaWifi
    },
    {
      title: 'Kuaför Sadakat Sistemi',
      category: 'Web Application',
      description: 'Kuaförlerin müşterilerine özel kart ile puan toplama ve hizmet takip sistemi',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      icon: FaCut
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="gradient-text">PROJELER</h2>
          <p className="projects-subtitle">Başarıyla tamamladığımız projelerden örnekler</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-icon">
                <project.icon />
              </div>
              <div className="project-category">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-overlay"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
