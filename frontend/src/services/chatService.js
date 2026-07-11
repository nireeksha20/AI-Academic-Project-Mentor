import api from './api';

export const chatService = {
  // Get chat history for a project
  async getHistory(projectId) {
    const response = await api.get(`/chat/${projectId}`);
    return response.data;
  },

  // Send a new message
  async sendMessage(projectId, messageData) {
    const response = await api.post(`/chat/${projectId}`, messageData);
    return response.data;
  },

  // Clear chat history
  async clearHistory(projectId) {
    const response = await api.delete(`/chat/${projectId}`);
    return response.data;
  },
};
