import React, { useState, useEffect } from 'react';
import TripForm from '../components/TripForm';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/dashboard/')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <TripForm />
          
          {/* Recent Trips Table */}
          <div className="bg-surface dark:bg-[#1C1C1E] rounded-xl border border-outline-variant dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-outline-variant dark:border-gray-800 flex justify-between items-center bg-surface-container-lowest dark:bg-black/20">
              <h3 className="text-[16px] font-semibold text-on-surface dark:text-white">Recent Trips</h3>
              <button className="text-primary text-[13px] font-semibold tracking-wider uppercase hover:opacity-80 transition-opacity">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] font-medium text-on-surface-variant dark:text-gray-300">
                <thead className="text-[11px] text-gray-500 uppercase bg-gray-50 dark:bg-black/30 border-b border-outline-variant dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Trip ID</th>
                    <th className="px-6 py-3 font-semibold">Route</th>
                    <th className="px-6 py-3 font-semibold">Driver</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recent_trips?.map((trip, i) => (
                    <tr key={i} className="border-b border-outline-variant dark:border-gray-800 last:border-0 hover:bg-surface-container-lowest dark:hover:bg-black/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">{trip.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{trip.route}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{trip.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${trip.status === 'Completed' ? 'bg-[#a7f3d0] text-[#065f46] dark:bg-[#064e3b] dark:text-[#34d399]' : 'bg-[#bfdbfe] text-[#1e40af] dark:bg-[#1e3a8a] dark:text-[#93c5fd]'}`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="material-symbols-outlined text-[20px] text-gray-400 cursor-pointer hover:text-primary transition-colors">visibility</span>
                      </td>
                    </tr>
                  ))}
                  {data && data.recent_trips?.length === 0 && (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No recent trips found.</td></tr>
                  )}
                  {!data && <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">Loading trips...</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          
          {/* Active Violation Card */}
          {data?.active_violation && (
            <div className="bg-[#fee2e2] dark:bg-[#7f1d1d] border border-[#fca5a5] dark:border-[#991b1b] rounded-xl p-6 shadow-sm relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -top-4 text-[120px] text-red-500/10 dark:text-red-900/30 rotate-12 select-none pointer-events-none">warning</span>
              
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-[18px] mb-4 relative z-10">
                <span className="material-symbols-outlined text-[24px]">error</span>
                Active Violation
              </div>

              <div className="flex justify-between items-end border-b border-red-200 dark:border-red-800 pb-3 mb-3 relative z-10">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">Driver</div>
                  <div className="text-[14px] font-semibold text-red-900 dark:text-white">{data.active_violation.driver}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">Time Logged</div>
                  <div className="text-[16px] font-bold text-red-700 dark:text-red-300">{data.active_violation.time_logged}</div>
                </div>
              </div>

              <div className="text-[12px] font-medium text-red-800 dark:text-red-200 leading-snug mb-5 relative z-10">
                {data.active_violation.message}
              </div>

              <button className="w-full bg-[#b91c1c] hover:bg-[#991b1b] dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold text-[13px] py-3 rounded-[4px] transition-colors relative z-10">
                CONTACT DRIVER
              </button>
            </div>
          )}

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[32px] text-emerald-500 mb-2">check_circle</span>
              <div className="text-[32px] font-bold text-on-surface dark:text-white leading-none">{data?.metrics?.active_units || '-'}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">Active Units</div>
            </div>
            
            <div className="bg-white dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[32px] text-[#eab308] mb-2">local_gas_station</span>
              <div className="text-[32px] font-bold text-on-surface dark:text-white leading-none">{data?.metrics?.refueling || '-'}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">Refueling</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
