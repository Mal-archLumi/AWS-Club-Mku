import React from 'react';
import './Footer.css';
import awsLogo from '../../images/aws-logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={awsLogo} alt="AWS Cloud Club MKU Logo" className="footer-brand-icon" />
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} AWS Cloud Club — Mount Kenya University. All rights reserved.
          </p>
          <p className="footer-note">
            Built with ☁️ by AWS Cloud Club MKU
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
