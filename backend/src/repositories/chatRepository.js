import Chat from '../models/Chat.js';

export class ChatRepository {
  static async addMessagesToChat(projectId, userId, messages) {
    let chat = await Chat.findOne({ projectId });
    if (!chat) {
      chat = new Chat({ projectId, userId, messages: [] });
    }
    chat.messages.push(...messages);
    await chat.save();
    return chat.messages.slice(-messages.length); // return the added messages
  }

  static async findByProjectId(projectId) {
    return Chat.findOne({ projectId });
  }

  static async deleteByProjectId(projectId) {
    return Chat.findOneAndDelete({ projectId });
  }
}
