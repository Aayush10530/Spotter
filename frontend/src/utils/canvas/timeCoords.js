export const CANVAS_WIDTH = 860;
export const CANVAS_HEIGHT = 520;

export const GRID_LEFT = 80;
export const GRID_RIGHT = 820;
export const GRID_WIDTH = 740;

export const GRID_TOP = 20;
export const GRID_BOTTOM = 260;
export const GRID_HEIGHT = 240;

export const ROW_BOUNDARIES = {
  off_duty: { top: 40, bottom: 75, center: 57.5 },
  sleeper_berth: { top: 95, bottom: 130, center: 112.5 },
  driving: { top: 150, bottom: 185, center: 167.5 },
  on_duty_nd: { top: 205, bottom: 240, center: 222.5 }
};

export const STATUS_COLORS = {
  off_duty: '#95a5a6',      
  sleeper_berth: '#3498db', 
  driving: '#2ecc71',       
  on_duty_nd: '#e74c3c'     
};

export const STATUS_LABELS = {
  off_duty: '1. Off Duty',
  sleeper_berth: '2. Sleeper Berth',
  driving: '3. Driving',
  on_duty_nd: '4. On Duty (Not Driving)'
};

export const hourToX = (hour) => {
  return GRID_LEFT + (hour / 24) * GRID_WIDTH;
};

export const statusToY = (status) => {
  const normStatus = status?.toLowerCase();
  if (normStatus === 'off_duty' || normStatus === 'off') {
    return ROW_BOUNDARIES.off_duty.center;
  }
  if (normStatus === 'sleeper_berth' || normStatus === 'sleeper' || normStatus === 'sb') {
    return ROW_BOUNDARIES.sleeper_berth.center;
  }
  if (normStatus === 'driving' || normStatus === 'd') {
    return ROW_BOUNDARIES.driving.center;
  }
  if (normStatus === 'on_duty_nd' || normStatus === 'on_duty' || normStatus === 'on') {
    return ROW_BOUNDARIES.on_duty_nd.center;
  }
  return ROW_BOUNDARIES.off_duty.center; 
};

export const timeLabelToHour = (timeLabel) => {
  if (!timeLabel) return 0;
  const match = timeLabel.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours + minutes / 60;
};