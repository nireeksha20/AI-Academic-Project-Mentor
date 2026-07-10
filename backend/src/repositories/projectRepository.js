import Project from '../models/Project.js';

export class ProjectRepository {
  static async create(projectData) {
    return Project.create(projectData);
  }

  static async findAllByOwner(ownerId) {
    return Project.find({ owner: ownerId }).sort({ createdAt: -1 });
  }

  static async findById(id) {
    return Project.findById(id);
  }

  static async updateById(id, updateData) {
    return Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteById(id) {
    return Project.findByIdAndDelete(id);
  }
}
