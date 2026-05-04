import React, { useState, useEffect } from 'react';
import './Navbar.css';
import awsLogo from '../../images/aws-logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Track which section is in view
      const sections = ['home', 'about', 'build-cycles', 'projects', 'team', 'apply', 'contact'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={() => handleLinkClick('home')}>
          <img src={awsLogo} alt="AWS Student Builder Community MKU" className="nav-logo-icon" />
          <span className="nav-logo-text">
            AWS Student Builder Community <span className="nav-logo-accent">MKU</span>
          </span>
        </a>

        <button
          className={`nav-toggle${isOpen ? ' nav-toggle--active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links${isOpen ? ' nav-links--open' : ''}`}>
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => handleLinkClick('about')}>How It Works</a></li>
          <li><a href="#build-cycles" className={activeSection === 'build-cycles' ? 'active' : ''} onClick={() => handleLinkClick('build-cycles')}>Build Cycles</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => handleLinkClick('projects')}>Outcomes</a></li>
          <li><a href="#team" className={activeSection === 'team' ? 'active' : ''} onClick={() => handleLinkClick('team')}>Team</a></li>
          <li><a href="#apply" className={activeSection === 'apply' ? 'active' : ''} onClick={() => handleLinkClick('apply')}>Apply</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => handleLinkClick('contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
