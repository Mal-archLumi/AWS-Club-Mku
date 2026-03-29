import React from 'react';
import './Hero.css';
import awsLogo from '../../images/aws-logo.png';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <img src={awsLogo} alt="AWS Logo" className="hero-badge-icon" />
          Cloud Club — Mount Kenya University
        </div>

        <h1 className="hero-title">
          Build. Learn.
          <br />
          <span className="hero-title-accent">Innovate in the Cloud.</span>
        </h1>

        <p className="hero-subtitle">
          Empowering MKU students with cloud computing skills, hands-on labs,
          certifications, and real-world projects powered by Amazon Web Services.
        </p>

        <div className="hero-actions">
          <a 
            href="https://www.meetup.com/aws-cloud-club-at-mount-kenya-university/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Join the Club
            <span className="btn-arrow">→</span>
          </a>
          <a href="#about" className="btn btn-ghost">
            Learn More
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">100+</span>
            <span className="hero-stat-label">Members</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">20+</span>
            <span className="hero-stat-label">Events</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">15+</span>
            <span className="hero-stat-label">Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;