import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import TripPlanner from './pages/TripPlanner';
import FleetDashboard from './pages/FleetDashboard';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<TripPlanner />} />
        <Route path="/fleet" element={<FleetDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
