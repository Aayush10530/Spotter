import { ROW_BOUNDARIES } from './timeCoords';

export const drawTotals = (ctx, dayData) => {
  const totals = dayData?.totals || {};
  ctx.fillStyle = '#1c1c17';
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const order = ['off_duty', 'sleeper_berth', 'driving', 'on_duty_nd'];
  order.forEach((status) => {
    const { center } = ROW_BOUNDARIES[status];
    const val = (totals[status] || 0).toFixed(1);
    ctx.fillText(val, 845, center);
  });

  ctx.textAlign = 'left';
  ctx.font = '12px Inter, sans-serif';
  const bottomY = 480;

  const summaryText = 
    `OFF: ${(totals.off_duty || 0).toFixed(1)} hr   |   ` +
    `SB: ${(totals.sleeper_berth || 0).toFixed(1)} hr   |   ` +
    `DRIVE: ${(totals.driving || 0).toFixed(1)} hr   |   ` +
    `ON: ${(totals.on_duty_nd || 0).toFixed(1)} hr   |   ` +
    `TOTAL: 24.0 hr`;
  
  ctx.fillText(summaryText, 80, bottomY);

  const workingVal = totals.total_working || 0;
  const workingText = `Working: ${workingVal.toFixed(1)} hr`;
  ctx.textAlign = 'right';
  ctx.fillText(workingText, 820, bottomY);

  ctx.strokeStyle = '#ba1a1a'; 
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(775, bottomY, 50, 12, 0, 0, 2 * Math.PI);
  ctx.stroke();
};