import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-error-container hairline-all border-error rounded-xl p-6 flex items-start gap-4">
      <span className="material-symbols-outlined text-error text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
      <div className="flex-1">
        <h3 className="font-headline-md text-on-error-container mb-1">Trip Plan Failed</h3>
        <p className="font-body-md text-on-error-container mb-4">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="h-input_height px-6 rounded-lg bg-surface text-error font-label-md hover:bg-surface-container-high transition-colors"
          >
            DISMISS
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
