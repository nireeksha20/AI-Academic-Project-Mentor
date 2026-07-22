import { ProjectService } from "../services/projectService.js";
import { successResponse } from "../utils/response.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await ProjectService.createProject(req.user.id, req.body);
    return successResponse(res, 201, "Project created successfully", {
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectService.getUserProjects(req.user.id);
    return successResponse(res, 200, "Projects retrieved successfully", {
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await ProjectService.getProjectById(
      req.params.id,
      req.user.id,
    );
    return successResponse(res, 200, "Project retrieved successfully", {
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await ProjectService.updateProject(
      req.params.id,
      req.user.id,
      req.body,
    );
    return successResponse(res, 200, "Project updated successfully", {
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await ProjectService.deleteProject(req.params.id, req.user.id);
    return successResponse(res, 200, "Project deleted successfully");
  } catch (error) {
    next(error);
  }
};

// -------------------------
// GENERATE AI BLUEPRINT
// -------------------------

export const generateBlueprint = async (req, res, next) => {
  try {
    const blueprint = await ProjectService.generateBlueprint(
      req.params.id,
      req.user.id,
    );

    return successResponse(res, 200, "Blueprint generated successfully", {
      blueprint,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------
// GET STORED BLUEPRINT
// -------------------------

export const getBlueprint = async (req, res, next) => {
  try {
    const blueprint = await ProjectService.getBlueprint(
      req.params.id,
      req.user.id,
    );

    return successResponse(res, 200, "Blueprint fetched successfully", {
      blueprint,
    });
  } catch (error) {
    next(error);
  }
};
