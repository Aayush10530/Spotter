import React from 'react';
import './StopTimeline.css';

const StopTimeline = ({ waypoints }) => {
  if (!waypoints || waypoints.length === 0) return null;

  const getIcon = (type) => {
    switch(type) {
      case 'start': return 'play_arrow';
      case 'pickup': return 'inventory_2';
      case 'dropoff': return 'flag';
      case 'fuel': return 'local_gas_station';
      case 'rest': return 'bed';
      default: return 'place';
    }
  };

  const getBgClass = (type) => {
    switch(type) {
      case 'start': return 'start';
      case 'pickup': return 'pickup';
      case 'dropoff': return 'dropoff';
      case 'fuel': return 'fuel';
      case 'rest': return 'rest';
      default: return 'default';
    }
  };

  return (
    <div className="stop-timeline-container">
      <h2 className="stop-timeline-title">Stop Timeline</h2>
      
      <div className="timeline-wrapper">
        {/* Vertical connecting line */}
        <div className="timeline-line"></div>
        
        {waypoints.map((wp, idx) => (
          <div key={idx} className="timeline-item">
            
            {/* Icon */}
            <div className={`timeline-icon-wrapper ${getBgClass(wp.type)}`}>
              <span className="material-symbols-outlined timeline-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
                {getIcon(wp.type)}
              </span>
            </div>
            
            {/* Text content */}
            <div className="timeline-content">
              <span className="timeline-label">
                {wp.activity}: {wp.name.split(',')[0]}
              </span>
              <span className="timeline-meta">
                Day {wp.day} - {wp.time_label || 'Time not set'}
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopTimeline;
