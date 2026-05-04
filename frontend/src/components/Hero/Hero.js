import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background Effects */}
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid-overlay"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      {/* Content Container */}
      <div className="hero-container">
        {/* Left Content */}
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Builders Community
          </div>

          <h1 className="hero-title">
            Build real projects.
            <span className="hero-title-accent">Not just skills.</span>
          </h1>

          <p className="hero-subtitle">
            Join a community of developers, designers, and engineers building real-world systems together. Learn through collaborative projects, mentorship, and hands-on engineering practice.
          </p>

          <div className="hero-actions">
            <a 
              href="#apply"
              className="btn btn-primary"
            >
              Join Builder Club
              <span className="btn-arrow">→</span>
            </a>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                const projectsSection = document.getElementById('events');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Projects
            </button>
          </div>

          {/* Stats Row */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-value">100+</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat">
              <div className="stat-value">50+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat">
              <div className="stat-value">15+</div>
              <div className="stat-label">Certifications</div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className={`hero-visual ${isLoaded ? 'loaded' : ''}`}>
          <div className="visual-container">
            {/* Dashboard Mockup */}
            <div className="dashboard">
              <div className="dashboard-header">
                <div className="dashboard-title">Project Workspace</div>
                <div className="dashboard-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="dashboard-body">
                {/* Active Projects */}
                <div className="project-card">
                  <div className="project-header">
                    <div className="project-icon">🚀</div>
                    <div className="project-info">
                      <div className="project-title">Mobile App</div>
                      <div className="project-team">4 builders</div>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="project-card">
                  <div className="project-header">
                    <div className="project-icon">📊</div>
                    <div className="project-info">
                      <div className="project-title">Analytics Tool</div>
                      <div className="project-team">3 builders</div>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="project-card">
                  <div className="project-header">
                    <div className="project-icon">🔐</div>
                    <div className="project-info">
                      <div className="project-title">Auth System</div>
                      <div className="project-team">5 builders</div>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="dashboard-stats">
                  <div className="stat-box">
                    <div className="stat-box-label">PRs Merged</div>
                    <div className="stat-box-value">243</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-label">Code Reviews</div>
                    <div className="stat-box-value">89</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="floating-card card-1">
              <div className="card-badge">Live</div>
              <div className="card-text">Collaborative</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-badge">Real</div>
              <div className="card-text">World Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;