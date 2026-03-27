import React from 'react';
import teamMembers from '../../data/teamMembers';
import './Team.css';

function TeamMemberImage({ member }) {
  const svgFallback = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#1a1f2e" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#ff9900" font-size="64" font-family="Inter, sans-serif" font-weight="700">${member.initials}</text></svg>`
  )}`;

  return (
    <img
      src={member.image || svgFallback}
      alt={member.name}
      className="team-card-img"
      onError={(e) => {
        e.target.src = svgFallback;
      }}
    />
  );
}

function Team() {
  return (
    <section className="section team" id="team">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Leadership</span>
          <h2 className="section-title">Meet the Core Team</h2>
          <p className="section-desc">
            The dedicated leaders driving innovation and learning at AWS Cloud Club MKU.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div
              className={`team-card${member.featured ? ' team-card--featured' : ''}`}
              key={member.id}
            >
              <div className="team-card-img-wrapper">
                <TeamMemberImage member={member} />
                {member.featured && (
                  <span className="team-card-badge">Captain</span>
                )}
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                <p className="team-card-dept">{member.department}</p>
                <div className="team-card-socials">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
                      in
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} aria-label="GitHub" className="social-link" target="_blank" rel="noopener noreferrer">
                      gh
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;