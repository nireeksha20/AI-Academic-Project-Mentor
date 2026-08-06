import { ProgressRepository } from "../repositories/progressRepository.js";
import { ProjectService } from "./projectService.js";
import { AIGatewayService } from "./aiGatewayService.js";

export class ProgressService {
  static async addProgress(projectId, userId, data) {
    // Verify project ownership
    await ProjectService.getProjectById(projectId, userId);

    // Save progress update
    const progress = await ProgressRepository.create({
      projectId,
      userId,
      week: data.week,
      completion: data.completion,
      completedTasks: data.completedTasks,
      pendingTasks: data.pendingTasks,
      blockers: data.blockers,
      notes: data.notes,
    });

    await progress.save();

    return progress;
  }

  static async getProgress(projectId, userId) {
    await ProjectService.getProjectById(projectId, userId);

    return ProgressRepository.findByProject(projectId);
  }
}
