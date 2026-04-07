import React, { useMemo, useState } from 'react';
import events from '../../data/events';
import './Events.css';

function Events() {
  const [copiedId, setCopiedId] = useState(null);

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
    <section className="section events" id="events">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What's Happening</span>
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-desc">
            Join our workshops, hackathons, and networking sessions to level up your cloud skills.
          </p>
        </div>

        {/* Featured Event */}
        {highlightEvent && (
          <div className="event-featured-container">
            <div className="event-featured-card">
              <div className="event-featured-badge">
                <span className="badge-text">🌟 Featured Event</span>
              </div>
              
              <div className="event-featured-header">
                <div className="event-featured-date">
                  <div className="featured-date-day">{getDateParts(highlightEvent.date).day}</div>
                  <div className="featured-date-month">{getDateParts(highlightEvent.date).month}</div>
                </div>
                
                <div className="event-featured-info">
                  <h2 className="event-featured-title">{highlightEvent.title}</h2>
                  <p className="event-featured-subtitle">{highlightEvent.description}</p>
                </div>
              </div>

              <div className="event-featured-details">
                <div className="featured-detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{highlightEvent.location}</span>
                </div>
                <div className="featured-detail-item">
                  <span className="detail-icon">🕐</span>
                  <span className="detail-text">{highlightEvent.time}</span>
                </div>
              </div>

              {highlightEvent.githubLink && (
                <div className="event-featured-github">
                  <p className="github-label">Workshop Resources:</p>
                  <div className="github-link-container">
                    <a 
                      href={highlightEvent.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      {highlightEvent.githubLink}
                    </a>
                    <button 
                      className={`github-copy-btn ${copiedId === highlightEvent.id ? 'copied' : ''}`}
                      onClick={() => handleCopyGithub(highlightEvent.githubLink, highlightEvent.id)}
                      title="Copy GitHub link"
                    >
                      {copiedId === highlightEvent.id ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              <div className="event-featured-actions">
                <a 
                  href={highlightEvent.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-featured-cta"
                >
                  Register Now →
                </a>
                {highlightEvent.eventRegistrationForm && (
                  <a 
                    href={highlightEvent.eventRegistrationForm} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="event-featured-form-link"
                  >
                    Fill Registration Form →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <div className="events-section">
            <h3 className="events-section-title">Other Upcoming Events</h3>
            <div className="events-grid">
              {regularEvents.map((event) => {
                const typeClass = getTypeClass(event.type);

                return (
                  <div className="event-card" key={event.id}>
                    <div className="event-card-date coming-soon">
                      <span className="event-card-month">Coming</span>
                      <span className="event-card-day">Soon</span>
                    </div>
                    <div className="event-card-info">
                      <div className="event-card-header">
                        <span className={`event-card-tag event-card-tag--${typeClass}`}>
                          {event.type}
                        </span>
                        {event.isFeatured && (
                          <span className="event-badge-featured">Featured</span>
                        )}
                      </div>
                      <h3 className="event-card-title">{event.title}</h3>
                      <p className="event-card-desc">{event.description}</p>
                      <div className="event-card-meta">
                        <span>📍 {event.location}</span>
                        <span>🕐 {event.time}</span>
                      </div>
                      {event.registrationLink && (
                        <a 
                          href={event.registrationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="event-card-link"
                        >
                          Register Now →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {upcomingEvents.length === 0 && (
          <div className="events-empty">
            <p>No upcoming events at this time. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;