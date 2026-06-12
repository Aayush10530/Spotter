import React, { useState, useEffect, useContext } from 'react';
import { planTrip } from './api/tripApi';
import { AuthContext } from './contexts/AuthContext';
import TripForm from './components/TripForm/TripForm';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import RouteMap from './components/RouteMap/RouteMap';
import TripSummary from './components/TripSummary/TripSummary';
import ELDLogSheet from './components/ELDLogSheet/ELDLogSheet';
import HOSCompliance from './components/HOSCompliance/HOSCompliance';
import StopTimeline from './components/StopTimeline/StopTimeline';
import SavedTrips from './components/SavedTrips/SavedTrips';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserIcon from './components/UserIcon/UserIcon';
import './App.css';

function TripPlanner() {
  const { user, logout } = useContext(AuthContext);
  const [tripResult, setTripResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handlePlanTrip = async (formData) => {
    if (!user) {
      setIsLoginOpen(true);
      setErrorMessage('Please login to plan and save your trips.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await planTrip(formData);
      setTripResult(data.data);
      setSelectedDay(1);
      setHistoryRefresh(prev => prev + 1);
    } catch (err) {
      setErrorMessage(err.error || err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const days = tripResult?.days || [];
  const activeDay = days.find(d => d.day_number === selectedDay);

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="material-symbols-outlined icon-logo">local_shipping</span>SpotterAI
        </div>
        <div className="nav-actions">
          {user ? (
            <div className="user-profile">
              <span className="user-welcome">Welcome, {user.username}</span>
              <button className="nav-button logout-btn" onClick={logout}>
                <span className="material-symbols-outlined">logout</span>Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="nav-button" 
                onClick={() => setIsLoginOpen(true)}
                title="Login / Sign Up"
                style={{ padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <UserIcon width={24} height={24} />
              </button>
            </div>
          )}
          <button className="nav-button theme-toggle" onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
            <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
        </div>
      </nav>

      <main className="main-content animate-slide-up">
        <section className="left-panel">
          {!tripResult ? (
            <div className="left-panel-content">
              <TripForm onPlanTrip={handlePlanTrip} isLoading={isLoading} />
              {user && <SavedTrips onSelectTrip={setTripResult} onRefreshTrigger={historyRefresh} />}
            </div>
          ) : (
            <div className="left-panel-content">
              <button onClick={() => setTripResult(null)} className="back-button">
                <span className="material-symbols-outlined">arrow_back</span>Plan New Trip
              </button>
              <TripSummary summary={tripResult.summary} />
              <HOSCompliance summary={tripResult.summary} />
              <StopTimeline waypoints={tripResult.route?.waypoints} />
            </div>
          )}
        </section>

        <section className="right-panel">
          {errorMessage && <div className="error-wrapper"><ErrorMessage message={errorMessage} onRetry={() => setErrorMessage(null)} /></div>}
          {isLoading && <div className="loading-wrapper"><LoadingSpinner /></div>}
          {!isLoading && tripResult && (
            <div className="results-container">
              <div className="map-section" style={{ height: '350px', minHeight: '350px' }}>
                <RouteMap route={tripResult.route_geometry || tripResult.route} theme={theme} />
              </div>
              <div className="logs-section">
                <h2 className="logs-title">Daily ELD Logs</h2>
                <div className="day-pills-container">
                  {days.map(d => (
                    <button key={d.day_number} className={`day-pill ${selectedDay === d.day_number ? 'active' : ''}`} onClick={() => setSelectedDay(d.day_number)}>
                      Day {d.day_number}
                    </button>
                  ))}
                </div>
                {activeDay && <ELDLogSheet dayData={activeDay} />}
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
              <p className="empty-state-subtitle">Complete the form to generate route mapping and HOS compliance logs.</p>
            </div>
          )}
        </section>
      </main>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} />
    </div>
  );
}

export default TripPlanner;