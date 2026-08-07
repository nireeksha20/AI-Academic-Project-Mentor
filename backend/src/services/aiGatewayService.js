import axios from "axios";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: FASTAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
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
  try {
    const { data } = await api.post("/generate-documentation", {
      student_profile: payload.studentProfile,
      blueprint: payload.blueprint,
      progress: payload.progress,
      doc_type: payload.docType,
    });
    return data;
  } catch (error) {
    console.error("========== DOCUMENTATION ERROR ==========");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error);
    }
    throw error;
  }
}

  static async mentorChat(payload) {
    console.log("========== PAYLOAD TO FASTAPI ==========");
    console.dir(payload, { depth: null });
    console.log("========================================");
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
      });

      return data;
    } catch (error) {
      console.error("========== MENTOR ERROR ==========");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error(error);
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
}
