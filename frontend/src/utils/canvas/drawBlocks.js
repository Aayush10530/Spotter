import { COLORS } from './colorMap';

export const drawBlocks = (ctx, logs, width, height, margin) => {
  if (!logs || logs.length === 0) return;

  const rowHeight = (height - margin.top - margin.bottom) / 4;
  const pixelsPerMinute = (width - margin.left - margin.right) / 1440;

  ctx.lineWidth = 3;
  ctx.strokeStyle = COLORS.graphLine;
  ctx.beginPath();

  // Helper to get Y coordinate for status
  const getY = (status) => {
    switch (status) {
      case 'OFF_DUTY': return margin.top + rowHeight * 0.5;
      case 'SLEEPER': return margin.top + rowHeight * 1.5;
      case 'DRIVING': return margin.top + rowHeight * 2.5;
      case 'ON_DUTY': return margin.top + rowHeight * 3.5;
      default: return margin.top + rowHeight * 0.5;
    }
  };

  let currentX = margin.left;
  let lastY = null;

  logs.forEach((log, index) => {
    // start time in minutes from midnight
    const date = new Date(log.start_time);
    const startMinutes = date.getHours() * 60 + date.getMinutes();
    
    // Convert to x coordinates
    const startX = margin.left + startMinutes * pixelsPerMinute;
    const endX = startX + log.duration_minutes * pixelsPerMinute;
    const y = getY(log.status);

    if (index === 0) {
      ctx.moveTo(startX, y);
    } else if (lastY !== null && startX > currentX) {
      // Connect vertical drop/rise from previous status
      ctx.lineTo(startX, lastY);
      ctx.lineTo(startX, y);
    }

    ctx.lineTo(endX, y);
    
    currentX = endX;
    lastY = y;
  });

  ctx.stroke();
};
