import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <span className={`material-symbols-outlined ${styles.loadingSpinner}`}>progress_activity</span>
      <h3 className={styles.loadingTitle}>Generating ELD Logbook...</h3>
      <p className={styles.loadingSubtitle}>Calculating hours of service compliance, routing, and fuel stops.</p>
    </div>
  );
};

export default LoadingSpinner;