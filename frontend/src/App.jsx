import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import TripPlanner from './pages/TripPlanner';
import FleetDashboard from './pages/FleetDashboard';
import Dashboard from './pages/Dashboard';
import CompliancePlaceholder from './pages/CompliancePlaceholder';
import ReportsPlaceholder from './pages/ReportsPlaceholder';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<TripPlanner />} />
        <Route path="/fleet" element={<FleetDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compliance" element={<CompliancePlaceholder />} />
        <Route path="/reports" element={<ReportsPlaceholder />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
