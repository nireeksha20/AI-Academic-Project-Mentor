import { ChatRepository } from "../repositories/chatRepository.js";
import { ProjectRepository } from "../repositories/projectRepository.js";
import { ProjectService } from "./projectService.js";
import { AIGatewayService } from "./aiGatewayService.js";

function summarizeBlueprint(bp) {
  if (!bp) return "";

  return `
PROJECT

Title:
${bp.project_idea?.title || ""}

Description:
${bp.project_idea?.description || bp.project_idea?.idea || ""}

Status:
${bp.status || ""}

TECH STACK

Frontend:
${bp.technology?.frontend || ""}

Backend:
${bp.technology?.backend || ""}

Database:
${bp.technology?.database || ""}

CORE FEATURES

${(bp.scope?.features || []).join("\n")}

TIMELINE

${bp.timeline?.duration || ""}

RISKS

${(bp.risk?.risks || []).join("\n")}
`;
}

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

    const history = await ChatRepository.findByProjectId(projectId);

    const recentMessages = history.slice(-40);

    const progress = recentMessages
      .map(
        (msg) =>
          `${msg.sender === "ai" ? "Mentor" : "Student"}: ${msg.message}`,
      )
      .join("\n");

    const userMessage = await ChatRepository.createMessage({
      projectId,
      userId,
      sender: "user",
      message: messageData.message,
    });

    const projectBlueprint = await ProjectRepository.getBlueprint(projectId);

    console.log("========== PROJECT BLUEPRINT ==========");
    console.log("=======================================");

    // -----------------------------
    // Quick Responses (No AI Call)
    // -----------------------------
    const question = messageData.message.trim().toLowerCase();

    const quickReplies = {
      hello: "Hi! 👋 How can I help you with your project today?",

      hi: "👋 Hi! What would you like to work on today?",

      hey: "👋 Hey! Ask me anything about your project.",

      thanks: "You're welcome! 😊",

      thankyou: "Happy to help! 😊",

      "thank you": "Happy to help! 😊",

      bye: "Good luck with your project! 👋",

      ok: "👍",

      okay: "👍",

      whoareyou:
        "I'm your AI Faculty Mentor. I help you plan, build, debug and complete your academic project.",

      "who are you":
        "I'm your AI Faculty Mentor. I help you plan, build, debug and complete your academic project.",

      help: "You can ask me:\n\n• Explain my blueprint\n• Plan Week 1\n• Debug my code\n• Review architecture\n• Suggest tech stack\n• Explain database design\n• Review APIs",
    };

    const normalized = question.replace(/\s+/g, "");

    if (quickReplies[normalized] || quickReplies[question]) {
      const reply = quickReplies[normalized] || quickReplies[question];

      const aiMessage = await ChatRepository.createMessage({
        projectId,
        userId,
        sender: "ai",
        message: reply,
      });

      return {
        userMessage,
        aiMessage,
      };
    }

    const formattedBlueprint = summarizeBlueprint(projectBlueprint);

    const payload = {
      question: messageData.message.trim(),
      response_style: "chat",
      first_message: history.length === 0,
    };

    const projectKeywords = [
      "project",
      "blueprint",
      "summary",
      "summarize",
      "architecture",
      "design",
      "feature",
      "features",
      "database",
      "schema",
      "api",
      "backend",
      "frontend",
      "deployment",
      "implementation",
      "timeline",
      "week",
      "roadmap",
      "plan",
      "planning",
      "milestone",
      "authentication",
      "jwt",
      "login",
      "register",
      "technology",
      "tech",
      "stack",
      "recommend",
      "improve",
      "improvement",
      "optimize",
      "review",
      "scope",
      "risk",
      "difficulty",
      "feasible",
    ];

    const followUpKeywords = [
      "it",
      "this",
      "that",
      "these",
      "earlier",
      "previous",
      "above",
      "continue",
      "shorten",
      "simplify",
      "minimize",
      "expand",
      "divide",
      "subdivide",
      "reduce",
      "improve",
      "refine",
    ];

    const needsProjectContext =
      projectKeywords.some((k) => question.includes(k)) ||
      followUpKeywords.some((k) => question.includes(k));

    let conversationContext = progress;

    const followUpWords = [
      "it",
      "this",
      "that",
      "these",
      "previous",
      "earlier",
      "above",
      "shorten",
      "simplify",
      "minimize",
      "divide",
      "expand",
      "continue",
    ];

    const isFollowUp = followUpWords.some((word) => question.includes(word));

    if (isFollowUp) {
      conversationContext = `The user's latest question refers to the previous assistant response.

Previous assistant response:
${history
  .filter((m) => m.sender === "ai")
  .slice(-1)
  .map((m) => m.message)
  .join("\n")}

Recent conversation:
${progress}`;
    }

    payload.progress = conversationContext;
    payload.first_message = history.length === 0;

    if (needsProjectContext) {
      payload.studentProfile = studentProfile;
      payload.projectIdea = projectIdea;
      payload.projectBlueprint = formattedBlueprint;
      payload.duration = project.expectedDuration || "Not specified";
      payload.team = project.team || "Individual";
      payload.phase = project.status || "Planning";
    }

    const mentor = await AIGatewayService.mentorChat(payload);

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
