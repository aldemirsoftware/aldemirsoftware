import React from 'react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaSmile, FaUsers, FaClock } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  const stats = [
    { value: '500+', label: 'Projeler', icon: FaProjectDiagram },
    { value: '%98', label: 'Memnuniyet', icon: FaSmile },
    { value: '50+', label: 'Ekip', icon: FaUsers },
    { value: '10+', label: 'Yıl', icon: FaClock }
  ];

  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-text">{stat.label}</div>
            <div className="stat-glow"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
