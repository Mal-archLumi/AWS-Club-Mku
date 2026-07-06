import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const EASING = [0.2, 0.8, 0.2, 1];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASING } },
};

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASING } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

function Hero() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
        >
          <motion.div className="hero-label" variants={slideUp}>
            <span className="hero-label-dot" />
            <span>AWS Student Builder Community MKU</span>
          </motion.div>

          <motion.h1 className="hero-heading" variants={slideUp}>
            Learn. Build. Grow.
            <span className="hero-heading-accent">
              Together with other students.
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={slideUp}>
            Join a community where students learn AWS, build real projects,
            work together in teams, and gain practical experience that prepares
            them for internships, certifications, and careers in technology.
          </motion.p>

          <motion.div className="hero-actions" variants={slideUp}>
            <a href="#apply" className="hero-btn hero-btn-primary">
              Join the Community
            </a>

            <button
              className="hero-btn hero-btn-secondary"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              See Our Projects
            </button>
          </motion.div>

          <motion.div className="hero-metrics" variants={fadeIn}>
            <div className="hero-metric">
              <div className="hero-metric-value">100+</div>
              <div className="hero-metric-label">Community Members</div>
            </div>

            <div className="hero-metric-divider" />

            <div className="hero-metric">
              <div className="hero-metric-value">50+</div>
              <div className="hero-metric-label">Projects Built</div>
            </div>

            <div className="hero-metric-divider" />

            <div className="hero-metric">
              <div className="hero-metric-value">15+</div>
              <div className="hero-metric-label">AWS Certified</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASING, delay: 0.3 }}
        >
          <div className="hero-terminal">
            <div className="hero-terminal-header">
              <div className="hero-terminal-title">
                student-builder-club
              </div>

              <div className="hero-terminal-controls">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="hero-terminal-body">
              <div className="hero-terminal-line">
                <span className="hero-terminal-prompt">$</span>
                <span className="hero-terminal-text">
                  Learning AWS...
                </span>
              </div>

              <div className="hero-terminal-line">
                <span className="hero-terminal-output">
                  Working together on a project...
                </span>
              </div>

              <div className="hero-terminal-line">
                <span className="hero-terminal-success">✓</span>
                <span className="hero-terminal-text">
                  Project completed
                </span>
              </div>

              <div className="hero-terminal-line">
                <span className="hero-terminal-prompt">$</span>
                <span className="hero-terminal-text">
                  Presenting our work...
                </span>
              </div>

              <div className="hero-terminal-line">
                <span className="hero-terminal-output">
                  Sharing the project with everyone...
                </span>
              </div>

              <div className="hero-terminal-line">
                <span className="hero-terminal-success">✓</span>
                <span className="hero-terminal-text">
                  Success!
                </span>
              </div>
            </div>
          </div>

          <div className="hero-stats-card">
            <div className="hero-stats-card-row">
              <div className="hero-stats-card-label">
                Current Projects
              </div>
              <div className="hero-stats-card-value">4</div>
            </div>

            <div className="hero-stats-card-row">
              <div className="hero-stats-card-label">
                Students Involved
              </div>
              <div className="hero-stats-card-value">243</div>
            </div>

            <div className="hero-stats-card-row">
              <div className="hero-stats-card-label">
                Mentorship Sessions
              </div>
              <div className="hero-stats-card-value">89</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;