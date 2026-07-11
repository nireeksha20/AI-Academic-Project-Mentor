import { ProjectRepository } from '../repositories/projectRepository.js';

export class ProjectService {
  /**
   * Create a new project
   */
  static async createProject(ownerId, projectData) {
    const data = {
      ...projectData,
      owner: ownerId,
    };
    return ProjectRepository.create(data);
  }

  /**
   * Get all projects for a specific user
   */
  static async getUserProjects(ownerId) {
    return ProjectRepository.findAllByOwner(ownerId);
  }

  /**
   * Get a specific project, ensuring the user owns it
   */
  static async getProjectById(projectId, ownerId) {
    const project = await ProjectRepository.findById(projectId);
    
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    if (project.owner.toString() !== ownerId.toString()) {
      const error = new Error('Not authorized to access this project');
      error.statusCode = 403;
      throw error;
    }

    return project;
  }

  /**
   * Update a project
   */
  static async updateProject(projectId, ownerId, updateData) {
    // Verify existence and ownership
    await this.getProjectById(projectId, ownerId);
    
    // Perform update
    return ProjectRepository.updateById(projectId, updateData);
  }

  /**
   * Delete a project
   */
  static async deleteProject(projectId, ownerId) {
    // Verify existence and ownership
    await this.getProjectById(projectId, ownerId);
    
    // Perform deletion
    return ProjectRepository.deleteById(projectId);
  }
}
