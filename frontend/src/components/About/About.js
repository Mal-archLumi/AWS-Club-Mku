import React from 'react';
import './About.css';

const features = [
  { icon: '📚', title: 'Learn', text: 'Master cloud fundamentals through workshops and certifications.' },
  { icon: '⚡', title: 'Build', text: 'Ship real projects on AWS Lambda, S3, DynamoDB, and more.' },
  { icon: '🤝', title: 'Connect', text: 'Network with builders and AWS professionals.' },
  { icon: '🎯', title: 'Grow', text: 'Advance your career in cloud computing.' },
];

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-top">
          <span className="section-tag">Who We Are</span>
          <h2 className="about-title">About the Club</h2>
          <p className="about-subtitle">
            We're a student-led community at Mount Kenya University building expertise in cloud computing.
          </p>
        </div>

        <div className="about-features">
          {features.map((feature, index) => (
            <div className="about-feature" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;