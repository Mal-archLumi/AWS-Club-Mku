import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import teamMembers from '../../data/teamMembers';
import './Team.css';

const EASING = [0.2, 0.8, 0.2, 1];

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASING } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const gridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
};

function TeamCard({ member }) {
  const svgFallback = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#141920" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="#ff9900" font-size="60" font-family="Inter,sans-serif" font-weight="700">${member.initials}</text></svg>`
  )}`;

  return (
    <motion.article
      className="team-card"
      variants={gridItem}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: EASING } }}
    >
      <div className="team-card-image">
        <img
          src={member.image || svgFallback}
          alt={member.name}
          onError={(e) => {
            e.target.src = svgFallback;
          }}
        />
      </div>
      <div className="team-card-content">
        <h3 className="team-card-name">{member.name}</h3>
        <p className="team-card-role">{member.role}</p>
        {member.note && <p className="team-card-note">{member.note}</p>}
        {(member.socials?.linkedin || member.socials?.github) && (
          <div className="team-card-links">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-card-link"
              >
                LinkedIn
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="team-card-link"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function Team() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2, rootMargin: '-80px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="team" id="team" ref={ref}>
      <div className="team-container">
        <motion.div
          className="team-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="team-label" variants={slideUp}>
            People Layer
          </motion.span>
          <motion.h2 className="team-heading" variants={slideUp}>
            The Team Behind Builder Club MKU
          </motion.h2>
          <motion.p className="team-description" variants={slideUp}>
            A group of student developers and coordinators organizing, building, and supporting club activities and projects.
          </motion.p>
        </motion.div>

        <motion.div
          className="team-grid"
          variants={gridStagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Team;
