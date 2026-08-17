import axios from "axios";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: FASTAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
});

export class AIGatewayService {
  static async generateBlueprint(studentProfile, projectIdea) {
    try {
      const { data } = await api.post("/generate-blueprint", {
        student_profile: studentProfile,
        project_idea: projectIdea,
      });

      return data;
    } catch (error) {
      console.error("========== AI ERROR ==========");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error(error);
      }

      throw error;
    }
  }

  static async generateDocumentation(payload) {
    console.log("\n========== DOCUMENTATION REQUEST ==========");
    console.log("Document Type:", payload.docType);
    console.log("Student Profile Length:", payload.studentProfile?.length);
    console.log("Blueprint Length:", payload.blueprint?.length);
    console.log("Progress Length:", payload.progress?.length);
    console.log("===========================================\n");

    try {
      const { data } = await api.post(
        "/generate-documentation",
        {
          student_profile: payload.studentProfile,
          blueprint: payload.blueprint,
          progress: payload.progress,
          doc_type: payload.docType,
        },
        {
          timeout: 300000,
        },
      );

      console.log("\n========== DOCUMENTATION RESPONSE ==========");
      console.log("Document Type:", data?.doc_type);
      console.log("Content Length:", data?.content?.length);
      console.log("============================================\n");

      return data;
    } catch (error) {
      console.error("\n========== DOCUMENTATION ERROR ==========");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("FastAPI did not respond:", error.message);
      } else {
        console.error("Request configuration error:", error.message);
      }

      console.error("========================================\n");

      throw error;
    }
  }

  static async mentorChat(payload) {
    try {
      const { data } = await api.post("/mentor-chat", {
        student_profile: payload.studentProfile,
        project_idea: payload.projectIdea,
        project_blueprint: payload.projectBlueprint,
        progress: payload.progress,
        question: payload.question,
        duration: payload.duration,
        team: payload.team,
        phase: payload.phase,
        response_style: "chat",
        first_message: payload.firstMessage || false,
      });

      return data;
    } catch (error) {
      console.error("========== MENTOR ERROR ==========");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error(error.message);
      }

      throw error;
    }
  }

  static async getBlueprints() {
    try {
      const { data } = await api.get("/blueprints");
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch blueprints.");
    }
  }

  static async generateFacultySummary(payload) {
    const { data } = await api.post("/faculty-summary", {
      blueprint: payload.blueprint,
      progress: payload.progress,
    });

    return data;
  }
}
