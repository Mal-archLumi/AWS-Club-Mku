import React from 'react';
import './Contact.css';

function Contact() {
  const mapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7359932537677!2d37.0749!3d-1.2519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b8e8e8e8e8d%3A0x5f5f5f5f5f5f5f5f!2sMount%20Kenya%20University!5e0!3m2!1sen!2ske!4v1234567890';
  const mapsDirectionsUrl = 'https://maps.app.goo.gl/aUjkszRkewsavhfK9';

  const handleMapClick = () => {
    window.open(mapsDirectionsUrl, '_blank');
  };

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
          <div className="contact-info">
            <h3>Contact Us</h3>
            
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <p className="contact-label">Email</p>
                <a href="mailto:awscloudclub.mku@gmail.com">awscloudclub.mku@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <p className="contact-label">Location</p>
                <p>Mount Kenya University<br />Thika, Kenya</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <p className="contact-label">Office Hours</p>
                <p>Mon–Fri: 3–6 PM<br />Sat: 10 AM–2 PM</p>
              </div>
            </div>
            
            <div className="contact-socials">
              <a href="https://x.com/AWSMku" target="_blank" rel="noopener noreferrer" className="social-link">𝕏</a>
              <a href="https://www.linkedin.com/company/aws-cloud-club-mku/" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
              <button 
                className="social-link social-button"
                onClick={() => alert('Instagram coming soon!')}
                aria-label="Instagram (coming soon)"
              >
                ig
              </button>
            </div>
          </div>
          
          <div className="contact-map">
            <iframe
              title="Mount Kenya University Location"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <button 
              className="map-overlay-button"
              onClick={handleMapClick}
              title="Open directions in Google Maps"
              aria-label="Open Mount Kenya University in Google Maps"
            >
              📍 Open in Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;