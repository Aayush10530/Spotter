import React, { useState, useEffect } from 'react';

export const JobStatusTracker = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div className="bg-surface dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-[16px] font-semibold text-on-surface dark:text-white mb-6">Job Status</h3>
      
      <div className="flex flex-col gap-0 relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-outline-variant dark:bg-gray-800 z-0"></div>
        
        <StatusStep 
          label="Geocoding locations..." 
          status={step >= 0 ? (step > 0 ? 'done' : 'active') : 'pending'} 
        />
        <StatusStep 
          label="Calculating route..." 
          status={step >= 1 ? (step > 1 ? 'done' : 'active') : 'pending'} 
        />
        <StatusStep 
          label="Generating ELD logs..." 
          status={step >= 2 ? 'active' : 'pending'} 
        />
      </div>
    </div>
  );
};

const StatusStep = ({ label, status }) => {
  return (
    <div className="flex items-start gap-4 py-3 relative z-10">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
        status === 'done' ? 'bg-[#059669] text-white' : 
        status === 'active' ? 'bg-[#2563eb] text-white animate-pulse' : 
        'bg-surface-container-high dark:bg-gray-800 border-2 border-outline-variant dark:border-gray-600'
      }`}>
        {status === 'done' && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
        {status === 'active' && <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>}
      </div>
      <div className={`text-[13px] font-medium pt-1 ${status === 'pending' ? 'text-gray-400' : (status === 'active' ? 'text-[#2563eb] dark:text-[#60a5fa]' : 'text-on-surface dark:text-gray-200')}`}>
        {label}
      </div>
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      
      {/* Top Header Skeleton */}
      <div className="bg-surface dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-4 flex justify-between shadow-sm">
         <div className="w-1/3 h-5 bg-surface-container-high dark:bg-gray-800 rounded"></div>
         <div className="w-1/4 h-5 bg-surface-container-high dark:bg-gray-800 rounded"></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Job Status) */}
        <div className="xl:col-span-1">
          <JobStatusTracker />
        </div>

        {/* Right Column (Wireframes) */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          
          {/* Map Wireframe */}
          <div className="bg-surface dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col gap-4">
             <div className="flex justify-between">
                <div className="w-32 h-6 bg-surface-container-high dark:bg-gray-800 rounded"></div>
                <div className="w-24 h-6 bg-surface-container-high dark:bg-gray-800 rounded"></div>
             </div>
             <div className="w-full h-full bg-surface-container-lowest dark:bg-gray-900 rounded-lg flex-1 border border-outline-variant dark:border-gray-800"></div>
          </div>

          {/* Log Sheet Wireframe */}
          <div className="bg-surface dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
             <div className="flex justify-between">
                <div className="w-24 h-6 bg-surface-container-high dark:bg-gray-800 rounded"></div>
                <div className="w-16 h-6 bg-surface-container-high dark:bg-gray-800 rounded"></div>
             </div>
             <div className="w-full h-40 bg-surface-container-lowest dark:bg-gray-900 rounded border border-outline-variant dark:border-gray-800 mt-2"></div>
             <div className="w-3/4 h-4 bg-surface-container-high dark:bg-gray-800 rounded mt-4"></div>
             <div className="w-1/2 h-4 bg-surface-container-high dark:bg-gray-800 rounded"></div>
          </div>

        </div>

      </div>
    </div>
  );
};
