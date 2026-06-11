import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="bg-surface-container-lowest hairline-all p-12 rounded-xl text-center flex flex-col items-center justify-center">
      <span className="material-symbols-outlined text-[48px] text-primary animate-spin mb-4">progress_activity</span>
      <h3 className="font-headline-md text-on-surface">Generating ELD Logbook...</h3>
      <p className="font-body-md text-on-surface-variant mt-2">Calculating hours of service compliance, routing, and fuel stops.</p>
    </div>
  );
};

export default LoadingSpinner;
