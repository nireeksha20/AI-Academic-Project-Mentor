import api from "./api";

export const projectService = {
  // Create a new project
  async createProject(projectData) {
    const response = await api.post("/projects", projectData);
    return response.data;
  },

  // Get all projects for current user
  async getProjects() {
    const response = await api.get("/projects");
    return response.data;
  },

  // Get specific project by ID
  async getProjectById(id) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Update project
  async updateProject(id, updateData) {
    const response = await api.put(`/projects/${id}`, updateData);
    return response.data;
  },

  // Delete project
  async deleteProject(id) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Generate AI Blueprint
  async generateBlueprint(projectId) {
    const response = await api.post(
      `/projects/${projectId}/generate-blueprint`,
    );

    return response.data;
  },

  // Get Generated Blueprint
  async getBlueprint(projectId) {
    const response = await api.get(`/projects/${projectId}/blueprint`);

    return response.data;
  },
};
