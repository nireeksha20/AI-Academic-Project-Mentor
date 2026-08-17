import { ProjectService } from "../services/projectService.js";
import { successResponse } from "../utils/response.js";
import { createDocumentationDocx } from "../services/docxService.js";

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

export const generateDocumentation = async (req, res, next) => {
  try {
    const result = await ProjectService.generateDocumentation(
      req.params.id,
      req.user.id,
      req.body.docType,
    );

    const docxBuffer = await createDocumentationDocx({
      content: result.content,
      projectTitle: result.projectTitle,
      studentName: result.studentName,
      institutionName: result.institutionName,
      departmentName: result.departmentName,
      docType: result.docType,
    });

    const safeTitle = (result.projectTitle || "project")
      .replace(/[^a-z0-9]/gi, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

    const filename = `${safeTitle}_${req.body.docType}.docx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.setHeader("Content-Length", docxBuffer.length);

    return res.status(200).send(docxBuffer);
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

export const getFacultySummary = async (req, res, next) => {
  try {
    const summary = await ProjectService.getFacultySummary(
      req.params.id,
      req.user.id,
    );

    return successResponse(res, 200, "Faculty summary generated", summary);
  } catch (err) {
    next(err);
  }
};
