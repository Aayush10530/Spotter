import { COLORS } from '../colorMap';

export const drawGrid = (ctx, width, height, margin) => {
  const rowHeight = (height - margin.top - margin.bottom) / 4;
  const colWidth = (width - margin.left - margin.right) / 24;

  ctx.lineWidth = 1;
  ctx.strokeStyle = COLORS.gridLines;
  ctx.fillStyle = COLORS.gridLabels;
  ctx.font = '12px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // Draw row backgrounds
  // Row 1: OFF
  // Row 2: SB
  // Row 3: D (driving usually gets a subtle bg in the Stitch design)
  ctx.fillStyle = COLORS.headerRow;
  ctx.fillRect(0, margin.top + rowHeight * 2, width, rowHeight);

  // Draw 4 rows
  const labels = ['OFF', 'SB', 'D', 'ON'];
  for (let i = 0; i < 4; i++) {
    const y = margin.top + i * rowHeight;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(width - margin.right, y);
    ctx.stroke();

    // Row Labels
    ctx.fillStyle = COLORS.gridLabels;
    ctx.fillText(labels[i], margin.left - 10, y + rowHeight / 2);
  }
  // Bottom line
  ctx.beginPath();
  ctx.moveTo(margin.left, height - margin.bottom);
  ctx.lineTo(width - margin.right, height - margin.bottom);
  ctx.stroke();

  // Draw 24 columns (Hours)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  for (let i = 0; i <= 24; i++) {
    const x = margin.left + i * colWidth;
    
    // Draw vertical lines
    ctx.beginPath();
    ctx.moveTo(x, margin.top);
    ctx.lineTo(x, height - margin.bottom);
    
    // Thicker lines for Noon and Midnight (0, 12, 24)
    if (i === 0 || i === 12 || i === 24) {
      ctx.lineWidth = 2;
    } else {
      ctx.lineWidth = 1;
    }
    
    // Dashed lines for quarter hours could be added, but skipping for simplicity
    ctx.stroke();

    // Hour Labels above grid
    if (i < 24) {
      let label = '';
      if (i === 0) label = 'M';
      else if (i === 12) label = 'N';
      else label = (i > 12 ? i - 12 : i).toString();
      
      ctx.fillText(label, x, margin.top - 5);
    } else if (i === 24) {
      ctx.fillText('M', x, margin.top - 5);
    }
  }

  // Draw quarter-hour tick marks on top line
  ctx.lineWidth = 1;
  for (let i = 0; i < 24; i++) {
    for (let q = 1; q < 4; q++) {
      const qx = margin.left + i * colWidth + q * (colWidth / 4);
      ctx.beginPath();
      ctx.moveTo(qx, margin.top);
      ctx.lineTo(qx, margin.top + 4); // Tick down
      ctx.stroke();
    }
  }
};
