import React, { useState } from 'react';
import './TripForm.css';

const TripForm = ({ onPlanTrip, isLoading }) => {
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
    
    onPlanTrip(formattedData);
  };

  return (
    <div className="trip-form-container">
      <header className="trip-form-header">
        <h1 className="trip-form-title">Plan your trip</h1>
        <p className="trip-form-subtitle">Enter your trip details to generate a route map and ELD-compliant daily logs.</p>
      </header>

      <form onSubmit={handleSubmit} className="trip-form">
        
        <div className="form-group">
          <label className="form-label">Current Location</label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined input-icon">my_location</span>
            <input 
              required
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              className="form-input" 
              placeholder="City, State or ZIP" 
              type="text" 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Pickup Location</label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined input-icon icon-pickup">location_on</span>
            <input 
              required
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              className="form-input" 
              placeholder="City, State or ZIP" 
              type="text" 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Dropoff Location</label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined input-icon icon-dropoff">flag</span>
            <input 
              required
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
              className="form-input" 
              placeholder="City, State or ZIP" 
              type="text" 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Cycle Used (hrs)</label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined input-icon">schedule</span>
            <input 
              required
              name="current_cycle_used"
              value={formData.current_cycle_used}
              onChange={handleChange}
              className="form-input font-mono" 
              type="number" 
              step="0.5"
              min="0"
              max="70"
              placeholder="0.0"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              CALCULATING...
            </>
          ) : (
            <>
              Plan trip
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
