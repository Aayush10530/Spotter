import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TripPlanner from './pages/TripPlanner';
import FleetDashboard from './pages/FleetDashboard';
import ChatDrawer from './components/ChatDrawer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`h-screen w-full overflow-hidden flex flex-col transition-colors ${isDarkMode ? 'dark bg-[#121212] text-white' : 'bg-background text-on-background'}`}>
      
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[56px] border-b border-outline-variant bg-white dark:bg-[#1C1C1E] dark:border-gray-800">
        <Link to="/" className="font-semibold text-[16px] text-on-surface dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[20px] dark:text-gray-300" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
          SpotterAI
        </Link>
        <div className="flex items-center gap-4 text-on-surface-variant dark:text-gray-300">
          <span 
            onClick={() => setIsChatOpen(true)}
            className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
            title="Dispatch Chat"
          >
            chat_bubble_outline
          </span>
          <span 
            onClick={() => navigate('/fleet')}
            className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
            title="Fleet View"
          >
            alt_route
          </span>
          <span 
            onClick={toggleDarkMode} 
            className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </div>
      </nav>

      {/* Main Layout Area for Routes */}
      <div className="flex flex-1 pt-[56px] overflow-hidden">
        <Routes>
          <Route path="/" element={<TripPlanner />} />
          <Route path="/fleet" element={<FleetDashboard />} />
        </Routes>
      </div>

      {/* Global Overlays */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}

export default App;
