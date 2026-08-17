import express from "express";
import {
  addMessage,
  getHistory,
  clearHistory,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
import { chatProjectIdValidation } from "../validators/projectValidator.js";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";

const router = express.Router({ mergeParams: true });

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return errorResponse(res, 400, "Validation Error", formattedErrors);
  }

  next();
};

const messageValidation = [
  body("message").trim().notEmpty().withMessage("Message content is required"),

  body("sender")
    .optional()
    .isIn(["user", "ai"])
    .withMessage("Sender must be user or ai"),

  handleValidationErrors,
];

router.use(protect);

router
  .route("/:projectId")
  .post(chatProjectIdValidation, messageValidation, addMessage)
  .get(chatProjectIdValidation, getHistory)
  .delete(chatProjectIdValidation, clearHistory);

export default router;
