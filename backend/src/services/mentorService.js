import { AIGatewayService } from "./aiGatewayService.js";

export async function askMentor(payload) {
  return await AIGatewayService.mentorChat(payload);
}
