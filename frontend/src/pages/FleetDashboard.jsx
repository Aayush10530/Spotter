import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const createTruckIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #004782; color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid white;">
             <span class="material-symbols-outlined" style="font-size: 20px;">local_shipping</span>
           </div>`,
    className: '', 
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

function FleetDashboard() {
  const [fleet, setFleet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/fleet/')
      .then((res) => res.json())
      .then((data) => {
        setFleet(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch fleet data', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-surface dark:bg-[#121212] overflow-hidden">
      <div className="p-4 bg-white dark:bg-[#1C1C1E] border-b border-outline-variant dark:border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-medium text-on-surface dark:text-white">Live Fleet Dashboard</h1>
        <Link to="/" className="text-primary dark:text-blue-400 hover:underline text-sm font-medium">
          &larr; Back to Trip Planner
        </Link>
      </div>
      
      <div className="flex-1 relative p-6 bg-surface-container-low dark:bg-[#121212]">
        <div className="w-full h-full rounded-2xl overflow-hidden border border-outline-variant dark:border-gray-800 shadow-md relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-surface dark:bg-[#1C1C1E] z-10">
              <span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span>
            </div>
          ) : (
            <MapContainer 
              center={[40.0, -85.0]} 
              zoom={6} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {fleet.map((truck) => (
                <Marker key={truck.id} position={[truck.lat, truck.lng]} icon={createTruckIcon()}>
                  <Popup>
                    <div className="font-sans text-sm">
                      <strong>{truck.id}</strong><br/>
                      Driver: {truck.driver}<br/>
                      Status: <span className="uppercase text-xs font-semibold text-primary">{truck.status}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default FleetDashboard;
