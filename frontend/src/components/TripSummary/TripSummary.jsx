import React from 'react';
import './TripSummary.css';

const TripSummary = ({ summary }) => {
  if (!summary) return null;

  // Since backend mock may not include violations/is_compliant, default to compliant
  const isCompliant = summary.is_compliant !== false;

  return (
    <div className="trip-summary-container">
      <h2 className="trip-summary-title">Trip Summary</h2>
      
      <div className="trip-summary-content">
        
        {/* Compliance Status */}
        <div className={`compliance-status ${isCompliant ? 'compliant' : 'violation'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}>
            {isCompliant ? 'check_circle' : 'warning'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="compliance-title">{isCompliant ? 'FMCSA Compliant' : 'HOS Violation'}</span>
            {!isCompliant && summary.violations && summary.violations.length > 0 && (
              <ul className="compliance-list">
                {summary.violations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Distance</span>
            <span className="stat-value">{Math.round(summary.total_distance_miles || summary.total_miles || 0).toLocaleString()} mi</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Est. Duration</span>
            <span className="stat-value">{Math.round(summary.total_duration_hours || summary.total_drive_hours || 0)} hrs</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Duty Days</span>
            <span className="stat-value">{summary.total_days || 0} Days</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Fuel Stops</span>
            <span className="stat-value">{summary.fuel_stops || summary.total_fuel_stops || 0}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripSummary;
