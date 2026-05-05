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
    title: 'Team-Based Development',
    description: 'Work in small teams that simulate real-world engineering environments.'
  },
  {
    icon: '',
    title: 'Real Projects',
    description: 'Build applications, systems, and tools that solve actual problems.'
  },
  {
    icon: '',
    title: 'Structured Execution',
    description: 'Clear workflows, tasks, and deliverables—not random learning.'
  },
  {
    icon: '',
    title: 'Mentorship & Feedback',
    description: 'Get guidance, code reviews, and direction as you build.'
  },
];

const workflowCards = [
  {
    id: 0,
    step: '01',
    title: 'Form a Team',
    content: (
      <div className="card-avatars">
        <div className="avatar">A</div>
        <div className="avatar">B</div>
        <div className="avatar">C</div>
      </div>
    ),
    tag: '2–5 members',
  },
  {
    id: 1,
    step: '02',
    title: 'Build a Project',
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
    title: 'Ship & Showcase',
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
    tag: 'Live & Deploy',
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

  // Auto-play animation: cycle through cards every 4 seconds
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

  // Handle manual card selection (pauses auto-play temporarily)
  const handleCardClick = (index) => {
    setActiveCard(index);
    
    // Clear existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Restart auto-play after 6 seconds of inactivity
    autoPlayRef.current = setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % workflowCards.length);
      }, 4000);
    }, 6000);
  };

  // Calculate card position and z-index
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

    // Calculate position for non-active cards
    const offset = index > activeCard ? index - activeCard : workflowCards.length - activeCard + index;
    const position = basePositions[offset] || basePositions[2];

    return {
      ...position,
      zIndex: workflowCards.length - offset,
    };
  };

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="container">
        {/* Background Glow */}
        <motion.div
          className="about-glow"
          variants={ambientGlowVariants}
          animate="pulse"
        />

        {/* Main Grid */}
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* LEFT: Content & Timeline */}
          <motion.div className="about-left" variants={itemVariants}>
            <motion.div className="about-header" variants={containerVariants}>
              <motion.span className="section-tag" variants={itemVariants}>
                System Operating Model
              </motion.span>
              <motion.h2 className="about-title" variants={itemVariants}>
                How the System Operates
              </motion.h2>
              <motion.p className="about-description" variants={itemVariants}>
                The Builder System runs continuous execution cycles where teams take real projects from ideation through deployment. This is structured execution—not workshops, not events—a real operating system for shipping software.
              </motion.p>
            </motion.div>

            {/* Timeline */}
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
                    <p className="timeline-description">{item.description}</p>
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

          {/* RIGHT: Workflow Cards */}
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
                    className={`workflow-card ${isActive ? 'workflow-card--active' : ''}`}
                    initial="hidden"
                    animate={inView ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      top: style.top,
                      left: style.left,
                      zIndex: style.zIndex,
                    } : 'hidden'}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 40,
                        scale: 0.96,
                      },
                    }}
                    transition={{
                      opacity: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
                      x: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
                      scale: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
                      top: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
                      left: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
                      zIndex: { duration: 0 },
                    }}
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
                    }}
                    onClick={() => handleCardClick(index)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    {/* Card Content */}
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
