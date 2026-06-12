import React, { useRef, useEffect } from 'react';
import { drawGrid } from '../../utils/canvas/drawGrid';
import { drawBlocks } from '../../utils/canvas/drawBlocks';
import { drawRemarks } from '../../utils/canvas/drawRemarks';
import { drawTotals } from '../../utils/canvas/drawTotals';
import styles from './ELDLogSheet.module.css';

const ELDLogSheet = ({ dayData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 860;
    const height = 520;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    if (dayData) {
      
      drawGrid(ctx, dayData);
      
      if (dayData.time_blocks) {
        drawBlocks(ctx, dayData.time_blocks);
      }
      
      drawTotals(ctx, dayData);
      
      drawRemarks(ctx, dayData);
    }
  }, [dayData]);

  if (!dayData) return null;

  return (
    <div className={styles.eldLogsheetContainer}>
      <div className={styles.eldHeader}>
        <div className={styles.eldHeaderLeft}>
          <h3 className={styles.eldTitle}>Day {dayData.day_number}</h3>
          <p className={styles.eldSubtitle}>FMCSA-Compliant Driver's Daily Log (24-Hour Grid)</p>
        </div>
        <div className={styles.eldHeaderRight}>
          <p className={styles.eldMeta}>Vehicle ID: CMV-7092</p>
          <p className={styles.eldMeta}>Timezone: Origin Local</p>
        </div>
      </div>
      
      <div className={styles.eldCanvasWrapper}>
        <canvas ref={canvasRef} className={styles.eldCanvas} />
      </div>
    </div>
  );
};

export default ELDLogSheet;