import { ProgressRepository } from "../repositories/progressRepository.js";
import { ProjectService } from "./projectService.js";

export class ProgressService {
  static async addProgress(projectId, userId, data) {
    await ProjectService.getProjectById(projectId, userId);

    const progress = await ProgressRepository.update(projectId, {
      projectId,
      userId,
      overallCompletion: data.overallCompletion ?? 0,
      currentStage: data.currentStage ?? "Planning",
      currentGoal: data.currentGoal ?? "",
      tasks: data.tasks ?? [],
      blockers: data.blockers ?? [],
      notes: data.notes ?? "",
      updateNote: data.updateNote ?? "",
    });

    await ProgressRepository.createHistory({
      projectId,
      userId,
      overallCompletion: progress.overallCompletion,
      currentStage: progress.currentStage,
      currentGoal: progress.currentGoal,
      tasks: progress.tasks,
      blockers: progress.blockers,
      notes: progress.notes,
      updateNote: progress.updateNote,
    });

    return progress;
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

  static async getProgressHistory(projectId, ownerId) {
    await ProjectService.getProjectById(projectId, ownerId);

    return ProgressRepository.getHistory(projectId);
  }
}
