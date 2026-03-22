import React from 'react';
import './Contact.css';

function Contact() {
  // Exact location for Mount Kenya University, Thika
  const locationName = 'Mount Kenya University';
  const address = 'X33P+86, General Kago Rd, Thika, Kenya';
  const mapsUrl = 'https://maps.app.goo.gl/bq2cCfDuUYCx5c2V7';
  
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
          <div className="contact-card contact-card-email">
            <div className="contact-card-icon email-icon">✉️</div>
            <h3>Email Us</h3>
            <p className="email-description">Get in touch with our team</p>
            <a 
              href="mailto:awsclub@mku.ac.ke" 
              className="contact-card-link email-link"
              aria-label="Send email to AWS Cloud Club MKU"
            >
              awsclub@mku.ac.ke
            </a>
            <p className="email-note">We typically respond within 24 hours</p>
          </div>

          <div className="contact-card contact-card-location">
            <div className="location-map">
              <iframe
                title="Mount Kenya University Location - AWS Cloud Club MKU"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '12px' }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.82345!2d37.0749!3d-1.2519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b8e8e8e8e8d%3A0x5f5f5f5f5f5f5f5f!2sMount%20Kenya%20University!5e0!3m2!1sen!2ske!4v1234567890"
              ></iframe>
            </div>
            <h3>Location</h3>
            <a 
              href={mapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-location-link"
              aria-label={`Open ${locationName} in Google Maps`}
            >
              {locationName}<br />
              <span className="location-address">{address}</span>
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">💬</div>
            <h3>Social Media</h3>
            <div className="contact-card-socials">
              <a 
                href="https://x.com/AWSMku" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                aria-label="Follow AWS Cloud Club MKU on Twitter/X"
              >
                Twitter / X
              </a>
              <a 
                href="https://www.linkedin.com/company/aws-cloud-club-mku/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                aria-label="Visit AWS Cloud Club MKU on LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
