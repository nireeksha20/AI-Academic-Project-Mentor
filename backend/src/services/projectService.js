import { ProjectRepository } from "../repositories/projectRepository.js";
import User from "../models/User.js";
import { AIGatewayService } from "./aiGatewayService.js";

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
      const error = new Error("Project not found");
      error.statusCode = 404;
      throw error;
    }

    if (project.owner.toString() !== ownerId.toString()) {
      const error = new Error("Not authorized to access this project");
      error.statusCode = 403;
      throw error;
    }

    return project;
  }

  /**
   * Update a project
   */
  static async updateProject(projectId, ownerId, updateData) {
    await this.getProjectById(projectId, ownerId);

    return ProjectRepository.updateById(projectId, updateData);
  }

  /**
   * Delete a project
   */
  static async deleteProject(projectId, ownerId) {
    await this.getProjectById(projectId, ownerId);

    return ProjectRepository.deleteById(projectId);
  }

  /**
   * Generate AI Blueprint
   */
  static async generateBlueprint(projectId, ownerId) {
    const project = await this.getProjectById(projectId, ownerId);

    const user = await User.findById(ownerId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const studentProfile = `
Programming: ${user.skillAssessment.programming}
Frontend: ${user.skillAssessment.frontend}
Backend: ${user.skillAssessment.backend}
Database: ${user.skillAssessment.database}
AI: ${user.skillAssessment.ai}
Experience: ${user.skillAssessment.experience}
Preferred Role: ${user.skillAssessment.role}
Preferred Tech: ${user.skillAssessment.preferredTech}
Interests: ${(user.skillAssessment.interests || []).join(", ")}
`;

    const projectIdea = `
Title: ${project.title}
Domain: ${project.domain}
Description: ${project.description}
Level: ${project.level}
Team: ${project.team}
Idea: ${project.idea}

Requirements:
${project.requirements.join("\n")}

Preferred Technologies:
${project.preferredTech.join(", ")}

Project Type:
${project.projectType}

Expected Duration:
${project.expectedDuration}

Additional Requirements:
${project.additionalRequirements}
`;
    // Generate or regenerate blueprint
    const blueprint = await AIGatewayService.generateBlueprint(
      studentProfile,
      projectIdea,
    );

    // Save new blueprint (overwrites old one)
    await ProjectRepository.saveBlueprint(projectId, {
      ...blueprint,
      generatedAt: new Date(),
    });

    return blueprint;
  }

  /**
   * Get stored blueprint
   */
  static async getBlueprint(projectId, ownerId) {
    await this.getProjectById(projectId, ownerId);

    return ProjectRepository.getBlueprint(projectId);
  }
}
