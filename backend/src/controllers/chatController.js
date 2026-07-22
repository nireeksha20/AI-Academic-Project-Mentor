import { ChatService } from "../services/chatService.js";
import { successResponse } from "../utils/response.js";

export const addMessage = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userMessage, aiMessage } = await ChatService.addMessage(
      projectId,
      req.user.id,
      req.body,
    );

    return successResponse(res, 201, "Message added", {
      userMessage,
      aiMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const history = await ChatService.getChatHistory(projectId, req.user.id);
    return successResponse(res, 200, "Chat history retrieved", { history });
  } catch (error) {
    next(error);
  }
};

export const clearHistory = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await ChatService.clearChatHistory(projectId, req.user.id);
    return successResponse(res, 200, "Chat history cleared successfully");
  } catch (error) {
    next(error);
  }
};
