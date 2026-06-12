import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './RouteMap.module.css';

const RouteMap = ({ route, theme }) => {
  if (!route || !route.polyline || route.polyline.length === 0) {
    return <div className={styles.routeMapEmpty}>No route data available</div>;
  }

  const positions = route.polyline;
  
  const lats = positions.map(p => p[0]);
  const lngs = positions.map(p => p[1]);
  const center = [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2
  ];

  const events = route.waypoints || [];

  const getColor = (eventType) => {
    switch (eventType) {
      case 'start': return '#006c4e'; 
      case 'dropoff': return '#ba1a1a'; 
      case 'fuel': return '#e6b800'; 
      case 'break':
      case 'rest': return '#004782'; 
      case 'pickup': return '#e88c1a'; 
      default: return '#727782'; 
    }
  };

  const getLabel = (eventType) => {
    switch (eventType) {
      case 'start': return 'Start / Pre-trip';
      case 'dropoff': return 'Destination';
      case 'fuel': return 'Fuel Stop';
      case 'break': return '30-Min Break';
      case 'rest': return '10-Hour Rest';
      case 'pickup': return 'Pickup / Load';
      default: return eventType;
    }
  };

  const waypoints = events.map(e => {
    let lat = e.lat;
    let lng = e.lng;
    
    if (!lat || !lng) {
      if (e.type === 'start') {
        lat = positions[0][0];
        lng = positions[0][1];
      } else if (e.type === 'dropoff') {
        lat = positions[positions.length - 1][0];
        lng = positions[positions.length - 1][1];
      }
    }
    
    return { ...e, lat, lng };
  }).filter(e => e.lat && e.lng);

  const mapUrl = theme === 'dark'
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className={styles.routeMapWrapper}>
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} className={styles.leafletContainer}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={mapUrl}
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
            <Tooltip>{wp.activity || getLabel(wp.type)} {wp.distance_miles ? `(${Math.round(wp.distance_miles)} mi)` : ''}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMap;