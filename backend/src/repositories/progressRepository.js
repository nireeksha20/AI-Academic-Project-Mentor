import Progress from "../models/Progress.js";

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
}
