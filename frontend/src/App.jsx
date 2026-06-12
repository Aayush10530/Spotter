import React, { useState, useEffect } from 'react';
import { planTrip } from './services/api';
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
  
  // Theme state: default to light, check localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handlePlanTrip = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await planTrip(formData);
      setTripResult(data);
    } catch (err) {
      setErrorMessage(
        err.error || err.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="material-symbols-outlined">local_shipping</span>
          SpotterAI
        </div>
        <div className="nav-actions">
          <button className="nav-button" title="Toggle Theme" onClick={toggleTheme}>
            <span className="material-symbols-outlined">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content animate-slide-up">
        {/* Left Panel: Form or Summaries */}
        <section className="left-panel">
          {!tripResult ? (
            <TripForm onPlanTrip={handlePlanTrip} isLoading={isLoading} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
              <button 
                onClick={() => setTripResult(null)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  background: 'none', border: 'none', color: 'var(--color-primary)', 
                  cursor: 'pointer', padding: '8px 0', fontSize: '14px', fontWeight: '500' 
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                Plan New Trip
              </button>
              <TripSummary summary={tripResult.summary} />
              <HOSCompliance summary={tripResult.summary} />
              <StopTimeline waypoints={(tripResult.route_geometry || tripResult.route)?.waypoints} />
            </div>
          )}
        </section>

        {/* Right Panel: Results or Empty State */}
        <section className="right-panel">
          {errorMessage && (
            <div style={{ padding: 'var(--margin)' }}>
              <ErrorMessage message={errorMessage} onRetry={() => setErrorMessage(null)} />
            </div>
          )}

          {isLoading && (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <LoadingSpinner />
            </div>
          )}

          {!isLoading && tripResult && (
            <div className="results-container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
              {/* Map Section */}
              <div className="map-section" style={{ height: '350px', minHeight: '350px' }}>
                <RouteMap 
                  route={tripResult.route_geometry || tripResult.route}
                />
              </div>

              <div className="logs-section">
                <h2 className="logs-title">Daily ELD Logs</h2>
                {(tripResult.daily_logs || tripResult.days).map(day => (
                  <ELDLogSheet key={day.day_number} dayData={day} />
                ))}
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
