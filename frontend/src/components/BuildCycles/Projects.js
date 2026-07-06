import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const EASING = [0.2, 0.8, 0.2, 1];

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const gridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

const projects = [
  {
    id: 1,
    title: 'Campus Marketplace',
    description:
      'A platform where students can safely buy and sell items within campus.',
    stack: ['React', 'Node.js', 'MongoDB'],
    status: 'Completed',
    category: 'Web App',
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    description:
      'A smart attendance system that helps institutions track attendance more efficiently.',
    stack: ['Flutter', 'Firebase', 'Python'],
    status: 'Completed',
    category: 'Mobile App',
  },
  {
    id: 3,
    title: 'AI Resume Analyzer',
    description:
      'An AI-powered tool that reviews resumes and provides personalized feedback.',
    stack: ['React', 'Python', 'TensorFlow'],
    status: 'Active',
    category: 'AI Project',
  },
  {
    id: 4,
    title: 'Developer Collaboration Platform',
    description:
      'A collaborative coding platform that helps teams build projects together.',
    stack: ['Next.js', 'WebSockets', 'PostgreSQL'],
    status: 'In Progress',
    category: 'Developer Tool',
  },
  {
    id: 5,
    title: 'Event Ticketing System',
    description:
      'An online platform for managing events and issuing digital tickets.',
    stack: ['AWS', 'React', 'Stripe'],
    status: 'Completed',
    category: 'Web App',
  },
  {
    id: 6,
    title: 'Learning Management Platform',
    description:
      'A learning platform that helps students track progress and complete coursework.',
    stack: ['Vue.js', 'Django', 'AWS'],
    status: 'Active',
    category: 'Learning Platform',
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
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="projects"
      id="projects"
      ref={ref}
    >
      <div className="projects-container">

        <motion.div
          className="projects-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >

          <motion.span
            className="projects-label"
            variants={slideUp}
          >
            Community Projects
          </motion.span>

          <motion.h2
            className="projects-heading"
            variants={slideUp}
          >
            Projects We've Built
          </motion.h2>

          <motion.p
            className="projects-description"
            variants={slideUp}
          >
            Every project is built by students working together, learning new
            technologies, and solving real problems. Some are complete, while
            others are still growing.
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
              whileHover={{
                y: -4,
                transition: {
                  duration: 0.2,
                  ease: EASING,
                },
              }}
            >
              <div className="project-header">

                <div className="project-info">
                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <span className="project-category">
                    {project.category}
                  </span>
                </div>

                <span
                  className={`project-status project-status--${project.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {project.status}
                </span>

              </div>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-stack">

                <span className="project-stack-label">
                  Built With
                </span>

                <div className="project-stack-items">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="project-stack-item"
                    >
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