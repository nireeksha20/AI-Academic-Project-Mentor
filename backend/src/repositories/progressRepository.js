import Progress from "../models/Progress.js";
import ProgressHistory from "../models/ProgressHistory.js";

export class ProgressRepository {
  static find(projectId) {
    return Progress.findOne({ projectId });
  }

  static create(data) {
    return Progress.create(data);
  }

  static update(projectId, update) {
    return Progress.findOneAndUpdate(
      { projectId },
      { $set: update },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  static async createHistory(data) {
    return ProgressHistory.create(data);
  }

  static async getHistory(projectId) {
    return ProgressHistory.find({ projectId }).sort({ createdAt: -1 });
  }
}
