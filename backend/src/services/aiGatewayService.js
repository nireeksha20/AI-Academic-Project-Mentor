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
      // } catch (error) {
      //   console.error("Blueprint API Error:", error.response?.data || error);

      //   throw new Error(
      //     error.response?.data?.detail || "Failed to generate AI blueprint.",
      //   );
      // }
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

  static async mentorChat(payload) {
    try {
      const { data } = await api.post("/mentor-chat", {
        student_profile: payload.studentProfile,
        project_idea: payload.projectIdea,
        progress: payload.progress,
        question: payload.question,
      });

      return data;
    } catch (error) {
      console.error("Mentor API Error:", error.response?.data || error);

      throw new Error(
        error.response?.data?.detail || "Failed to get mentor response.",
      );
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
