import React, { useState } from 'react';
import styles from './TripForm.module.css';

const FIELDS = [
  { name: 'current_location', label: 'Current Location', icon: 'my_location', placeholder: 'City, State or ZIP' },
  { name: 'pickup_location', label: 'Pickup Location', icon: 'location_on', iconStyle: 'pickup', placeholder: 'City, State or ZIP' },
  { name: 'dropoff_location', label: 'Dropoff Location', icon: 'flag', iconStyle: 'dropoff', placeholder: 'City, State or ZIP' },
  { name: 'current_cycle_used', label: 'Current Cycle Used (hrs)', icon: 'schedule', type: 'number', step: '0.5', min: '0', max: '70', placeholder: '0.0', mono: true }
];

const TripForm = ({ onPlanTrip, isLoading }) => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_used: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    onPlanTrip({
      current_location: formData.current_location,
      pickup_location: formData.pickup_location,
      dropoff_location: formData.dropoff_location,
      cycle_hours_used: parseFloat(formData.current_cycle_used || 0)
    });
  };

  return (
    <div className={styles.tripFormContainer}>
      <header className={styles.tripFormHeader}>
        <h1 className={styles.tripFormTitle}>Plan your trip</h1>
        <p className={styles.tripFormSubtitle}>Enter trip details to generate a route map and HOS logs.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.tripForm}>
        {FIELDS.map((field) => {
          let iconClass = styles.inputIcon;
          if (field.iconStyle === 'pickup') iconClass += ` ${styles.iconPickup}`;
          if (field.iconStyle === 'dropoff') iconClass += ` ${styles.iconDropoff}`;

          let inputClass = styles.formInput;
          if (field.mono) inputClass += ` ${styles.fontMono}`;

          return (
            <div key={field.name} className={styles.formGroup}>
              <label className={styles.formLabel}>{field.label}</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${iconClass}`}>
                  {field.icon}
                </span>
                <input
                  required
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={field.placeholder}
                  type={field.type || 'text'}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                />
              </div>
            </div>
          );
        })}

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? (
            <>
              <span className={`material-symbols-outlined ${styles.animateSpin}`}>progress_activity</span>
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