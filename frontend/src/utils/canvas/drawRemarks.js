import { hourToX, timeLabelToHour, GRID_BOTTOM } from './timeCoords';

export const drawRemarks = (ctx, dayData) => {
  const remarks = dayData?.remarks || [];
  if (remarks.length === 0) return;

  ctx.strokeStyle = '#c2c6d2';
  ctx.fillStyle = '#1c1c17';
  ctx.lineWidth = 1;
  ctx.font = '9px Inter, sans-serif';

  remarks.forEach((rem) => {
    const hour = timeLabelToHour(rem.time_label);
    const x = hourToX(hour);

    ctx.beginPath();
    ctx.moveTo(x, GRID_BOTTOM);
    ctx.lineTo(x, GRID_BOTTOM + 15);
    ctx.stroke();

    ctx.save();
    ctx.translate(x, GRID_BOTTOM + 18);
    ctx.rotate(Math.PI / 4); 
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const shortLoc = rem.location ? rem.location.split(',')[0] : '';
    const label = `${rem.time_label} [${shortLoc}]: ${rem.activity}`;
    ctx.fillText(label, 0, 0);
    ctx.restore();
  });
};