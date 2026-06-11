import React, { useState } from 'react';

const TripForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    start_time: '',
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
    
    // Ensure start_time is in valid format if needed, but for now just pass the ISO string
    let formattedData = { ...formData };
    if (formData.start_time) {
      formattedData.start_time = new Date(formData.start_time).toISOString();
    }
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      
      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Current Location (Driver)</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">person_pin_circle</span>
          <input 
            required
            name="current_location"
            value={formData.current_location}
            onChange={handleChange}
            className="w-full h-input_height hairline-all rounded-lg pl-10 pr-3 font-body-md text-body-md bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Chicago, IL" 
            type="text" 
          />
        </div>
      </div>

      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Pickup Location</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">inventory_2</span>
          <input 
            required
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleChange}
            className="w-full h-input_height hairline-all rounded-lg pl-10 pr-3 font-body-md text-body-md bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Indianapolis, IN" 
            type="text" 
          />
        </div>
      </div>

      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Dropoff Location</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">flag</span>
          <input 
            required
            name="dropoff_location"
            value={formData.dropoff_location}
            onChange={handleChange}
            className="w-full h-input_height hairline-all rounded-lg pl-10 pr-3 font-body-md text-body-md bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Columbus, OH" 
            type="text" 
          />
        </div>
      </div>

      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Start Time (Local)</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">schedule</span>
          <input 
            required
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full h-input_height hairline-all rounded-lg pl-10 pr-3 font-body-md text-body-md bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            type="datetime-local" 
          />
        </div>
      </div>

      <div className="pt-4 mt-2 hairline-t">
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full h-input_height px-6 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              CALCULATING...
            </>
          ) : (
            'GENERATE ELD LOG'
          )}
        </button>
      </div>
      
    </form>
  );
};

export default TripForm;
