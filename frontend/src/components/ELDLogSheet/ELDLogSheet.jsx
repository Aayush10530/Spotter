import React, { useRef, useEffect } from 'react';
import { drawGrid } from '../../utils/canvas/drawGrid';
import { drawBlocks } from '../../utils/canvas/drawBlocks';
import { drawRemarks } from '../../utils/canvas/drawRemarks';
import { drawTotals } from '../../utils/canvas/drawTotals';
import './ELDLogSheet.css';

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
    <div className="eld-logsheet-container">
      <div className="eld-header">
        <div className="eld-header-left">
          <h3 className="eld-title">Day {dayData.day_number}</h3>
          <p className="eld-subtitle">Logbook Grid (24-Hour)</p>
        </div>
        <div className="eld-header-right">
          <p className="eld-meta">Vehicle: SpotterAI Demo</p>
          <p className="eld-meta">Timezone: Origin Local</p>
        </div>
      </div>
      
      <div className="eld-canvas-wrapper">
        <canvas ref={canvasRef} className="eld-canvas" />
      </div>
    </div>
  );
};

export default ELDLogSheet;
