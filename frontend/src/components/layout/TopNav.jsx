import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function TopNav({ isDarkMode, toggleDarkMode, openChat }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();

  const isDispatcher = user?.role === 'DISPATCHER';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[56px] border-b border-outline-variant bg-surface dark:bg-[#121212] dark:border-gray-800">
      
      {/* Left side: Logo and Main Nav Links */}
      <div className="flex items-center gap-10 h-full">
        <Link to="/" className="font-semibold text-[16px] text-on-surface dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
          <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
          SpotterAI ELD
        </Link>
        
        <div className="hidden md:flex h-full items-center gap-8 text-[13px] font-medium text-on-surface-variant dark:text-gray-400">
          {isDispatcher && (
              <Link to="/dashboard" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/dashboard' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Dashboard</Link>
          )}
          <Link to="/" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Logs</Link>
          {isDispatcher && (
              <>
                <Link to="/compliance" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/compliance' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Compliance</Link>
                <Link to="/reports" className={`h-full flex items-center border-b-2 transition-colors ${currentPath === '/reports' ? 'border-primary text-primary dark:text-primary' : 'border-transparent hover:text-on-surface dark:hover:text-gray-200'}`}>Reports</Link>
              </>
          )}
        </div>
      </div>

      {/* Right side: Utilities */}
      <div className="flex items-center gap-4 text-on-surface-variant dark:text-gray-300 relative">
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
        <div className="relative">
          <span 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high dark:hover:bg-gray-800 p-2 rounded-full transition-colors text-[20px]"
            title="Notifications"
          >
            notifications
          </span>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-64 bg-white dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-lg shadow-lg py-3 px-4 z-50 animate-in fade-in slide-in-from-top-2">
              <h4 className="text-[13px] font-bold text-on-surface dark:text-white mb-2 pb-2 border-b border-outline-variant dark:border-gray-800">Notifications</h4>
              <p className="text-[12px] text-on-surface-variant dark:text-gray-400 text-center py-4">No new alerts.</p>
            </div>
          )}
        </div>
        
        {/* User Avatar */}
        <div className="relative ml-2">
            <div 
                className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-80 transition-opacity" 
                title="User Profile"
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            >
                <img src={`https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=random`} alt="User Profile" className="w-full h-full object-cover" />
            </div>
            
            {showProfile && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-outline-variant dark:border-gray-800 mb-2">
                        <p className="text-[14px] font-semibold text-on-surface dark:text-white">{user?.first_name} {user?.last_name}</p>
                        <p className="text-[11px] text-on-surface-variant dark:text-gray-400 uppercase tracking-wider mt-1">{user?.role}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-[13px] text-red-600 dark:text-red-400 hover:bg-surface-container-high dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
