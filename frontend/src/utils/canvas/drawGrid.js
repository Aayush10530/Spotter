import { 
  GRID_LEFT, GRID_RIGHT, GRID_TOP, GRID_BOTTOM,
  ROW_BOUNDARIES, STATUS_LABELS, hourToX 
} from './timeCoords';

export const drawGrid = (ctx, dayData) => {
  const rootStyles = getComputedStyle(document.body);
  const colorBorder = rootStyles.getPropertyValue('--color-border').trim() || '#c2c6d2';
  const colorOnSurface = rootStyles.getPropertyValue('--color-on-surface').trim() || '#1c1c17';
  const colorSurfaceLow = rootStyles.getPropertyValue('--color-surface-container-low').trim() || '#f6f4eb';
  const colorSurfaceHigh = rootStyles.getPropertyValue('--color-surface-container-high').trim() || '#eae8e0';

  ctx.strokeStyle = colorBorder;
  ctx.lineWidth = 1;
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';

  const headerGrad = ctx.createLinearGradient(10, 10, 10, 110);
  headerGrad.addColorStop(0, colorSurfaceLow);
  headerGrad.addColorStop(1, colorSurfaceHigh);
  
  ctx.fillStyle = headerGrad;
  ctx.fillRect(10, 10, 840, 100);
  ctx.strokeRect(10, 10, 840, 100);

  ctx.fillStyle = colorOnSurface;
  ctx.textAlign = 'left';
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`DATE: ${dayData?.date_label || 'N/A'}`, 25, 45);
  ctx.fillText(`TOTAL MILES: ${dayData?.total_miles || 0} mi`, 25, 80);
  ctx.fillText(`CARRIER: SpotterAI Logistics`, 250, 45);
  ctx.fillText(`TRACTOR #: CMV-7092`, 250, 80);
  
  ctx.fillText(`DRIVER SIGNATURE: _______________________`, 500, 45);
  ctx.fillText(`CO-DRIVER: N/A`, 500, 80);

  ctx.fillStyle = rootStyles.getPropertyValue('--color-on-surface-variant').trim() || '#424751';
  Object.keys(ROW_BOUNDARIES).forEach((status, i) => {
    const { top, bottom } = ROW_BOUNDARIES[status];
    
    if (i % 2 === 0) {
      ctx.fillStyle = rootStyles.getPropertyValue('--color-surface').trim() || '#fdfdfb';
      ctx.fillRect(GRID_LEFT, top, GRID_RIGHT - GRID_LEFT, bottom - top);
    }
    
    ctx.beginPath();
    ctx.moveTo(GRID_LEFT, top);
    ctx.lineTo(GRID_RIGHT, top);
    ctx.moveTo(GRID_LEFT, bottom);
    ctx.lineTo(GRID_RIGHT, bottom);
    ctx.stroke();

    ctx.fillStyle = colorOnSurface;
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(STATUS_LABELS[status], GRID_LEFT - 10, (top + bottom) / 2 + 4);
  });

  ctx.textAlign = 'center';
  ctx.font = '10px "Plus Jakarta Sans", sans-serif';
  for (let h = 0; h <= 24; h++) {
    const x = hourToX(h);
    ctx.lineWidth = (h === 0 || h === 12 || h === 24) ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, GRID_TOP);
    ctx.lineTo(x, GRID_BOTTOM);
    ctx.stroke();

    let lbl = h === 0 || h === 24 ? 'M' : h === 12 ? 'N' : (h > 12 ? h - 12 : h).toString();
    ctx.fillText(lbl, x, GRID_TOP - 8);

    if (h < 24) {
      ctx.lineWidth = 1;
      for (let q = 1; q <= 3; q++) {
        const qx = x + q * (740 / 96);
        ctx.beginPath();
        ctx.moveTo(qx, GRID_TOP);
        ctx.lineTo(qx, GRID_TOP + 4);
        ctx.stroke();
      }
    }
  }
};