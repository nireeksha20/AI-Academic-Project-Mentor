import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  generateBlueprint,
  getBlueprint,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProjectValidation,
  updateProjectValidation,
  projectIdValidation,
} from "../validators/projectValidator.js";

const router = express.Router();

// All project routes require authentication
router.use(protect);

router.route("/").post(createProjectValidation, createProject).get(getProjects);

router
  .route("/:id")
  .get(projectIdValidation, getProject)
  .put(updateProjectValidation, updateProject)
  .delete(projectIdValidation, deleteProject);

router.post("/:id/generate-blueprint", projectIdValidation, generateBlueprint);

router.get("/:id/blueprint", projectIdValidation, getBlueprint);

export default router;
