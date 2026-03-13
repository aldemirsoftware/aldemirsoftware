import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    // EmailJS configuration
    const serviceID = 'service_fflabgt';
    const templateID = 'template_66bwfls';
    const publicKey = 'Mb4U2Biz9r-h_aTMO';

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Modal will stay open until user closes it
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setSubmitStatus('error');
        
        // Reset to idle after 3 seconds for error
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      });
  };

  // Button configurations based on status
  const getButtonConfig = () => {
    switch(submitStatus) {
      case 'sending':
        return {
          text: 'Gönderiliyor...',
          bg: 'linear-gradient(135deg, rgba(192, 192, 192, 0.3), rgba(169, 169, 169, 0.4))',
          border: 'rgba(192, 192, 192, 0.6)',
          disabled: true
        };
      case 'success':
        return {
          text: 'Gönderildi ✓',
          bg: 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.4))',
          border: 'rgba(74, 222, 128, 0.6)',
          disabled: true
        };
      case 'error':
        return {
          text: 'Hata! Tekrar Deneyin',
          bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.4))',
          border: 'rgba(239, 68, 68, 0.6)',
          disabled: false
        };
      default:
        return {
          text: 'Hemen Başlayalım',
          bg: 'linear-gradient(135deg, rgba(192, 192, 192, 0.3), rgba(192, 192, 192, 0.3))',
          border: 'rgba(192, 192, 192, 0.6)',
          disabled: false
        };
    }
  };

  const buttonConfig = getButtonConfig();

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
                <a href="mailto:info@aldemirsoftware.com">info@aldemirsoftware.com</a>
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
                <a href="https://instagram.com/aldemirsoftware" target="_blank" rel="noopener noreferrer">@aldemirsoftware</a>
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
            id="contact-form"
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
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
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
                style={{
                  background: buttonConfig.bg,
                  borderColor: buttonConfig.border,
                  cursor: buttonConfig.disabled ? 'not-allowed' : 'pointer'
                }}
                whileHover={!buttonConfig.disabled ? { scale: 1.02 } : {}}
                whileTap={!buttonConfig.disabled ? { scale: 0.98 } : {}}
                disabled={buttonConfig.disabled}
              >
                <span>{buttonConfig.text}</span>
                {submitStatus === 'sending' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="8" strokeLinecap="round"/>
                  </svg>
                ) : submitStatus === 'success' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Success Modal */}
        {submitStatus === 'success' && (
          <motion.div 
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSubmitStatus('idle')}
          >
            <motion.div 
              className="success-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="success-icon">
                <motion.svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <circle cx="12" cy="12" r="10" stroke="url(#successGradient)" strokeWidth="2" fill="rgba(192, 192, 192, 0.1)"/>
                  <motion.path 
                    d="M9 12l2 2 4-4" 
                    stroke="url(#successGradient)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="successGradient">
                      <stop offset="0%" stopColor="#E8E8E8"/>
                      <stop offset="100%" stopColor="#C0C0C0"/>
                    </linearGradient>
                  </defs>
                </motion.svg>
              </div>
              
              <h3>Mesajınız İletildi!</h3>
              <p>
                <strong>Aldemir Software</strong> ekibi tarafından talebinize ulaştık. 
                En kısa sürede size dönüş sağlanacaktır.
              </p>
              
              <motion.button 
                className="modal-close-btn"
                onClick={() => setSubmitStatus('idle')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tamam
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
