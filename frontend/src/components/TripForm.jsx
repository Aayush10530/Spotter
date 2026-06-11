import React, { useState } from 'react';

const TripForm = ({ onSubmit, isLoading }) => {
  const initialFormState = {
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_used: '',
    trailer_id: '',
    commodity: '',
    departure_time: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    const formattedData = {
      current_location: formData.current_location,
      pickup_location: formData.pickup_location,
      dropoff_location: formData.dropoff_location,
      cycle_hours_used: parseFloat(formData.current_cycle_used || 0),
      trailer_id: formData.trailer_id,
      commodity: formData.commodity,
      departure_time: formData.departure_time || null
    };
    
    onSubmit(formattedData);
  };

  return (
    <div className="bg-surface dark:bg-[#1C1C1E] rounded-xl border border-outline-variant dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary text-[20px]">add_location_alt</span>
        <h2 className="text-[18px] font-semibold text-on-surface dark:text-white">Plan your trip</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        
        {/* Row 1: Locations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Current Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-gray-400 text-[18px]">gps_fixed</span>
              <input required name="current_location" value={formData.current_location} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded pl-10 pr-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-gray-500" placeholder="City, State or ZIP" type="text" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Pickup Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-500 text-[18px]">place</span>
              <input required name="pickup_location" value={formData.pickup_location} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded pl-10 pr-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-gray-500" placeholder="City, State or ZIP" type="text" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Dropoff Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-red-600 dark:text-red-500 text-[18px]">flag</span>
              <input required name="dropoff_location" value={formData.dropoff_location} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded pl-10 pr-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-gray-500" placeholder="City, State or ZIP" type="text" />
            </div>
          </div>
        </div>

        {/* Row 2: Advanced Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-t border-outline-variant dark:border-gray-800 pt-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Cycle Used (hrs)</label>
            <input required name="current_cycle_used" value={formData.current_cycle_used} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded px-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" type="number" step="0.1" min="0" max="70" placeholder="0.0" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Trailer ID</label>
            <input name="trailer_id" value={formData.trailer_id} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded px-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. TR-992" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Commodity</label>
            <input name="commodity" value={formData.commodity} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded px-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Cargo description" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase">Est. Departure</label>
            <input name="departure_time" value={formData.departure_time} onChange={handleChange} className="w-full h-[40px] border border-outline-variant dark:border-gray-700 bg-surface-container-lowest dark:bg-black/20 rounded px-3 text-[13px] text-on-surface dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" type="datetime-local" />
          </div>
        </div>

        {/* Row 3: Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant dark:border-gray-800 mt-2">
          <button type="button" onClick={handleClear} className="px-6 h-[40px] rounded border border-outline-variant dark:border-gray-600 text-on-surface-variant dark:text-gray-300 text-[13px] font-bold tracking-wide uppercase hover:bg-surface-container-lowest dark:hover:bg-gray-800 transition-colors">
            Clear
          </button>
          <button type="submit" disabled={isLoading} className={`px-6 h-[40px] rounded bg-[#004782] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                CALCULATING...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px] transform rotate-90">route</span>
                GENERATE ROUTE
              </>
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default TripForm;
