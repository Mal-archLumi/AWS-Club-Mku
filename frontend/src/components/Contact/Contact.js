import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Reach Out</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-desc">
            Have questions about the club or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">📧</div>
            <h3>Email</h3>
            <a href="mailto:awsclub@mku.ac.ke" className="contact-card-link">
              awsclub@mku.ac.ke
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <h3>Location</h3>
            <p>Mount Kenya University<br />Thika, Kenya</p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">💬</div>
            <h3>Social Media</h3>
            <div className="contact-card-socials">
              <a href="https://x.com/AWSMku" target="_blank" rel="noopener noreferrer" className="contact-social-btn">Twitter / X</a>
              <a href="https://www.linkedin.com/company/aws-cloud-club-mku/" target="_blank" rel="noopener noreferrer" className="contact-social-btn">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
