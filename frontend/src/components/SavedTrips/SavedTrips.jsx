import React, { useState, useEffect } from 'react';
import { listTrips, deleteTrip } from '../../api/tripApi';
import styles from './SavedTrips.module.css';

const SavedTrips = ({ onSelectTrip, onRefreshTrigger }) => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrips = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await listTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message || 'Failed to load historical trips.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [onRefreshTrigger]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete trip.');
    }
  };

  return (
    <div className={styles.savedTripsContainer}>
      <h3 className={styles.title}>Saved Trip History</h3>
      {error && <div className={styles.error}>{error}</div>}
      {isLoading ? (
        <div className={styles.loading}>Loading history...</div>
      ) : trips.length === 0 ? (
        <div className={styles.empty}>No saved trips found.</div>
      ) : (
        <div className={styles.list}>
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip.data)}
              className={styles.tripCard}
            >
              <div className={styles.tripRoute}>
                <span className={styles.routeText}>{trip.origin_name.split(',')[0]}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
                <span className={styles.routeText}>{trip.dropoff_name.split(',')[0]}</span>
              </div>
              <div className={styles.tripMeta}>
                <span>{trip.total_miles} miles</span>
                <span>{new Date(trip.created_at).toLocaleDateString()}</span>
              </div>
              <button
                type="button"
                onClick={(e) => handleDelete(e, trip.id)}
                className={styles.deleteButton}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTrips;
