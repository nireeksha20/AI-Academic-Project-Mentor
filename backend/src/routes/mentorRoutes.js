import express from "express";
import { askMentor } from "../controllers/mentorController.js";

const router = express.Router();

router.post("/chat", askMentor);

export default router;
