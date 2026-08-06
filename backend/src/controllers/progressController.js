import { ProgressService } from "../services/progressService.js";

export class ProgressController {
  static async addProgress(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;

      const result = await ProgressService.addProgress(
        projectId,
        userId,
        req.body,
      );

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("========== ADD PROGRESS ERROR ==========");
      console.error(error);
      console.error(error.stack);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getProgress(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;

      const progress = await ProgressService.getProgress(projectId, userId);

      return res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
