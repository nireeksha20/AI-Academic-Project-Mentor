import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import SkillAssessment from "../pages/SkillAssessment";
import Requirements from "../pages/Requirements";
import NewProject from "../pages/NewProject";
import Dashboard from "../pages/Dashboard";
import LoadingPage from "../pages/LoadingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill-assessment" element={<SkillAssessment />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
