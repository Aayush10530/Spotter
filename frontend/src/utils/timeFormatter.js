export const formatDuration = (minutes) => {
  if (minutes == null || isNaN(minutes)) return '0h 0m';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
};

export const formatDecimalHours = (decimalHours) => {
  if (decimalHours == null || isNaN(decimalHours)) return '00:00';
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};