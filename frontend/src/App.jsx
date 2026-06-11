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
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-[56px] hairline-b bg-surface">
        <div className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
          SpotterAI
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors">verified_user</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors">code</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-2 rounded-full transition-colors">dark_mode</span>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 pt-[56px] overflow-hidden">
        
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col fixed top-[56px] left-0 bottom-0 w-[320px] p-4 overflow-y-auto hairline-r bg-surface-container-low text-primary z-40">
          <div className="mb-6 px-2">
            <div className="font-headline-md text-headline-md text-on-surface">Trip Planner</div>
            <div className="font-body-md text-body-md text-on-surface-variant">HOS & Routing</div>
          </div>
          
          <TripForm onSubmit={handlePlanTrip} isLoading={isLoading} />
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 md:ml-[320px] overflow-y-auto p-margin bg-background relative">
          <header className="mb-8 max-w-[1200px] mx-auto">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">ELD Trip Plan</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Review estimated hours of service compliance and routing details.</p>
          </header>

          <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12">
            {errorMessage && <ErrorMessage message={errorMessage} onRetry={() => setErrorMessage(null)} />}
            
            {isLoading && <LoadingSpinner />}

            {!isLoading && !tripResult && !errorMessage && (
              <div className="bg-surface-container-lowest hairline-all p-12 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[48px] text-outline mb-4">map</span>
                <h3 className="font-headline-md text-on-surface">No Trip Planned</h3>
                <p className="font-body-md text-on-surface-variant mt-2">Enter origin and destination details in the sidebar to generate a compliant ELD trip plan.</p>
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
