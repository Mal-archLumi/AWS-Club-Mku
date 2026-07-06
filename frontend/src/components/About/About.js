import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  timelineItemVariants,
  timelineLineVariants,
  ambientGlowVariants,
} from '../../utils/motionVariants';
import './About.css';

const timelineItems = [
  {
    icon: '',
    title: 'Join a Team',
    description: 'Work together with other students who enjoy building software.',
  },
  {
    icon: '',
    title: 'Build Real Projects',
    description: 'Create websites, apps, and tools that solve real problems.',
  },
  {
    icon: '',
    title: 'Learn by Doing',
    description: 'Gain practical experience instead of only watching tutorials.',
  },
  {
    icon: '',
    title: 'Get Support',
    description: 'Receive guidance, feedback, and help whenever you need it.',
  },
];

const workflowCards = [
  {
    id: 0,
    step: '01',
    title: 'Join a Team',
    content: (
      <div className="card-avatars">
        <div className="avatar">A</div>
        <div className="avatar">B</div>
        <div className="avatar">C</div>
      </div>
    ),
    tag: '2–5 students',
  },
  {
    id: 1,
    step: '02',
    title: 'Build Together',
    content: (
      <div className="card-tasks">
        <div className="task-item">
          <div className="task-check">✓</div>
          <div className="task-bar"></div>
        </div>
        <div className="task-item">
          <div className="task-check">✓</div>
          <div className="task-bar"></div>
        </div>
        <div className="task-item">
          <div className="task-check"></div>
          <div className="task-bar-inactive"></div>
        </div>
      </div>
    ),
    tag: '8–12 weeks',
  },
  {
    id: 2,
    step: '03',
    title: 'Share Your Work',
    content: (
      <div className="card-demo">
        <div className="demo-badge">Demo Day</div>
        <div className="demo-icons">
          <span>✓</span>
          <span>✓</span>
          <span>✓</span>
        </div>
      </div>
    ),
    tag: 'Portfolio Ready',
  },
];

function About() {
  const [inView, setInView] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    autoPlayRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % workflowCards.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [inView]);

  const handleCardClick = (index) => {
    setActiveCard(index);

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % workflowCards.length);
      }, 4000);
    }, 6000);
  };

  const getCardStyle = (index) => {
    const basePositions = [
      { top: 0, left: 0 },
      { top: 80, left: 40 },
      { top: 160, left: 80 },
    ];

    if (activeCard === index) {
      return {
        ...basePositions[0],
        zIndex: 100,
      };
    }

    const offset =
      index > activeCard
        ? index - activeCard
        : workflowCards.length - activeCard + index;

    const position = basePositions[offset] || basePositions[2];

    return {
      ...position,
      zIndex: workflowCards.length - offset,
    };
  };

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="container">

        <motion.div
          className="about-glow"
          variants={ambientGlowVariants}
          animate="pulse"
        />

        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >

          <motion.div className="about-left" variants={itemVariants}>
            <motion.div className="about-header" variants={containerVariants}>

              <motion.span className="section-tag" variants={itemVariants}>
                How It Works
              </motion.span>

              <motion.h2 className="about-title" variants={itemVariants}>
                Learn. Build. Grow.
              </motion.h2>

              <motion.p className="about-description" variants={itemVariants}>
                AWS Student Builder Community MKU gives students the chance to
                learn practical tech skills by working together on real projects.
                You gain experience, improve your portfolio, and grow with the
                support of other students and mentors.
              </motion.p>

            </motion.div>

            <motion.div className="timeline" variants={containerVariants}>
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  variants={timelineItemVariants}
                  whileHover={{ x: 8 }}
                >
                  <div className="timeline-marker">
                    <div className="marker-icon">{item.icon}</div>
                  </div>

                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="timeline-line"
                variants={timelineLineVariants}
                style={{ originY: 0 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="about-right"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <div className="cards-container">
              {workflowCards.map((card, index) => {
                const style = getCardStyle(index);
                const isActive = activeCard === index;

                return (
                  <motion.div
                    key={card.id}
                    className={`workflow-card ${
                      isActive ? 'workflow-card--active' : ''
                    }`}
                    initial="hidden"
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            top: style.top,
                            left: style.left,
                            zIndex: style.zIndex,
                          }
                        : 'hidden'
                    }
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 40,
                        scale: 0.96,
                      },
                    }}
                    transition={{
                      opacity: {
                        duration: 0.6,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                      x: {
                        duration: 0.6,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                      scale: {
                        duration: 0.6,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                      top: {
                        duration: 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                      left: {
                        duration: 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                      zIndex: { duration: 0 },
                    }}
                    whileHover={{
                      y: -6,
                      transition: {
                        duration: 0.3,
                        ease: [0.2, 0.8, 0.2, 1],
                      },
                    }}
                    onClick={() => handleCardClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-header">
                      <span className="card-step">{card.step}</span>
                    </div>

                    <h3 className="card-title">{card.title}</h3>

                    <div className="card-visual">{card.content}</div>

                    <div className="card-tag">{card.tag}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default About;