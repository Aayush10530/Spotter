import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import ChatDrawer from '../ChatDrawer';

function MainLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Add/remove global dark class based on state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`h-screen w-full overflow-hidden flex flex-col transition-colors ${isDarkMode ? 'dark bg-[#121212] text-white' : 'bg-[#f8f6f0] text-on-background'}`}>
      
      <TopNav 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        openChat={() => setIsChatOpen(true)} 
      />

      <div className="flex flex-1 pt-[56px] overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative h-full">
          {children}
        </main>
      </div>

      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}

export default MainLayout;
