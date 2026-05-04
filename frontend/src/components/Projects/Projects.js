import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

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

const projects = [
  {
    id: 1,
    title: 'Campus Marketplace',
    description: 'Student-to-student marketplace for buying and selling used items.',
    stack: ['React', 'Node.js', 'MongoDB'],
    status: 'Deployed',
    category: 'Web Application',
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    description: 'Biometric attendance tracking with real-time analytics dashboard.',
    stack: ['Flutter', 'Firebase', 'Python'],
    status: 'Deployed',
    category: 'Mobile Application',
  },
  {
    id: 3,
    title: 'AI Resume Analyzer',
    description: 'ML-powered resume screening and candidate matching platform.',
    stack: ['React', 'Python', 'TensorFlow'],
    status: 'Active',
    category: 'AI Tool',
  },
  {
    id: 4,
    title: 'Dev Collaboration Platform',
    description: 'Real-time code collaboration tool with integrated version control.',
    stack: ['Next.js', 'WebSockets', 'PostgreSQL'],
    status: 'Prototype',
    category: 'Web Application',
  },
  {
    id: 5,
    title: 'Event Ticketing System',
    description: 'Scalable event management and ticket distribution platform.',
    stack: ['AWS', 'React', 'Stripe'],
    status: 'Deployed',
    category: 'Web Application',
  },
  {
    id: 6,
    title: 'Learning Management Tool',
    description: 'Comprehensive LMS with progress tracking and adaptive learning paths.',
    stack: ['Vue.js', 'Django', 'AWS'],
    status: 'Active',
    category: 'Internal System',
  },
];

function Projects() {
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
    <section className="projects" id="projects" ref={ref}>
      <div className="projects-container">
        <motion.div
          className="projects-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="projects-label" variants={slideUp}>
            Output Layer
          </motion.span>
          <motion.h2 className="projects-heading" variants={slideUp}>
            System Outputs
          </motion.h2>
          <motion.p className="projects-description" variants={slideUp}>
            Real applications and systems built through structured execution cycles. These are the tangible results of continuous collaboration and delivery.
          </motion.p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={gridStagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="project-card"
              variants={gridItem}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: EASING } }}
            >
              <div className="project-header">
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <span className={`project-status project-status--${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-stack">
                <span className="project-stack-label">Stack</span>
                <div className="project-stack-items">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="project-stack-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
