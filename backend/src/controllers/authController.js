import { AuthService } from '../services/authService.js';
import { successResponse } from '../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const user = await AuthService.registerUser(req.body);
    // Auto-login after registration could be done here, or let user login explicitly
    return successResponse(res, 201, 'User registered successfully', { user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.loginUser(email, password);

    return successResponse(res, 200, 'Login successful', { user, token });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const user = await AuthService.getUserById(req.user.id);
    return successResponse(res, 200, 'User profile fetched successfully', { user });
  } catch (error) {
    next(error);
  }
};
