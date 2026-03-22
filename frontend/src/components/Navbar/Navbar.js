import React, { useState, useEffect } from 'react';
import './Navbar.css';
import awsLogo from '../../images/aws-logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo">
          <img src={awsLogo} alt="AWS Cloud Club MKU Logo" className="nav-logo-icon" />
          <span className="nav-logo-text">
            Cloud Club <span className="nav-logo-accent">MKU</span>
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
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#team" onClick={handleLinkClick}>Team</a></li>
          <li><a href="#events" onClick={handleLinkClick}>Events</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          <li>
            <a href="#apply" className="nav-cta" onClick={handleLinkClick}>
              Apply Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
