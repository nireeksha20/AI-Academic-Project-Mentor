import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { ProgressController } from "../controllers/progressController.js";
import { getProgressHistory } from "../controllers/progressController.js";

const router = express.Router();

router.use(protect);

router
  .route("/:projectId")
  .post(ProgressController.addProgress)
  .get(ProgressController.getProgress);

router.get("/:projectId/history", getProgressHistory);

export default router;
