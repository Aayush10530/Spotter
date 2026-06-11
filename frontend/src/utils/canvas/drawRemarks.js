import { COLORS } from '../colorMap';

export const drawRemarks = (ctx, logs, width, height, margin) => {
  if (!logs || logs.length === 0) return;

  const pixelsPerMinute = (width - margin.left - margin.right) / 1440;
  
  ctx.fillStyle = COLORS.textMain;
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  logs.forEach(log => {
    // Only put remarks for interesting status changes or locations
    if (log.location || ['PRE_TRIP', 'DROP_OFF', 'FUEL', 'BREAK_30_MIN', 'REST_10_HOUR'].includes(log.event_type)) {
      const date = new Date(log.start_time);
      const startMinutes = date.getHours() * 60 + date.getMinutes();
      const x = margin.left + startMinutes * pixelsPerMinute;
      
      const labelY = height - margin.bottom + 15;
      
      // Draw a small line from the bottom of the grid to the remark
      ctx.beginPath();
      ctx.strokeStyle = COLORS.gridLines;
      ctx.lineWidth = 1;
      ctx.moveTo(x, height - margin.bottom);
      ctx.lineTo(x, height - margin.bottom + 10);
      ctx.stroke();

      // We might need to handle overlapping text, but keep it simple for now
      let remarkText = log.location ? log.location.split(',')[0] : log.event_type.replace(/_/g, ' ');
      
      // Rotate text to save space
      ctx.save();
      ctx.translate(x, labelY);
      ctx.rotate(Math.PI / 4); // 45 degrees
      ctx.textAlign = 'left';
      ctx.fillText(remarkText, 0, 0);
      ctx.restore();
    }
  });
};
