import React from 'react';
import './HOSCompliance.css';

const HOSCompliance = ({ summary }) => {
  if (!summary) return null;

  const drivingViolations = summary.violations?.filter(v => v.includes('11-hour'));
  const shiftViolations = summary.violations?.filter(v => v.includes('14-hour'));
  
  const hasDrivingViolation = drivingViolations && drivingViolations.length > 0;
  const hasShiftViolation = shiftViolations && shiftViolations.length > 0;

  return (
    <div className="hos-compliance-container">
      <h2 className="hos-compliance-title">HOS Compliance Status</h2>
      
      <div className="hos-compliance-list">
        {/* 11-Hour Driving Limit */}
        <div className={`hos-status-item ${hasDrivingViolation ? 'violation' : 'compliant'}`}>
          <span className={`material-symbols-outlined hos-icon ${hasDrivingViolation ? 'violation' : 'compliant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasDrivingViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="hos-details">
            <span className={`hos-label ${hasDrivingViolation ? 'violation' : 'compliant'}`}>11-Hour Driving Limit</span>
            <span className={`hos-value ${hasDrivingViolation ? 'violation' : 'compliant'}`}>
              {hasDrivingViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>

        {/* 14-Hour Shift Limit */}
        <div className={`hos-status-item ${hasShiftViolation ? 'violation' : 'compliant'}`}>
          <span className={`material-symbols-outlined hos-icon ${hasShiftViolation ? 'violation' : 'compliant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasShiftViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="hos-details">
            <span className={`hos-label ${hasShiftViolation ? 'violation' : 'compliant'}`}>14-Hour Shift Limit</span>
            <span className={`hos-value ${hasShiftViolation ? 'violation' : 'compliant'}`}>
              {hasShiftViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOSCompliance;
