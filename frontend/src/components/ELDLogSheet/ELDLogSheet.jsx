import React, { useRef, useEffect } from 'react';
import { drawGrid } from '../../utils/canvas/drawGrid';
import { drawBlocks } from '../../utils/canvas/drawBlocks';
import { drawRemarks } from '../../utils/canvas/drawRemarks';
import { drawTotals } from '../../utils/canvas/drawTotals';

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
      // 4. Draw Remarks / Locations
      drawRemarks(ctx, dayData.logs, width, height, margin);
    }
    
  }, [dayData]);

  if (!dayData) return null;

  return (
    <div className="bg-surface-container-lowest hairline-all rounded-xl p-6 overflow-x-auto">
      <div className="flex justify-between items-end mb-4 min-w-[800px]">
        <div>
          <h3 className="font-headline-md text-on-surface">Day {dayData.day_number}</h3>
          <p className="font-body-md text-on-surface-variant">Logbook Grid (24-Hour)</p>
        </div>
        <div className="text-right">
          <p className="font-mono-data text-on-surface-variant">Vehicle: SpotterAI Demo</p>
          <p className="font-mono-data text-on-surface-variant">Timezone: Origin Local</p>
        </div>
      </div>
      
      <div className="min-w-[800px] flex justify-center">
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
};

export default ELDLogSheet;
