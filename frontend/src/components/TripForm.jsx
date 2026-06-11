import React, { useState } from 'react';

const TripForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_used: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    const formattedData = {
      current_location: formData.current_location,
      pickup_location: formData.pickup_location,
      dropoff_location: formData.dropoff_location,
      cycle_hours_used: parseFloat(formData.current_cycle_used || 0)
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-on-surface tracking-wide uppercase">Current Location</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">gps_fixed</span>
          <input 
            required
            name="current_location"
            value={formData.current_location}
            onChange={handleChange}
            className="w-full h-[40px] border border-outline-variant rounded pl-10 pr-3 text-sm bg-transparent text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" 
            placeholder="City, State or ZIP" 
            type="text" 
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-on-surface tracking-wide uppercase">Pickup Location</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-[18px]">place</span>
          <input 
            required
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleChange}
            className="w-full h-[40px] border border-outline-variant rounded pl-10 pr-3 text-sm bg-transparent text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" 
            placeholder="City, State or ZIP" 
            type="text" 
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-on-surface tracking-wide uppercase">Dropoff Location</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-[18px]">flag</span>
          <input 
            required
            name="dropoff_location"
            value={formData.dropoff_location}
            onChange={handleChange}
            className="w-full h-[40px] border border-outline-variant rounded pl-10 pr-3 text-sm bg-transparent text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" 
            placeholder="City, State or ZIP" 
            type="text" 
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-on-surface tracking-wide uppercase">Current Cycle Used (hrs)</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">schedule</span>
          <input 
            required
            name="current_cycle_used"
            value={formData.current_cycle_used}
            onChange={handleChange}
            className="w-full h-[40px] border border-outline-variant rounded pl-10 pr-3 text-sm bg-transparent text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" 
            type="number" 
            step="0.1"
            min="0"
            max="70"
            placeholder="0.0"
          />
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full h-[40px] rounded bg-[#004782] text-white text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              CALCULATING...
            </>
          ) : (
            <>
              Plan trip
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
      
    </form>
  );
};

export default TripForm;
