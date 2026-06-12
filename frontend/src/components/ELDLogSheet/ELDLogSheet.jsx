import React, { useRef, useEffect } from 'react';
import { drawGrid } from '../../utils/canvas/drawGrid';
import { drawBlocks } from '../../utils/canvas/drawBlocks';
import { exportELDLogPDF } from '../../utils/pdfExporter';
import styles from './ELDLogSheet.module.css';

const ELDLogSheet = ({ dayData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 860;
    const height = 280;
    
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
    }
  }, [dayData]);

  if (!dayData) return null;

  return (
    <div className={styles.eldLogsheetContainer}>
      <div className={styles.eldTopHeader}>
        <div className={styles.headerBlock}>
          <span className={styles.headerLabel}>DATE</span>
          <span className={styles.headerValue}>{dayData.date_label || 'Oct 25, 2023'}</span>
        </div>
        <div className={styles.headerBlock}>
          <span className={styles.headerLabel}>TOTAL DRIVING</span>
          <span className={styles.headerValue}>{dayData.total_miles || 0} miles</span>
        </div>
        <div className={styles.headerBlock}>
          <span className={styles.headerLabel}>EQUIPMENT</span>
          <span className={styles.headerValue}>TRK-01 / TRL-01</span>
        </div>
        <div className={styles.headerBlock}>
          <button onClick={() => exportELDLogPDF(dayData, canvasRef.current)} className={styles.pdfButton}>
            <span className="material-symbols-outlined">download</span>
            Export PDF
          </button>
        </div>
      </div>
      
      <div className={styles.eldCanvasWrapper}>
        <canvas ref={canvasRef} className={styles.eldCanvas} />
      </div>

      <div className={styles.eldBottomSection}>
        <div className={styles.remarksSection}>
          <h3 className={styles.sectionTitle}>Remarks</h3>
          <div className={styles.remarksTable}>
            {(dayData.remarks || []).map((rem, idx) => (
              <div key={idx} className={styles.remarkRow}>
                <span className={styles.remarkTime}>{rem.time_label}</span>
                <span className={styles.remarkText}>{rem.location} - {rem.activity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recapSection}>
          <h3 className={styles.sectionTitle}>70-hr / 8-day Recap</h3>
          <table className={styles.recapTable}>
            <thead>
              <tr>
                <th>METRIC</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hours Worked Today</td>
                <td>{(dayData.totals?.total_working || 0).toFixed(1)}</td>
              </tr>
              <tr>
                <td>Hours Worked Last 7 Days</td>
                <td>42.0</td>
              </tr>
              <tr>
                <td>Total Hours (8 Days)</td>
                <td>{(42.0 + (dayData.totals?.total_working || 0)).toFixed(1)}</td>
              </tr>
              <tr>
                <td>Hours Available Tomorrow</td>
                <td>{(70.0 - (42.0 + (dayData.totals?.total_working || 0))).toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ELDLogSheet;