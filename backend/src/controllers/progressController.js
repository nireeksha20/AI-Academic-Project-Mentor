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
      console.error(error);

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
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const getProgressHistory = async (req, res, next) => {
  try {
    const history = await ProgressService.getProgressHistory(
      req.params.projectId,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      data: {
        history,
      },
    });
  } catch (error) {
    next(error);
  }
};
