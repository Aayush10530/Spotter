import React from 'react';
import styles from './TripSummary.module.css';

const TripSummary = ({ summary }) => {
  if (!summary) return null;

  const isCompliant = summary.is_compliant !== false;

  return (
    <div className={styles.tripSummaryContainer}>
      <h2 className={styles.tripSummaryTitle}>Trip Summary</h2>
      
      <div className={styles.tripSummaryContent}>
        
        {/* Compliance Status */}
        <div className={`${styles.complianceStatus} ${isCompliant ? styles.compliant : styles.violation}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}>
            {isCompliant ? 'check_circle' : 'warning'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={styles.complianceTitle}>{isCompliant ? 'FMCSA Compliant' : 'HOS Violation'}</span>
            {!isCompliant && summary.violations && summary.violations.length > 0 && (
              <ul className={styles.complianceList}>
                {summary.violations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Distance</span>
            <span className={styles.statValue}>{Math.round(summary.total_distance_miles || summary.total_miles || 0).toLocaleString()} mi</span>
          </div>
          
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Est. Duration</span>
            <span className={styles.statValue}>{Math.round(summary.total_duration_hours || summary.total_drive_hours || 0)} hrs</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Duty Days</span>
            <span className={styles.statValue}>{summary.total_days || 0} Days</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Fuel Stops</span>
            <span className={styles.statValue}>{summary.fuel_stops || summary.total_fuel_stops || 0}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripSummary;