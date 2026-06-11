import React, { useState, useEffect } from 'react';
import { getFleetStatus } from '../../services/api';
import './FleetDashboard.css';

const FleetDashboard = ({ isOpen, onClose }) => {
  const [fleet, setFleet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchFleet();
    }
  }, [isOpen]);

  const fetchFleet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFleetStatus();
      setFleet(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch fleet data.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fleet-dashboard-overlay" onClick={onClose}>
      <div className="fleet-dashboard-panel" onClick={e => e.stopPropagation()}>
        <div className="fleet-dashboard-header">
          <h2 className="fleet-dashboard-title">
            <span className="material-symbols-outlined">local_shipping</span>
            Fleet Dashboard
          </h2>
          <button className="fleet-dashboard-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="fleet-dashboard-content">
          {isLoading && <p>Loading fleet data...</p>}
          {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
          
          {!isLoading && !error && fleet.map(truck => (
            <div key={truck.id} className="fleet-card">
              <div className="fleet-card-header">
                <span className="fleet-card-title">{truck.id}</span>
                <span className={`fleet-status-badge ${truck.status}`}>
                  {truck.status.replace('_', ' ')}
                </span>
              </div>
              <div className="fleet-card-details">
                <span>Driver: {truck.driver}</span>
                <span>Location: {truck.lat.toFixed(4)}, {truck.lng.toFixed(4)}</span>
              </div>
            </div>
          ))}

          {!isLoading && !error && fleet.length === 0 && (
            <p>No active trucks in fleet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;
