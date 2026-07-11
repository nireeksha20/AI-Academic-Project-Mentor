import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import SkillAssessment from "../pages/SkillAssessment";
import ProjectDashboard from "../pages/ProjectDashboard";
import Requirements from "../pages/Requirements";
import NewProject from "../pages/NewProject";
import Dashboard from "../pages/Dashboard";
import LoadingPage from "../pages/LoadingPage";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/skill-assessment" element={<SkillAssessment />} />
        <Route path="/loading" element={<LoadingPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/new-project" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/project-dashboard/:id" element={<ProtectedRoute><ProjectDashboard /></ProtectedRoute>} />
        <Route path="/requirements/:id" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
