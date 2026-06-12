import React from 'react';
import styles from './StopTimeline.module.css';

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
      case 'start': return styles.start;
      case 'pickup': return styles.pickup;
      case 'dropoff': return styles.dropoff;
      case 'fuel': return styles.fuel;
      case 'rest': return styles.rest;
      default: return styles.default;
    }
  };

  return (
    <div className={styles.stopTimelineContainer}>
      <h2 className={styles.stopTimelineTitle}>Stop Timeline</h2>
      
      <div className={styles.timelineWrapper}>
        <div className={styles.timelineLine}></div>
        
        {waypoints.map((wp, idx) => (
          <div key={idx} className={styles.timelineItem}>
            <div className={`${styles.timelineIconWrapper} ${getBgClass(wp.type)}`}>
              <span className={`material-symbols-outlined ${styles.timelineIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {getIcon(wp.type)}
              </span>
            </div>
            
            <div className={styles.timelineContent}>
              <span className={styles.timelineLabel}>
                {wp.activity}: {wp.name.split(',')[0]}
              </span>
              <span className={styles.timelineMeta}>
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