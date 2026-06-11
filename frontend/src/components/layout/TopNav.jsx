import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function TopNav({ isDarkMode, toggleDarkMode, openChat }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[56px] border-b border-outline-variant bg-surface dark:bg-[#121212] dark:border-gray-800">
      
      {/* Left side: Logo and Main Nav Links */}
      <div className="flex items-center gap-10 h-full">
        <Link to="/" className="font-semibold text-[16px] text-on-surface dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
          <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
          SpotterAI ELD
        </Link>
        
        <div className="hidden md:flex h-full items-center gap-8 text-[13px] font-medium text-on-surface-variant dark:text-gray-400">
          <Link to="/dashboard" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/dashboard' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Dashboard</Link>
          <Link to="/" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Logs</Link>
          <Link to="/compliance" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/compliance' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Compliance</Link>
          <Link to="/reports" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/reports' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Reports</Link>
        </div>
      </div>

      {/* Right side: Utilities */}
      <div className="flex items-center gap-4 text-on-surface-variant dark:text-gray-300">
        <span 
          onClick={openChat}
          className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
          title="Dispatch Chat"
        >
          chat_bubble_outline
        </span>
        <span 
          onClick={toggleDarkMode} 
          className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
        <span 
          className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
          title="Notifications"
        >
          notifications
        </span>
        
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 ml-2 overflow-hidden border border-gray-300 dark:border-gray-600">
           <img src="https://i.pravatar.cc/100?img=11" alt="User Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
