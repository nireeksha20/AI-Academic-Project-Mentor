import { ChatRepository } from "../repositories/chatRepository.js";
import { ProjectService } from "./projectService.js";
import { AIGatewayService } from "./aiGatewayService.js";

export class ChatService {
  /**
   * Add a new chat message to a project
   */
  static async addMessage(projectId, userId, messageData) {
    // Verify ownership and load project
    const project = await ProjectService.getProjectById(projectId, userId);

    // Build student profile
    const studentProfile = `
Domain: ${project.domain}
Difficulty: ${project.level}
Team: ${project.team}
Preferred Technologies:
${project.preferredTech.join(", ")}

Expected Duration:
${project.expectedDuration}

Project Type:
${project.projectType}
`;

    // Build project idea
    const projectIdea = `
Title:
${project.title}

Description:
${project.description}

Idea:
${project.idea}

Requirements:
${project.requirements.join("\n")}

Additional Requirements:
${project.additionalRequirements}
`;

    // Get previous history first
    const history = await ChatRepository.findByProjectId(projectId);

    // Save user message
    const userMessage = await ChatRepository.createMessage({
      projectId,
      userId,
      sender: "user",
      message: messageData.message,
    });

    const progress = history
      .map((msg) => `${msg.sender}: ${msg.message}`)
      .join("\n");

    // Ask CrewAI mentor
    const mentor = await AIGatewayService.mentorChat({
      studentProfile,
      projectIdea,
      progress,
      question: messageData.message,
    });

    // Save AI reply
    const aiMessage = await ChatRepository.createMessage({
      projectId,
      userId,
      sender: "ai",
      message: mentor.response,
    });

    return {
      userMessage,
      aiMessage,
    };
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
