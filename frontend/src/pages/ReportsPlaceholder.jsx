import React from 'react';

function ReportsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white dark:bg-[#121212]">
      <div className="w-[180px] h-[180px] bg-surface-container-lowest dark:bg-[#1E1E20] rounded-xl flex items-center justify-center mb-6 border border-outline-variant dark:border-gray-800">
        <span className="material-symbols-outlined text-[64px] text-[#eab308]">assessment</span>
      </div>
      <h1 className="text-2xl font-semibold text-on-surface dark:text-white mb-2">Fleet Reports</h1>
      <p className="text-[14px] text-on-surface-variant dark:text-gray-400 max-w-md">
        Reporting and analytics features are coming soon. This area will allow you to generate custom PDF reports for IFTA, IRP, and DOT audits.
      </p>
    </div>
  );
}

export default ReportsPlaceholder;
