import React from 'react';

const HOSCompliance = ({ summary }) => {
  if (!summary) return null;

  const drivingViolations = summary.violations?.filter(v => v.includes('11-hour'));
  const shiftViolations = summary.violations?.filter(v => v.includes('14-hour'));
  
  const hasDrivingViolation = drivingViolations && drivingViolations.length > 0;
  const hasShiftViolation = shiftViolations && shiftViolations.length > 0;

  return (
    <div className="bg-surface dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
      <h2 className="text-[16px] font-semibold text-on-surface dark:text-white pb-2 border-b border-outline-variant dark:border-gray-800">Timeline & Status</h2>
      
      <div className="flex flex-col gap-3 pt-2">
        {/* 11-Hour Driving Limit */}
        <div className={`h-[64px] flex items-center gap-4 px-5 rounded-md border ${hasDrivingViolation ? 'bg-[#fee2e2] dark:bg-[#7f1d1d] border-[#fca5a5] dark:border-[#991b1b]' : 'bg-white dark:bg-[#121212] border-outline-variant dark:border-gray-700'}`}>
          <span className={`material-symbols-outlined text-[20px] ${hasDrivingViolation ? 'text-red-600 dark:text-red-300' : 'text-[#059669] dark:text-[#34d399]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasDrivingViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className={`text-[13px] font-semibold ${hasDrivingViolation ? 'text-red-900 dark:text-white' : 'text-on-surface dark:text-white'}`}>11-Hour Driving Limit</span>
            <span className={`font-mono text-[11px] font-medium mt-0.5 ${hasDrivingViolation ? 'text-red-700 dark:text-red-300' : 'text-on-surface-variant dark:text-gray-400'}`}>
              {hasDrivingViolation ? 'Violation Detected' : '04:32 remaining'}
            </span>
          </div>
        </div>

        {/* 14-Hour Shift Limit */}
        <div className={`h-[64px] flex items-center gap-4 px-5 rounded-md border ${hasShiftViolation ? 'bg-[#fee2e2] dark:bg-[#7f1d1d] border-[#fca5a5] dark:border-[#991b1b]' : 'bg-white dark:bg-[#121212] border-outline-variant dark:border-gray-700'}`}>
          <span className={`material-symbols-outlined text-[20px] ${hasShiftViolation ? 'text-red-600 dark:text-red-300' : 'text-[#059669] dark:text-[#34d399]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {hasShiftViolation ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className={`text-[13px] font-semibold ${hasShiftViolation ? 'text-red-900 dark:text-white' : 'text-on-surface dark:text-white'}`}>14-Hour Shift Limit</span>
            <span className={`font-mono text-[11px] font-medium mt-0.5 ${hasShiftViolation ? 'text-red-700 dark:text-red-300' : 'text-on-surface-variant dark:text-gray-400'}`}>
              {hasShiftViolation ? 'Violation: +01:15' : 'Compliant'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOSCompliance;
