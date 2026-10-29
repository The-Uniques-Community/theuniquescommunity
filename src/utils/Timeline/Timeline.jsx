/**
 * @file Timeline.jsx
 * @description Alternating vertical timeline component visualizing historical community milestones, quotes, and event imagery.
 * @architecture Historical chronicle component in src/utils/Timeline/ rendered on 'How It Started' and organizational milestone views.
 * @agent_note Alternates left/right alignment based on parity (`index % 2 === 0`). Conditionally connects consecutive milestones with SVG lines.
 */

import React from 'react';
import './Timeline.css';

/**
 * @component Timeline
 * @description Renders a chronological journey path of milestone cards with year badges, media previews, and executive quotations.
 * @param {Object} props - Component properties
 * @param {Array<Object>} props.events - Chronological list of historical event items
 * @param {string|number} props.events[].year - Calendar year or date tag
 * @param {string} props.events[].heading - Title of the milestone
 * @param {string} [props.events[].subheading] - Supporting subtitle or category
 * @param {string} props.events[].brief - Narrative paragraph summarizing the milestone
 * @param {string} props.events[].image - Accompanying milestone photo URL
 * @param {string} [props.events[].quote] - Inspirational quote or excerpt
 * @param {string} [props.events[].quoteAuthor] - Attributed author of the quotation
 * @state None
 * @api None
 */
const Timeline = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline-container">
      {events.map((event, index) => {
        const isFirst = index === 0;
        const isLast = index === events.length - 1;
        const isEven = index % 2 === 0;
        const hasNext = index < events.length - 1;
        
        return (
          <div key={index} className="timeline-item-wrapper">
            <div 
              className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}
            >
              {/* Year marker with dot */}
              <div className="timeline-dot">
                <span className="timeline-circle"></span>
                {(isFirst || isLast) ? (
                  <span className={`timeline-year-tilted ${isFirst ? 'first' : 'last'}`}>
                    {event.year}
                  </span>
                ) : (
                  <span className="timeline-year">{event.year}</span>
                )}
              </div>
              
              {/* Content */}
              <div className="timeline-content">
                <div className="timeline-image-container">
                  <img 
                    src={event.image} 
                    alt={event.heading} 
                    className="timeline-image" 
                  />
                </div>
                <div className="timeline-text">
                  <h3 className="timeline-heading">{event.heading}</h3>
                  <h4 className="timeline-subheading">{event.subheading}</h4>
                  <p className="timeline-brief">{event.brief}</p>
                  {event.quote && (
                    <blockquote className="timeline-quote">
                      <p>"{event.quote}"</p>
                      {event.quoteAuthor && <cite>— {event.quoteAuthor}</cite>}
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
            
            {/* Connector line - only if not the last item */}
            {hasNext && (
              <div className={`timeline-connector ${isEven ? 'connector-right' : 'connector-left'}`}>
                <div className="connector-line"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
