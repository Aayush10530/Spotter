import React from 'react';

const HOSCompliance = ({ summary }) => {
  if (!summary) return null;

  // Calculate remaining or violation times based on summary data.
  // The summary object from our API includes:
  // "violations": ["Exceeded 14-hour window by 2.5 hours", ...]
  
  // To keep it simple, we check if there are violations. If so, we show them.
  // We can show the driving and shift limits as green if compliant, or red if not.
  const drivingViolations = summary.violations?.filter(v => v.includes('11-hour'));
  const shiftViolations = summary.violations?.filter(v => v.includes('14-hour'));
  
  const hasDrivingViolation = drivingViolations && drivingViolations.length > 0;
  const hasShiftViolation = shiftViolations && shiftViolations.length > 0;

  return (
    <div className="bg-surface hairline-all rounded-xl p-6 flex flex-col gap-6">
      <h2 className="font-headline-md text-headline-md text-on-surface hairline-b pb-2">HOS Compliance Status</h2>
      
      <div className="flex flex-col gap-2">
        {/* 11-Hour Driving Limit */}
        <div className={`h-[56px] flex items-center gap-4 px-4 hairline-all rounded-lg ${hasDrivingViolation ? 'bg-error-container border-error' : 'bg-surface-container-lowest'}`}>
          <span className={`material-symbols-outlined text-[24px] ${hasDrivingViolation ? 'text-error' : 'text-secondary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasDrivingViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className={`font-label-md text-label-md ${hasDrivingViolation ? 'text-on-error-container' : 'text-on-surface'}`}>11-Hour Driving Limit</span>
            <span className={`font-mono-data text-mono-data ${hasDrivingViolation ? 'text-error' : 'text-on-surface-variant'}`}>
              {hasDrivingViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>

        {/* 14-Hour Shift Limit */}
        <div className={`h-[56px] flex items-center gap-4 px-4 hairline-all rounded-lg ${hasShiftViolation ? 'bg-error-container border-error' : 'bg-surface-container-lowest'}`}>
          <span className={`material-symbols-outlined text-[24px] ${hasShiftViolation ? 'text-error' : 'text-secondary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasShiftViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className={`font-label-md text-label-md ${hasShiftViolation ? 'text-on-error-container' : 'text-on-surface'}`}>14-Hour Shift Limit</span>
            <span className={`font-mono-data text-mono-data ${hasShiftViolation ? 'text-error' : 'text-on-surface-variant'}`}>
              {hasShiftViolation ? 'Violation Detected' : 'Compliant'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOSCompliance;
