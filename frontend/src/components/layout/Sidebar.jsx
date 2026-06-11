import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const isDispatcher = user?.role === 'DISPATCHER';

  return (
    <aside className="w-[320px] h-full flex-shrink-0 bg-surface dark:bg-[#121212] border-r border-outline-variant dark:border-gray-800 flex flex-col">
      
      {/* Unit Profile Header */}
      <div className="p-6 border-b border-outline-variant dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">{isDispatcher ? 'business' : 'local_shipping'}</span>
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-on-surface dark:text-white">{isDispatcher ? 'Dispatch HQ' : 'Unit 4022'}</h2>
            <p className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">{isDispatcher ? 'All Systems Go' : 'FMCSA Compliant'}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-4">
          
          <div className="mb-2">
             {/* Use basic divs for now, we can link them later if routes are added */}
             <NavItem icon="analytics" label="Summary" active={currentPath === '/dashboard'} />
             <NavItem icon="schedule" label="HOS Status" />
             <NavItem icon="route" label="Stop Timeline" />
             <NavItem icon="directions_car" label="Vehicle Info" />
             <NavItem icon="description" label="Documents" />
          </div>

          <hr className="my-2 border-outline-variant dark:border-gray-800" />
          
          <button className="w-full mt-2 bg-primary hover:bg-[#003865] text-white rounded-[4px] py-2 px-4 text-sm font-semibold transition-colors shadow-sm">
            START TRIP
          </button>
          
          <div className="mt-4">
             <NavItem icon="settings" label="Settings" />
             <NavItem icon="help" label="Support" />
          </div>

        </nav>
      </div>

    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#a7f3d0] text-[#065f46] dark:bg-[#064e3b] dark:text-[#34d399]' : 'text-on-surface-variant dark:text-gray-300 hover:bg-surface-container-high dark:hover:bg-gray-800'}`}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-[13px] font-medium">{label}</span>
    </div>
  );
}

export default Sidebar;
