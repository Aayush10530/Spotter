import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteMap = ({ route }) => {
  if (!route || !route.polyline || route.polyline.length === 0) {
    return <div className="w-full h-full flex items-center justify-center bg-surface-container-low text-on-surface-variant font-body-md">No route data available</div>;
  }

  const positions = route.polyline;
  
  // Calculate center of map
  const lats = positions.map(p => p[0]);
  const lngs = positions.map(p => p[1]);
  const center = [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2
  ];

  // Extract events for waypoints
  const events = route.events || [];

  // Map event types to colors
  const getColor = (eventType) => {
    switch(eventType) {
      case 'PRE_TRIP': return '#006c4e'; // Green (origin)
      case 'DROP_OFF': return '#ba1a1a'; // Red (destination)
      case 'FUEL': return '#e6b800'; // Yellow (fuel)
      case 'BREAK_30_MIN': 
      case 'REST_10_HOUR': return '#004782'; // Blue (rest)
      case 'DRIVING': return '#1960a6';
      default: return '#727782'; // Gray
    }
  };

  const getLabel = (eventType) => {
    switch(eventType) {
      case 'PRE_TRIP': return 'Start / Pre-trip';
      case 'DROP_OFF': return 'Destination';
      case 'FUEL': return 'Fuel Stop';
      case 'BREAK_30_MIN': return '30-Min Break';
      case 'REST_10_HOUR': return '10-Hour Rest';
      default: return eventType;
    }
  };

  // Find coordinates for each event.
  // The event has a distance_miles, which we can interpolate along the polyline.
  // For simplicity, we just approximate or if backend gives exact lat/lng we use them.
  // Wait, does backend events have lat/lng? Let's check.
  // If not, we just show start and end for now, or approximate.
  // Actually, we can just use the first point for PRE_TRIP and last for DROP_OFF if lat/lng are missing.

  const waypoints = events.filter(e => e.type !== 'DRIVING').map(e => {
    // We don't have exact lat/lng in events from HOS calculator, they just have duration/distance.
    // If backend doesn't provide lat/lng in events, we will fallback to start/end.
    let lat = e.lat;
    let lng = e.lng;
    
    if (!lat || !lng) {
      if (e.type === 'PRE_TRIP') {
        lat = positions[0][0];
        lng = positions[0][1];
      } else if (e.type === 'DROP_OFF') {
        lat = positions[positions.length - 1][0];
        lng = positions[positions.length - 1][1];
      }
    }
    
    return {
      ...e,
      lat,
      lng
    };
  }).filter(e => e.lat && e.lng);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <Polyline positions={positions} pathOptions={{ color: '#004782', weight: 4 }} />
        
        {waypoints.map((wp, idx) => (
          <CircleMarker 
            key={idx} 
            center={[wp.lat, wp.lng]} 
            pathOptions={{ 
              color: '#ffffff', 
              fillColor: getColor(wp.type), 
              fillOpacity: 1, 
              weight: 2 
            }} 
            radius={8}
          >
            <Tooltip>{getLabel(wp.type)} {wp.distance_miles ? `(${Math.round(wp.distance_miles)} mi)` : ''}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
