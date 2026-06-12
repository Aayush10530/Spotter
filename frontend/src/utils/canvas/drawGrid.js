import { 
  GRID_LEFT, GRID_RIGHT, GRID_WIDTH, GRID_TOP, GRID_BOTTOM,
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

  // Header drawing removed from Canvas - now handled in HTML

  ctx.fillStyle = rootStyles.getPropertyValue('--color-on-surface-variant').trim() || '#424751';
  Object.keys(ROW_BOUNDARIES).forEach((status, i) => {
    const { top, bottom } = ROW_BOUNDARIES[status];
    
    if (i % 2 === 0) {
      ctx.fillStyle = rootStyles.getPropertyValue('--color-surface-container').trim() || '#f6f4eb';
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

  // Draw background strip for time labels
  ctx.fillStyle = rootStyles.getPropertyValue('--color-surface-container-high').trim() || '#f1efe8';
  ctx.fillRect(GRID_LEFT, GRID_TOP - 20, GRID_WIDTH, 20);

  ctx.fillStyle = colorOnSurface;
  ctx.textAlign = 'center';
  ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
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