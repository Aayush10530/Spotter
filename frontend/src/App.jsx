import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import TripPlanner from './pages/TripPlanner';
import FleetDashboard from './pages/FleetDashboard';
import Dashboard from './pages/Dashboard';
import CompliancePlaceholder from './pages/CompliancePlaceholder';
import ReportsPlaceholder from './pages/ReportsPlaceholder';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
            <ProtectedRoute>
                <MainLayout><TripPlanner /></MainLayout>
            </ProtectedRoute>
        } />
        <Route path="/fleet" element={
            <ProtectedRoute allowedRoles={['DISPATCHER']}>
                <MainLayout><FleetDashboard /></MainLayout>
            </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['DISPATCHER']}>
                <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
        } />
        <Route path="/compliance" element={
            <ProtectedRoute allowedRoles={['DISPATCHER']}>
                <MainLayout><CompliancePlaceholder /></MainLayout>
            </ProtectedRoute>
        } />
        <Route path="/reports" element={
            <ProtectedRoute allowedRoles={['DISPATCHER']}>
                <MainLayout><ReportsPlaceholder /></MainLayout>
            </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
