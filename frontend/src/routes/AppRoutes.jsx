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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/skill-assessment" element={<SkillAssessment />} />

        <Route path="/new-project" element={<NewProject />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/project-dashboard" element={<ProjectDashboard />} />

        <Route path="/requirements" element={<Requirements />} />
      </Routes>
    </BrowserRouter>
  );
}
