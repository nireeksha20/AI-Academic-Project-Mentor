import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  updateSkillAssessment,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.get("/me", protect, getMe);

router.put("/profile", protect, updateProfile);

router.put("/skill-assessment", protect, updateSkillAssessment);

export default router;
