import { ChatRepository } from "../repositories/chatRepository.js";
import { ProjectRepository } from "../repositories/projectRepository.js";
import { ProjectService } from "./projectService.js";
import { AIGatewayService } from "./aiGatewayService.js";
import { ProgressRepository } from "../repositories/progressRepository.js";
import User from "../models/User.js";

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

${bp.timeline?.duration || bp.timeline?.estimated_duration || ""}

RISKS

${(bp.risk?.risks || []).join("\n")}
`;
}

export class ChatService {
  /**
   * Add a new chat message to a project
   */
  static async addMessage(projectId, userId, messageData) {
    // Accept both "message" and "content" so the service
    // remains compatible with the current frontend/controller.
    const content = (messageData?.message || messageData?.content || "").trim();

    if (!content) {
      const error = new Error("Message content is required");
      error.statusCode = 400;
      throw error;
    }

    // Verify ownership and load project
    const project = await ProjectService.getProjectById(projectId, userId);

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // ---------------------------------------------------------
    // Build project/student context
    // ---------------------------------------------------------

    const studentProfile = `
Student Name: ${user.name || ""}

College / University: ${user.profile?.college || ""}
Department: ${user.profile?.department || ""}
Bio: ${user.profile?.bio || ""}
GitHub: ${user.profile?.github || ""}
LinkedIn: ${user.profile?.linkedin || ""}

Programming: ${user.skillAssessment?.programming || ""}
Frontend: ${user.skillAssessment?.frontend || ""}
Backend: ${user.skillAssessment?.backend || ""}
Database: ${user.skillAssessment?.database || ""}
AI: ${user.skillAssessment?.ai || ""}
Experience: ${user.skillAssessment?.experience || ""}
Preferred Role: ${user.skillAssessment?.role || ""}
Preferred Technology: ${user.skillAssessment?.preferredTech || ""}
Interests: ${(user.skillAssessment?.interests || []).join(", ")}
`;

    const projectIdea = `
Title:
${project.title}

Description:
${project.description}

Idea:
${project.idea || project.description}

Requirements:
${
  project.requirements?.length
    ? project.requirements.join("\n")
    : "Not specified"
}

Additional Requirements:
${project.additionalRequirements || "None"}
`;

    // ---------------------------------------------------------
    // Load chat history and project progress
    // ---------------------------------------------------------

    const chatDoc = await ChatRepository.findByProjectId(projectId);
    const history = chatDoc?.messages || [];

    const projectProgress = await ProgressRepository.find(projectId);

    const recentMessages = history.slice(-40);

    const conversationProgress = recentMessages
      .map(
        (msg) =>
          `${msg.role === "assistant" ? "Mentor" : "Student"}: ${msg.content}`,
      )
      .join("\n");

    const userMessageData = {
      role: "user",
      content,
    };

    // ---------------------------------------------------------
    // Load approved/stored blueprint
    // ---------------------------------------------------------

    const projectBlueprint = await ProjectRepository.getBlueprint(projectId);

    console.log("========== PROJECT BLUEPRINT ==========");
    console.log(projectBlueprint);
    console.log("=======================================");

    // ---------------------------------------------------------
    // Quick responses
    // These do not require an AI call.
    // ---------------------------------------------------------

    const question = content.toLowerCase();

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

      const aiMessageData = {
        role: "assistant",
        content: reply,
      };

      const addedMessages = await ChatRepository.addMessagesToChat(
        projectId,
        userId,
        [userMessageData, aiMessageData],
      );

      return {
        userMessage: addedMessages[0],
        aiMessage: addedMessages[1],
      };
    }

    // ---------------------------------------------------------
    // Format blueprint for AI
    // ---------------------------------------------------------

    const formattedBlueprint = summarizeBlueprint(projectBlueprint);

    // ---------------------------------------------------------
    // Initial AI payload
    // ---------------------------------------------------------

    const payload = {
      question: content,
      response_style: "chat",
      first_message: history.length === 0,
    };

    // ---------------------------------------------------------
    // Detect whether question needs project context
    // ---------------------------------------------------------

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

    // ---------------------------------------------------------
    // Conversation context
    // ---------------------------------------------------------

    let conversationContext = conversationProgress;

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
      conversationContext = `
The user's latest question refers to the previous assistant response.

Previous assistant response:
${history
  .filter((m) => m.role === "assistant")
  .slice(-1)
  .map((m) => m.content)
  .join("\n")}

Recent conversation:
${conversationProgress}
`;
    }

    // ---------------------------------------------------------
    // Progress + conversation context
    // ---------------------------------------------------------

    payload.progress = JSON.stringify({
      projectProgress: projectProgress
        ? {
            completion: projectProgress.overallCompletion,
            currentStage: projectProgress.currentStage,
            currentGoal: projectProgress.currentGoal,
            currentBlockers: projectProgress.currentBlockers,
            lastUpdated: projectProgress.updatedAt,
          }
        : null,

      conversationHistory: conversationContext,
    });

    payload.first_message = history.length === 0;

    // ---------------------------------------------------------
    // ALWAYS provide project context
    //
    // The AI mentor should be project-aware even when the
    // question itself is short or generic.
    // ---------------------------------------------------------

    payload.studentProfile = studentProfile;
    payload.projectIdea = projectIdea;
    payload.projectBlueprint = formattedBlueprint;
    payload.duration = project.expectedDuration || "Not specified";
    payload.team = project.team || "Individual";
    payload.phase = project.status || "Planning";

    console.log("========== MENTOR PAYLOAD ==========");
    console.log({
      question: payload.question,
      first_message: payload.first_message,
      hasBlueprint: Boolean(payload.projectBlueprint),
      hasProgress: Boolean(payload.progress),
      duration: payload.duration,
      team: payload.team,
      phase: payload.phase,
    });
    console.log("====================================");

    // ---------------------------------------------------------
    // Call AI Mentor
    // ---------------------------------------------------------

    const mentor = await AIGatewayService.mentorChat(payload);

    // ---------------------------------------------------------
    // Save AI reply
    // ---------------------------------------------------------

    const aiMessageData = {
      role: "assistant",
      content: mentor.response,
    };

    const addedMessages = await ChatRepository.addMessagesToChat(
      projectId,
      userId,
      [userMessageData, aiMessageData],
    );

    return {
      userMessage: addedMessages[0],
      aiMessage: addedMessages[1],
    };
  }

  /**
   * Get all chat history for a specific project
   */
  static async getChatHistory(projectId, userId) {
    // Ensure the user owns the project
    await ProjectService.getProjectById(projectId, userId);

    const chatDoc = await ChatRepository.findByProjectId(projectId);

    return chatDoc?.messages || [];
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
