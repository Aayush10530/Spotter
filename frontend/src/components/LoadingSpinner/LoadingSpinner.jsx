import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <span className="material-symbols-outlined loading-spinner">progress_activity</span>
      <h3 className="loading-title">Generating ELD Logbook...</h3>
      <p className="loading-subtitle">Calculating hours of service compliance, routing, and fuel stops.</p>
    </div>
  );
};

export default LoadingSpinner;
