import React from 'react';

const TripSummary = ({ summary }) => {
  if (!summary) return null;

  const isCompliant = summary.is_compliant;

  return (
    <div className="bg-surface hairline-all rounded-xl p-6 flex flex-col h-full">
      <h2 className="font-headline-md text-headline-md text-on-surface hairline-b pb-2 mb-4">Trip Summary</h2>
      
      <div className="flex flex-col gap-4 flex-1">
        
        {/* Compliance Status */}
        <div className={`p-4 rounded-lg flex items-start gap-3 ${isCompliant ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isCompliant ? 'check_circle' : 'warning'}
          </span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase">{isCompliant ? 'FMCSA Compliant' : 'HOS Violation'}</span>
            {!isCompliant && summary.violations && summary.violations.length > 0 && (
              <ul className="mt-1 font-body-md text-sm list-disc pl-4">
                {summary.violations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-surface-container-low hairline-all p-3 rounded-lg flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant mb-1">Total Distance</span>
            <span className="font-mono-data text-on-surface text-lg">{Math.round(summary.total_distance_miles).toLocaleString()} mi</span>
          </div>
          
          <div className="bg-surface-container-low hairline-all p-3 rounded-lg flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant mb-1">Est. Duration</span>
            <span className="font-mono-data text-on-surface text-lg">{Math.round(summary.total_duration_hours)} hrs</span>
          </div>

          <div className="bg-surface-container-low hairline-all p-3 rounded-lg flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant mb-1">Total Duty Days</span>
            <span className="font-mono-data text-on-surface text-lg">{summary.total_days} Days</span>
          </div>

          <div className="bg-surface-container-low hairline-all p-3 rounded-lg flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant mb-1">Fuel Stops</span>
            <span className="font-mono-data text-on-surface text-lg">{summary.fuel_stops || 0}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripSummary;
