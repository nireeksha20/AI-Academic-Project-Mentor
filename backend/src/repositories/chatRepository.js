import Chat from '../models/Chat.js';

export class ChatRepository {
  static async createMessage(chatData) {
    return Chat.create(chatData);
  }

  static async findByProjectId(projectId) {
    return Chat.find({ projectId }).sort({ timestamp: 1 });
  }

  static async deleteByProjectId(projectId) {
    return Chat.deleteMany({ projectId });
  }
}
