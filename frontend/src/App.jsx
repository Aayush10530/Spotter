import React, { useState } from 'react';
import { planTrip } from './api/tripApi';
import TripForm from './components/TripForm';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import RouteMap from './components/RouteMap';
import TripSummary from './components/TripSummary';
import ELDLogSheet from './components/ELDLogSheet';
import HOSCompliance from './components/HOSCompliance';
import StopTimeline from './components/StopTimeline';

function App() {
  const [tripResult, setTripResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background text-on-background">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[56px] border-b border-outline-variant bg-white">
        <div className="font-semibold text-[16px] text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
          SpotterAI
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors text-[20px]">chat_bubble_outline</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors text-[20px]">alt_route</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors text-[20px]">dark_mode</span>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 pt-[56px] overflow-hidden">
        
        {/* Left Half (Form area) */}
        <aside className={`flex flex-col h-full bg-[#FAF9F6] border-r border-outline-variant overflow-y-auto ${tripResult ? 'w-[360px] flex-shrink-0 border-r border-outline-variant' : 'w-1/2 justify-center items-center'}`}>
          <div className={`${tripResult ? 'w-full p-6' : 'w-full max-w-md p-8 bg-[#FAF9F6] border border-outline-variant rounded'}`}>
            {!tripResult && (
              <div className="mb-6">
                <h1 className="text-[22px] font-medium mb-2 text-on-surface">Plan your trip</h1>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">Enter your trip details to generate a route map and ELD-compliant daily logs.</p>
              </div>
            )}
            {tripResult && (
              <div className="mb-6">
                <h1 className="text-[22px] font-medium mb-1 text-on-surface">Trip Planner</h1>
                <p className="text-[13px] text-on-surface-variant">HOS & Routing</p>
              </div>
            )}
            <TripForm onSubmit={handlePlanTrip} isLoading={isLoading} />
          </div>
        </aside>

        {/* Right Half (Content area) */}
        <main className={`flex-1 h-full overflow-y-auto bg-white relative ${!tripResult ? 'flex flex-col items-center justify-center' : 'p-8'}`}>
          {tripResult && (
            <header className="mb-8 max-w-[1200px] mx-auto">
              <h1 className="text-3xl font-medium text-on-surface mb-2">ELD Trip Plan</h1>
              <p className="text-on-surface-variant">Review estimated hours of service compliance and routing details.</p>
            </header>
          )}

          <div className={`${!tripResult ? 'max-w-sm w-full text-center' : 'max-w-[1200px] mx-auto pb-12 flex flex-col gap-6'}`}>
            
            {errorMessage && <ErrorMessage message={errorMessage} onRetry={() => setErrorMessage(null)} />}
            
            {isLoading && <LoadingSpinner />}

            {!isLoading && !tripResult && !errorMessage && (
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-[180px] h-[180px] bg-surface-container-lowest rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[64px] text-outline-variant">route</span>
                </div>
                <h3 className="font-medium text-lg text-on-surface mb-2">Your trip plan will appear here</h3>
                <p className="text-[13px] text-on-surface-variant leading-relaxed px-4">Complete the form to generate route mapping, estimated ETA, and HOS compliance logs.</p>
              </div>
            )}

            {!isLoading && tripResult && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map View */}
                  <div className="lg:col-span-2 h-[400px] bg-surface hairline-all rounded-xl overflow-hidden p-2">
                     <RouteMap route={tripResult.route} />
                  </div>
                  {/* Summary & Timeline */}
                  <div className="lg:col-span-1 flex flex-col gap-6">
                     <TripSummary summary={tripResult.summary} />
                     <HOSCompliance summary={tripResult.summary} />
                     <StopTimeline waypoints={tripResult.route.waypoints} />
                  </div>
                </div>

                {/* Log Sheets */}
                <div className="mt-8">
                  <h2 className="font-headline-md text-headline-md text-on-surface hairline-b pb-2 mb-6">Generated Daily Logs</h2>
                  <div className="flex flex-col gap-8">
                    {tripResult.days.map((day) => (
                      <ELDLogSheet key={day.day_number} dayData={day} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
