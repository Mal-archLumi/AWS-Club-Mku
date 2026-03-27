import React from 'react';
import events from '../../data/events';
import './Events.css';

function Events() {
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
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-card-date">
                <span className="event-card-month">{event.month}</span>
                <span className="event-card-day">{event.day}</span>
              </div>
              <div className="event-card-info">
                <span className={`event-card-tag event-card-tag--${event.tagType}`}>
                  {event.tag}
                </span>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-desc">{event.description}</p>
                <div className="event-card-meta">
                  <span>📍 {event.location}</span>
                  <span>🕐 {event.time}</span>
                </div>
                {event.bookingLink && (
                  <a 
                    href={event.bookingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="event-card-link"
                  >
                    Register Now →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;