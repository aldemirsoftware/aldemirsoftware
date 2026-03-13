import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="gradient-text">İLETİŞİM</h2>
          <p className="contact-subtitle">Projeleriniz için bizimle iletişime geçin</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <div className="info-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    stroke="url(#gradient1)" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="gradient1">
                      <stop offset="0%" stopColor="#e0e0e0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="info-details">
                <h4>Telefon</h4>
                <a href="tel:+905050784635">+90 505 078 46 35</a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient2">
                      <stop offset="0%" stopColor="#e0e0e0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="info-details">
                <h4>Email</h4>
                <a href="mailto:ademaldemir@icloud.com">ademaldemir@icloud.com</a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" 
                    stroke="url(#gradient3)" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" 
                    stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient3">
                      <stop offset="0%" stopColor="#e0e0e0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="info-details">
                <h4>Instagram</h4>
                <a href="https://instagram.com/aldemirsoft" target="_blank" rel="noopener noreferrer">@aldemirsoft</a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" 
                    stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="9" width="4" height="12" 
                    stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" 
                    stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient4">
                      <stop offset="0%" stopColor="#e0e0e0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="info-details">
                <h4>LinkedIn - Şirket Sayfamız</h4>
                <a href="https://www.linkedin.com/company/aldemi%CC%87rsoftware/" target="_blank" rel="noopener noreferrer">Aldemir Software</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Adınız</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Adınızı girin"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Projeniz hakkında bize bilgi verin..."
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Mesaj Gönder</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
