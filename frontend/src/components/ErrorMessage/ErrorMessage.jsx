import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <span className="material-symbols-outlined error-icon" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
      <div className="error-content">
        <h3 className="error-title">Trip Plan Failed</h3>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="error-dismiss-btn"
          >
            Dismiss
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
