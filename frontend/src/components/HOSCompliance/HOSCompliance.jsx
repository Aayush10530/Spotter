import React from 'react';
import styles from './HOSCompliance.module.css';

const HOSCompliance = ({ summary }) => {
  if (!summary) return null;

  const drivingViolations = summary.violations?.filter(v => v.includes('11-hour'));
  const shiftViolations = summary.violations?.filter(v => v.includes('14-hour'));
  
  const hasDrivingViolation = drivingViolations && drivingViolations.length > 0;
  const hasShiftViolation = shiftViolations && shiftViolations.length > 0;

  return (
    <div className={styles.hosComplianceContainer}>
      <h2 className={styles.hosComplianceTitle}>HOS Compliance Status</h2>
      
      <div className={styles.hosComplianceList}>
        {/* 11-Hour Driving Limit */}
        <div className={`${styles.hosStatusItem} ${hasDrivingViolation ? styles.violation : styles.compliant}`}>
          <span className={`material-symbols-outlined ${styles.hosIcon} ${hasDrivingViolation ? styles.violation : styles.compliant}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasDrivingViolation ? 'warning' : 'check_circle'}
          </span>
          <div className={styles.hosDetails}>
            <span className={`${styles.hosLabel} ${hasDrivingViolation ? styles.violation : styles.compliant}`}>11-Hour Driving Limit</span>
            <span className={`${styles.hosValue} ${hasDrivingViolation ? styles.violation : styles.compliant}`}>
              {hasDrivingViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>

        {}
        <div className={`${styles.hosStatusItem} ${hasShiftViolation ? styles.violation : styles.compliant}`}>
          <span className={`material-symbols-outlined ${styles.hosIcon} ${hasShiftViolation ? styles.violation : styles.compliant}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasShiftViolation ? 'warning' : 'check_circle'}
          </span>
          <div className={styles.hosDetails}>
            <span className={`${styles.hosLabel} ${hasShiftViolation ? styles.violation : styles.compliant}`}>14-Hour Shift Limit</span>
            <span className={`${styles.hosValue} ${hasShiftViolation ? styles.violation : styles.compliant}`}>
              {hasShiftViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOSCompliance;