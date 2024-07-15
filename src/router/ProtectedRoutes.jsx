import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ClientDashboard from "../pages/Dashboard/ClientDashboard";
import VetoDashboard from "../pages/Dashboard/VetoDashboard";
import ProtectedRoute from "./ProtectedRoute";
import PetProfile from "../pages/PetProfile";
import UserProfile from "../pages/UserProfile";
import { ROUTES } from "../common/constants/ROUTES";

const ProtectedRoutes = () => (
  <Routes>
    <Route
      path={ROUTES.ADMIN_DASHBOARD}
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.CLIENT_DASHBOARD}
      element={
        <ProtectedRoute roles={["client"]}>
          <ClientDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.VETERINARIAN_DASHBOARD}
      element={
        <ProtectedRoute roles={["veterinarian"]}>
          <VetoDashboard />
        </ProtectedRoute>
      }
    />
    <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
    <Route path={ROUTES.SIGN_UP} element={<SignUp />} />

    <Route
      path={ROUTES.PET_PROFILE}
      element={
        <ProtectedRoute roles={["client"]}>
          <PetProfile />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.USER_PROFILE}
      element={
        <ProtectedRoute roles={["client"]}>
          <UserProfile />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default ProtectedRoutes;
