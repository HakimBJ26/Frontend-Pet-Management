import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ClientDashboard from "../pages/Dashboard/ClientDashboard";
import VetoDashboard from "../pages/Dashboard/VetoDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";

const ProtectedRoutes = () => (
  <Routes>
    <Route
      path="/dashboard-admin"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard-client"
      element={
        <ProtectedRoute roles={["client"]}>
          <ClientDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard-veterinarian"
      element={
        <ProtectedRoute roles={["veterinarian"]}>
          <VetoDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />

    <Route
      path="/dashboard-client/profile"
      element={
        <ProtectedRoute roles={["client"]}>
          <Profile />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default ProtectedRoutes;
