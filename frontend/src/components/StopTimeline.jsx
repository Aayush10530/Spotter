import React from 'react';

const StopTimeline = ({ waypoints }) => {
  if (!waypoints || waypoints.length === 0) return null;

  const getIcon = (type) => {
    switch(type) {
      case 'start': return 'play_arrow';
      case 'pickup': return 'inventory_2';
      case 'dropoff': return 'flag';
      case 'fuel': return 'local_gas_station';
      case 'rest': return 'bed';
      default: return 'place';
    }
  };

  const getBgClass = (type) => {
    switch(type) {
      case 'start': return 'bg-primary text-on-primary';
      case 'pickup': return 'bg-secondary text-on-secondary';
      case 'dropoff': return 'bg-error text-on-error';
      case 'fuel': return 'bg-[#e6b800] text-black';
      case 'rest': return 'bg-surface-variant text-on-surface-variant hairline-all';
      default: return 'bg-primary-container text-on-primary-container';
    }
  };

  return (
    <div className="bg-surface hairline-all rounded-xl p-6 flex flex-col gap-6">
      <h2 className="font-headline-md text-headline-md text-on-surface hairline-b pb-2">Stop Timeline</h2>
      
      <div className="relative pl-6 pt-2 pb-2">
        {/* Vertical connecting line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-[0.5px] bg-outline-variant"></div>
        
        {waypoints.map((wp, idx) => (
          <div key={idx} className={`relative z-10 flex items-start gap-4 ${idx < waypoints.length - 1 ? 'mb-6' : ''}`}>
            
            {/* Icon */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${getBgClass(wp.type)}`}>
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {getIcon(wp.type)}
              </span>
            </div>
            
            {/* Text content */}
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface">
                {wp.activity}: {wp.name.split(',')[0]}
              </span>
              <span className="font-mono-data text-mono-data text-on-surface-variant mt-1">
                Day {wp.day} - {wp.time_label || 'Time not set'}
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopTimeline;
