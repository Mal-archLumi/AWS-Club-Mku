import React from 'react';
import './About.css';

const features = [
  { icon: '🎓', title: 'Learn', description: 'Access AWS workshops, study jams, and certification prep sessions led by experienced cloud practitioners.' },
  { icon: '🛠️', title: 'Build', description: 'Get hands-on with real AWS services — from EC2 and S3 to Lambda and DynamoDB — through guided projects.' },
  { icon: '🌍', title: 'Connect', description: 'Join a community of cloud enthusiasts, network with AWS professionals, and attend global AWS events.' },
  { icon: '🚀', title: 'Grow', description: 'Build your portfolio, earn AWS certifications, and unlock career opportunities in cloud computing.' },
];

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Who We Are</span>
          <h2 className="section-title">About AWS Cloud Club MKU</h2>
          <p className="section-desc">
            We're a student-led community at Mount Kenya University passionate about cloud computing.
          </p>
        </div>

        <div className="about-grid">
          {features.map((feature, index) => (
            <div className="about-card" key={index}>
              <div className="about-card-icon">{feature.icon}</div>
              <h3 className="about-card-title">{feature.title}</h3>
              <p className="about-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;