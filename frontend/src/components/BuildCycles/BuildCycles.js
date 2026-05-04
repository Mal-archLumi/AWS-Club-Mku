import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import buildCycles from '../../data/buildCycles';
import './BuildCycles.css';

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
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
};

function BuildCycleCard({ cycle }) {
  const statusLabels = {
    active: 'Active',
    testing: 'Testing',
    deployed: 'Deployed',
    planning: 'Planning',
  };

  return (
    <motion.article
      className="cycle-card"
      variants={gridItem}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: EASING } }}
    >
      <div className="cycle-header">
        <div className="cycle-info">
          <h3 className="cycle-name">{cycle.name}</h3>
          <p className="cycle-dates">
            {new Date(cycle.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
            {new Date(cycle.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        <span className={`cycle-status cycle-status--${cycle.status}`}>
          {statusLabels[cycle.status]}
        </span>
      </div>

      <p className="cycle-description">{cycle.description}</p>

      <div className="cycle-meta">
        <div className="cycle-meta-section">
          <span className="cycle-meta-label">Deliverables</span>
          <div className="cycle-meta-list">
            {cycle.projects.map((project, idx) => (
              <span key={idx} className="cycle-meta-item">
                {project}
              </span>
            ))}
          </div>
        </div>

        <div className="cycle-meta-section">
          <span className="cycle-meta-label">Team</span>
          <div className="cycle-team">
            <span className="cycle-team-size">{cycle.teamSize} builders</span>
            {cycle.teamMembers.length > 0 && (
              <div className="cycle-team-members">
                {cycle.teamMembers.map((member, idx) => (
                  <span key={idx} className="cycle-team-badge">
                    {member.split(' ')[0]}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {(cycle.githubLink || cycle.demoLink) && (
        <div className="cycle-actions">
          {cycle.githubLink && (
            <a
              href={cycle.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cycle-action-link"
            >
              Repository
            </a>
          )}
          {cycle.demoLink && (
            <a
              href={cycle.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cycle-action-link"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

function BuildCycles() {
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

  const activeCycles = buildCycles.filter((c) => c.status === 'active' || c.status === 'testing');
  const planningCycles = buildCycles.filter((c) => c.status === 'planning');

  return (
    <section className="build-cycles" id="build-cycles" ref={ref}>
      <div className="build-cycles-container">
        <motion.div
          className="build-cycles-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="build-cycles-label" variants={slideUp}>
            Execution Layer
          </motion.span>
          <motion.h2 className="build-cycles-heading" variants={slideUp}>
            Active Build Cycles
          </motion.h2>
          <motion.p className="build-cycles-description" variants={slideUp}>
            Structured development cycles where teams execute on real projects with defined timelines and deliverables.
          </motion.p>
        </motion.div>

        <motion.div
          className="cycles-grid"
          variants={gridStagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {activeCycles.map((cycle) => (
            <BuildCycleCard key={cycle.id} cycle={cycle} />
          ))}
        </motion.div>

        {planningCycles.length > 0 && (
          <motion.div
            className="cycles-upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5, ease: EASING }}
          >
            <h3 className="cycles-upcoming-title">Upcoming Cycles</h3>
            <motion.div
              className="cycles-grid"
              variants={gridStagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {planningCycles.map((cycle) => (
                <BuildCycleCard key={cycle.id} cycle={cycle} />
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="cycles-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5, ease: EASING }}
        >
          <p className="cycles-cta-text">Ready to join an active cycle?</p>
          <a href="#apply" className="cycles-cta-button">
            Enter System
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default BuildCycles;
