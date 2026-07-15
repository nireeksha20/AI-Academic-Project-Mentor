import api from "./api";

export const authService = {
  register(data) {
    return api.post("/auth/register", data);
  },

  login(data) {
    return api.post("/auth/login", data);
  },

  getMe() {
    return api.get("/auth/me");
  },

  updateProfile(data) {
    return api.put("/auth/profile", data);
  },

  updateSkillAssessment(data) {
    return api.put("/auth/skill-assessment", data);
  },
};
