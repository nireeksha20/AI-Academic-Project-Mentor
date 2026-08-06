import Progress from "../models/Progress.js";

export class ProgressRepository {
  static find(projectId) {
    return Progress.findOne({ projectId });
  }

  static create(data) {
    return Progress.create(data);
  }

  static update(projectId, data) {
    return Progress.findOneAndUpdate({ projectId }, data, { new: true });
  }
}
