import React, { useState, useEffect } from 'react';
import { planTrip } from './api/tripApi';
import TripForm from './components/TripForm/TripForm';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import RouteMap from './components/RouteMap/RouteMap';
import TripSummary from './components/TripSummary/TripSummary';
import ELDLogSheet from './components/ELDLogSheet/ELDLogSheet';
import HOSCompliance from './components/HOSCompliance/HOSCompliance';
import StopTimeline from './components/StopTimeline/StopTimeline';
import './App.css';

function TripPlanner() {
  const [tripResult, setTripResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handlePlanTrip = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await planTrip(formData);
      setTripResult(data);
      setSelectedDay(1); 
    } catch (err) {
      setErrorMessage(err.error || err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const days = tripResult?.days || [];
  const activeDayData = days.find(d => d.day_number === selectedDay);

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="material-symbols-outlined">local_shipping</span>
          SpotterAI
        </div>
        <div className="nav-actions">
          <button className="nav-button" title="Toggle Theme" onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
            <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
        </div>
      </nav>

      <main className="main-content animate-slide-up">
        <section className="left-panel">
          {!tripResult ? (
            <TripForm onPlanTrip={handlePlanTrip} isLoading={isLoading} />
          ) : (
            <div className="left-panel-content">
              <button onClick={() => setTripResult(null)} className="back-button">
                <span className="material-symbols-outlined">arrow_back</span>
                Plan New Trip
              </button>
              <TripSummary summary={tripResult.summary} />
              <HOSCompliance summary={tripResult.summary} />
              <StopTimeline waypoints={tripResult.route?.waypoints} />
            </div>
          )}
        </section>

        <section className="right-panel">
          {errorMessage && (
            <div className="error-wrapper">
              <ErrorMessage message={errorMessage} onRetry={() => setErrorMessage(null)} />
            </div>
          )}

          {isLoading && (
            <div className="loading-wrapper">
              <LoadingSpinner />
            </div>
          )}

          {!isLoading && tripResult && (
            <div className="results-container">
              <div className="map-section">
                <RouteMap route={tripResult.route} />
              </div>

              <div className="logs-section">
                <h2 className="logs-title">Daily ELD Logs</h2>
                <div className="day-pills-container">
                  {days.map(d => (
                    <button
                      key={d.day_number}
                      className={`day-pill ${selectedDay === d.day_number ? 'active' : ''}`}
                      onClick={() => setSelectedDay(d.day_number)}
                    >
                      Day {d.day_number}
                    </button>
                  ))}
                </div>
                {activeDayData && <ELDLogSheet dayData={activeDayData} />}
              </div>
            </div>
          )}

          {!isLoading && !tripResult && !errorMessage && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <span className="material-symbols-outlined icon-route">route</span>
                <div className="pulse-bg"></div>
              </div>
              <h2 className="empty-state-title">Your trip plan will appear here</h2>
              <p className="empty-state-subtitle">
                Complete the form to generate route mapping, estimated ETA, and HOS compliance logs.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TripPlanner;