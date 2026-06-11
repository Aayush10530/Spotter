import { COLORS } from '../colorMap';

export const drawTotals = (ctx, logs, width, height, margin) => {
  if (!logs || logs.length === 0) return;

  const rowHeight = (height - margin.top - margin.bottom) / 4;
  
  // Calculate totals
  const totals = {
    OFF_DUTY: 0,
    SLEEPER: 0,
    DRIVING: 0,
    ON_DUTY: 0
  };

  logs.forEach(log => {
    if (totals[log.status] !== undefined) {
      totals[log.status] += log.duration_minutes;
    }
  });

  const formatHours = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  ctx.fillStyle = COLORS.textMain;
  ctx.font = '12px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // Draw in the right margin
  const textX = width - 10;

  const order = ['OFF_DUTY', 'SLEEPER', 'DRIVING', 'ON_DUTY'];
  order.forEach((status, i) => {
    const y = margin.top + i * rowHeight + rowHeight / 2;
    ctx.fillText(formatHours(totals[status]), textX, y);
  });
};
