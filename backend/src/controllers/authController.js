import { AuthService } from "../services/authService.js";
import { successResponse } from "../utils/response.js";

// ---------------- REGISTER ----------------

export const register = async (req, res, next) => {
  try {
    const user = await AuthService.registerUser(req.body);

    return successResponse(res, 201, "User registered successfully", { user });
  } catch (error) {
    next(error);
  }
};

// ---------------- LOGIN ----------------

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await AuthService.loginUser(email, password);

    return successResponse(res, 200, "Login successful", {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------- GET CURRENT USER ----------------

export const getMe = async (req, res, next) => {
  try {
    const user = await AuthService.getUserById(req.user.id);

    return successResponse(res, 200, "User profile fetched successfully", {
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------- UPDATE PROFILE ----------------

export const updateProfile = async (req, res, next) => {
  try {
    const user = await AuthService.updateProfile(req.user.id, req.body);

    return successResponse(res, 200, "Profile updated successfully", { user });
  } catch (error) {
    next(error);
  }
};

// ---------------- UPDATE SKILL ASSESSMENT ----------------

export const updateSkillAssessment = async (req, res, next) => {
  try {
    const user = await AuthService.updateSkillAssessment(req.user.id, req.body);

    return successResponse(res, 200, "Skill assessment saved successfully", {
      user,
    });
  } catch (error) {
    next(error);
  }
};
