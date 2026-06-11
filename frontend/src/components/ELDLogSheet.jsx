import React, { useRef, useEffect } from 'react';
import { drawGrid } from '../utils/canvas/drawGrid';
import { drawBlocks } from '../utils/canvas/drawBlocks';
import { drawRemarks } from '../utils/canvas/drawRemarks';
import { drawTotals } from '../utils/canvas/drawTotals';

const ELDLogSheet = ({ dayData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set up high DPI canvas
    const dpr = window.devicePixelRatio || 1;
    // We want physical width of 800px, height of 250px in CSS
    const width = 800;
    const height = 250;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Layout configuration
    const margin = {
      top: 30,
      bottom: 80, // larger bottom margin for remarks
      left: 50,
      right: 60
    };

    // 1. Draw Grid
    drawGrid(ctx, width, height, margin);
    
    // 2. Draw Graph Line (Blocks)
    if (dayData && dayData.logs) {
      drawBlocks(ctx, dayData.logs, width, height, margin);
      // 3. Draw Totals Column
      drawTotals(ctx, dayData.logs, width, height, margin);
      // 4. Draw Remarks / Locations (disabled, using DOM below instead)
      // drawRemarks(ctx, dayData.logs, width, height, margin);
    }
    
  }, [dayData]);

  if (!dayData) return null;

  return (
    <div className="bg-white dark:bg-[#1C1C1E] border border-outline-variant dark:border-gray-800 rounded-xl p-6 shadow-sm overflow-hidden mb-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-on-surface dark:text-white">Day {dayData.day_number}</h3>
          <p className="text-[13px] text-on-surface-variant dark:text-gray-400">Driver's Daily Log</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="px-4 h-[36px] border border-outline-variant dark:border-gray-700 rounded text-[13px] font-bold text-on-surface dark:text-gray-300 tracking-wide uppercase flex items-center gap-2 hover:bg-surface-container-lowest dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print
          </button>
          <button className="px-4 h-[36px] bg-[#004782] text-white rounded text-[13px] font-bold tracking-wide uppercase flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
        </div>
      </div>
      
      {/* Canvas Wrapper */}
      <div className="w-full overflow-x-auto pb-4 border-b border-outline-variant dark:border-gray-800">
        <div className="min-w-[800px] flex justify-center">
          <canvas ref={canvasRef} className="block" />
        </div>
      </div>

      {/* DOM Data Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        
        {/* Remarks Table */}
        <div>
          <h4 className="text-[14px] font-semibold text-on-surface dark:text-white mb-3 uppercase tracking-wide">Remarks</h4>
          <table className="w-full text-left text-[12px] text-on-surface-variant dark:text-gray-300 border border-outline-variant dark:border-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-[#121212] border-b border-outline-variant dark:border-gray-800">
              <tr>
                <th className="px-4 py-2 font-semibold">Time</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Location/Remarks</th>
              </tr>
            </thead>
            <tbody>
              {dayData.logs?.filter(log => log.status !== 'OFF').map((log, i) => (
                <tr key={i} className="border-b border-outline-variant dark:border-gray-800 last:border-0 hover:bg-surface-container-lowest dark:hover:bg-gray-800/50">
                  <td className="px-4 py-2 font-mono whitespace-nowrap">{log.start_time} - {log.end_time}</td>
                  <td className="px-4 py-2 font-bold">{log.status}</td>
                  <td className="px-4 py-2">{log.remark || 'Standard Operating'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recap Table */}
        <div>
          <h4 className="text-[14px] font-semibold text-on-surface dark:text-white mb-3 uppercase tracking-wide">70-hr / 8-day Recap</h4>
          <div className="border border-outline-variant dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2.5 bg-gray-50 dark:bg-[#121212] border-b border-outline-variant dark:border-gray-800">
              <span className="text-[12px] font-semibold text-on-surface dark:text-white">Hours available today</span>
              <span className="text-[12px] font-mono font-bold text-on-surface dark:text-white">11.00</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 border-b border-outline-variant dark:border-gray-800">
              <span className="text-[12px] text-on-surface-variant dark:text-gray-300">Hours worked today</span>
              <span className="text-[12px] font-mono text-on-surface-variant dark:text-gray-300">10.50</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 border-b border-outline-variant dark:border-gray-800">
              <span className="text-[12px] text-on-surface-variant dark:text-gray-300">Total hours 8 days</span>
              <span className="text-[12px] font-mono text-on-surface-variant dark:text-gray-300">45.50</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 bg-[#f0fdf4] dark:bg-[#064e3b] text-[#166534] dark:text-[#34d399]">
              <span className="text-[12px] font-semibold">Hours available tomorrow</span>
              <span className="text-[12px] font-mono font-bold">24.50</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ELDLogSheet;
