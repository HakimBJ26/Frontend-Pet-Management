import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import ClientDashboard from '../pages/Dashboard/ClientDashboard';
import VetoDashboard from '../pages/Dashboard/VetoDashboard';
import ProtectedRoute from './ProtectedRoute';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_VETO } from '../common/configuration/constants/UserRole';
import UserManagement from '../pages/admin/UserManagement';


const ProtectedRoutes = () => (
  <Routes>
    <Route 
      path="/dashboard-admin/*"
      element={
        <ProtectedRoute roles={[ROLE_ADMIN]}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="users-management" element={<UserManagement />} />
          </Routes>
        </ProtectedRoute>
      }
    />
    
    <Route 
      path="/dashboard-client" 
      element={
        <ProtectedRoute roles={[ROLE_CLIENT]}>
          <ClientDashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/dashboard-veterinarian" 
      element={
        <ProtectedRoute roles={[ROLE_VETO]}>
          <VetoDashboard />
        </ProtectedRoute>
      } 
    />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

export default ProtectedRoutes;
