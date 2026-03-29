import React, { useMemo } from 'react';
import events from '../../data/events';
import './Events.css';

function Events() {
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

        <div className="events-grid">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const { day, month } = getDateParts(event.date);
              const typeClass = getTypeClass(event.type);

              return (
                <div className="event-card" key={event.id}>
                  <div className="event-card-date">
                    <span className="event-card-month">{month}</span>
                    <span className="event-card-day">{day}</span>
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
            })
          ) : (
            <div className="events-empty">
              <p>No upcoming events at this time. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Events;