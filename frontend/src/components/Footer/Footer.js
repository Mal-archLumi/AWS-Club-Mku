import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Footer.css';
import awsLogo from '../../images/aws-logo.png';

const EASING = [0.2, 0.8, 0.2, 1];

function Footer() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: EASING }}
        >
          <div className="footer-grid">
            {/* Identity Block */}
            <div className="footer-section footer-identity">
              <div className="footer-brand">
                <img src={awsLogo} alt="AWS Student Builder Community MKU" className="footer-logo" />
                <div className="footer-brand-text">
                  <h3 className="footer-title">AWS Student Builder Community MKU</h3>
                  <p className="footer-tagline">
                    A structured developer ecosystem where students execute in focused teams, deliver on timelines, and ship real software.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-section">
              <h4 className="footer-section-title">Navigate</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">How It Works</a></li>
                <li><a href="#build-cycles">Build Cycles</a></li>
                <li><a href="#projects">Outcomes</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#apply">Apply</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4 className="footer-section-title">Contact</h4>
              <ul className="footer-contact">
                <li>
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:awscloudclub.mku@gmail.com">awscloudclub.mku@gmail.com</a>
                </li>
                <li>
                  <span className="footer-contact-label">Location</span>
                  <span>Mount Kenya University, Thika</span>
                </li>
              </ul>
              <div className="footer-social">
                <a href="https://x.com/AWSMku" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                  X
                </a>
                <a href="https://www.linkedin.com/company/aws-cloud-club-mku/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} AWS Student Builder Community MKU. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
