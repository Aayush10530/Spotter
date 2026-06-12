import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <span className={`material-symbols-outlined ${styles.errorIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
      <div className={styles.errorContent}>
        <h3 className={styles.errorTitle}>Trip Plan Failed</h3>
        <p className={styles.errorMessage}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.errorDismissBtn}>
            Dismiss
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;