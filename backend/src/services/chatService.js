import { ChatRepository } from '../repositories/chatRepository.js';
import { ProjectService } from './projectService.js';

export class ChatService {
  /**
   * Add a new chat message to a project
   */
  static async addMessage(projectId, userId, messageData) {
    // Ensure the user actually owns the project before they can chat in it
    await ProjectService.getProjectById(projectId, userId);

    const chatData = {
      projectId,
      userId,
      sender: messageData.sender || 'user',
      message: messageData.message,
    };

    return ChatRepository.createMessage(chatData);
  }

  /**
   * Get all chat history for a specific project
   */
  static async getChatHistory(projectId, userId) {
    // Ensure the user owns the project
    await ProjectService.getProjectById(projectId, userId);

    return ChatRepository.findByProjectId(projectId);
  }

  /**
   * Clear chat history for a specific project
   */
  static async clearChatHistory(projectId, userId) {
    // Ensure the user owns the project
    await ProjectService.getProjectById(projectId, userId);

    return ChatRepository.deleteByProjectId(projectId);
  }
}
