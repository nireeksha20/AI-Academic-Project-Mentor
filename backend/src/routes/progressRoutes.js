import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { ProgressController } from "../controllers/progressController.js";

const router = express.Router();

router.use(protect);

router
  .route("/:projectId")
  .post(ProgressController.addProgress)
  .get(ProgressController.getProgress);

export default router;
