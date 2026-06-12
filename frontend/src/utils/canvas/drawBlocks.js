import { hourToX, statusToY, STATUS_COLORS } from './timeCoords';

export const drawBlocks = (ctx, timeBlocks) => {
  if (!timeBlocks || timeBlocks.length === 0) return;

  timeBlocks.forEach((block, idx) => {
    const x1 = hourToX(block.start_hour);
    const x2 = hourToX(block.end_hour);
    const y = statusToY(block.status);
    const statusKey = block.status?.toLowerCase();

    ctx.beginPath();
    ctx.lineWidth = 3.5;
    
    // Fallback to static colors if CSS variable is not found
    const rootStyles = getComputedStyle(document.body);
    const cssVarName = `--color-${statusKey.replace(/_/g, '-')}`;
    let strokeColor = rootStyles.getPropertyValue(cssVarName).trim();
    if (!strokeColor) {
      if (statusKey === 'on_duty_nd') strokeColor = rootStyles.getPropertyValue('--color-on-duty').trim();
    }
    
    ctx.strokeStyle = strokeColor || STATUS_COLORS[statusKey] || '#727782';
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();

    if (idx < timeBlocks.length - 1) {
      const nextBlock = timeBlocks[idx + 1];
      const nextY = statusToY(nextBlock.status);
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#c2c6d2'; 
      ctx.moveTo(x2, y);
      ctx.lineTo(x2, nextY);
      ctx.stroke();
    }
  });
};