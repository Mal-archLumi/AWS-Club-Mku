import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  gridContainerVariants,
  gridItemVariants,
  buttonHoverVariants,
} from '../../utils/motionVariants';
import events from '../../data/events';
import './Events.css';

function Events() {
  const [copiedId, setCopiedId] = useState(null);
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Helper function to parse date and get day and month
  const getDateParts = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month, date };
  };

  // Helper function to get event type styling
  const getTypeClass = (type) => {
    const typeMap = {
      'Workshop': 'workshop',
      'Hackathon': 'hackathon',
      'Networking': 'networking',
    };
    return typeMap[type] || 'workshop';
  };

  // Handle GitHub link copy
  const handleCopyGithub = (githubLink, eventId) => {
    navigator.clipboard.writeText(githubLink);
    setCopiedId(eventId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Process events: filter future, sort by date, show next 3
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter(event => {
        const eventDate = new Date(event.date + 'T00:00:00');
        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      })
      .slice(0, 3);
  }, []);

  // Separate featured highlight event from regular events
  const highlightEvent = upcomingEvents.find(e => e.isHighlight);
  const regularEvents = upcomingEvents.filter(e => !e.isHighlight);

  return (
    <section className="section events" id="events" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-tag" variants={itemVariants}>
            What's Happening
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            Upcoming Events
          </motion.h2>
          <motion.p className="section-desc" variants={itemVariants}>
            Join our workshops, hackathons, and networking sessions to level up your cloud skills.
          </motion.p>
        </motion.div>

        {/* Featured Event */}
        {highlightEvent && (
          <motion.div
            className="event-featured-container"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="event-featured-card"
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(255, 153, 0, 0.2)' }}
            >
              <motion.div
                className="event-featured-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="badge-text">🌟 Featured Event</span>
              </motion.div>
              
              <motion.div
                className="event-featured-header"
                variants={containerVariants}
              >
                <motion.div
                  className="event-featured-date"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="featured-date-day">{getDateParts(highlightEvent.date).day}</div>
                  <div className="featured-date-month">{getDateParts(highlightEvent.date).month}</div>
                </motion.div>
                
                <motion.div className="event-featured-info">
                  <motion.h2 className="event-featured-title" variants={itemVariants}>
                    {highlightEvent.title}
                  </motion.h2>
                  <motion.p className="event-featured-subtitle" variants={itemVariants}>
                    {highlightEvent.description}
                  </motion.p>
                </motion.div>
              </motion.div>

              <motion.div
                className="event-featured-details"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <motion.div className="featured-detail-item" variants={itemVariants}>
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{highlightEvent.location}</span>
                </motion.div>
                <motion.div className="featured-detail-item" variants={itemVariants}>
                  <span className="detail-icon">🕐</span>
                  <span className="detail-text">{highlightEvent.time}</span>
                </motion.div>
              </motion.div>

              {highlightEvent.githubLink && (
                <motion.div
                  className="event-featured-github"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="github-label">Workshop Resources:</p>
                  <div className="github-link-container">
                    <motion.a
                      href={highlightEvent.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                      whileHover={{ scale: 1.02 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      {highlightEvent.githubLink}
                    </motion.a>
                    <motion.button
                      className={`github-copy-btn ${copiedId === highlightEvent.id ? 'copied' : ''}`}
                      onClick={() => handleCopyGithub(highlightEvent.githubLink, highlightEvent.id)}
                      title="Copy GitHub link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedId === highlightEvent.id ? '✓ Copied!' : 'Copy'}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="event-featured-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href={highlightEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-featured-cta"
                  variants={buttonHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Register Now →
                </motion.a>
                {highlightEvent.eventRegistrationForm && (
                  <motion.a
                    href={highlightEvent.eventRegistrationForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-featured-form-link"
                    variants={buttonHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Fill Registration Form →
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <motion.div
            className="events-section"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h3 className="events-section-title" variants={itemVariants}>
              Other Upcoming Events
            </motion.h3>
            <motion.div
              className="events-grid"
              variants={gridContainerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {regularEvents.map((event) => {
                const typeClass = getTypeClass(event.type);

                return (
                  <motion.div
                    className="event-card"
                    key={event.id}
                    variants={gridItemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="event-card-date coming-soon">
                      <span className="event-card-month">Coming</span>
                      <span className="event-card-day">Soon</span>
                    </div>
                    <div className="event-card-info">
                      <div className="event-card-header">
                        <motion.span
                          className={`event-card-tag event-card-tag--${typeClass}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {event.type}
                        </motion.span>
                        {event.isFeatured && (
                          <motion.span
                            className="event-badge-featured"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                          >
                            Featured
                          </motion.span>
                        )}
                      </div>
                      <motion.h3 className="event-card-title" variants={itemVariants}>
                        {event.title}
                      </motion.h3>
                      <motion.p className="event-card-desc" variants={itemVariants}>
                        {event.description}
                      </motion.p>
                      <motion.div className="event-card-meta" variants={itemVariants}>
                        <span>📍 {event.location}</span>
                        <span>🕐 {event.time}</span>
                      </motion.div>
                      {event.registrationLink && (
                        <motion.a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-card-link"
                          variants={buttonHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Register Now →
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {upcomingEvents.length === 0 && (
          <motion.div
            className="events-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>No upcoming events at this time. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Events;