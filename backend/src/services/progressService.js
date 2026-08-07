import { ProgressRepository } from "../repositories/progressRepository.js";
import { ProjectService } from "./projectService.js";

export class ProgressService {
  static async addProgress(projectId, userId, data) {
    await ProjectService.getProjectById(projectId, userId);

    return await ProgressRepository.update(projectId, {
      projectId,
      userId,
      overallCompletion: data.overallCompletion ?? 0,
      currentStage: data.currentStage ?? "Planning",
      currentGoal: data.currentGoal ?? "",
      tasks: data.tasks ?? [],
      blockers: data.blockers ?? [],
      notes: data.notes ?? "",
    });
  }

  static async getProgress(projectId, userId) {
    await ProjectService.getProjectById(projectId, userId);

    let progress = await ProgressRepository.find(projectId);

    if (!progress) {
      progress = await ProgressRepository.create({
        projectId,
        userId,
        overallCompletion: 0,
        currentStage: "Planning",
        currentGoal: "",
        tasks: [],
        blockers: [],
        notes: "",
      });
    }

    return progress;
  }
}
