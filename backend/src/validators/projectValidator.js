import { body, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';
import mongoose from 'mongoose';

// Middleware to catch validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return errorResponse(res, 400, 'Validation Error', formattedErrors);
  }
  next();
};

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createProjectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('domain').trim().notEmpty().withMessage('Domain is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];

export const updateProjectValidation = [
  param('id')
    .custom(validateObjectId)
    .withMessage('Invalid Project ID'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('domain').optional().trim().notEmpty().withMessage('Domain cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  handleValidationErrors,
];

export const projectIdValidation = [
  param('id')
    .custom(validateObjectId)
    .withMessage('Invalid Project ID'),
  handleValidationErrors,
];
