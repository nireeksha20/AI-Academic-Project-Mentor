import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export class AuthService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateToken(payload) {
    return jwt.sign(
      {
        id: payload._id,
        email: payload.email,
        role: payload.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      },
    );
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  // ---------------- REGISTER ----------------

  static async registerUser(userData) {
    const { name, email, password, college, department } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      profile: {
        college: college || "",
        department: department || "",
      },
    });

    user.password = undefined;

    return user;
  }

  // ---------------- LOGIN ----------------

  static async loginUser(email, password) {
    const user = await User.findOne({ email }).select("+password");

    const authError = new Error("Invalid email or password");
    authError.statusCode = 401;

    if (!user) throw authError;

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) throw authError;

    const token = this.generateToken(user);

    user.password = undefined;

    return {
      user,
      token,
    };
  }

  // ---------------- GET USER ----------------

  static async getUserById(userId) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  // ---------------- UPDATE PROFILE ----------------

  static async updateProfile(userId, data) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.profile.college = data.college ?? user.profile.college;

    user.profile.department = data.department ?? user.profile.department;

    user.profile.bio = data.bio ?? user.profile.bio;

    user.profile.github = data.github ?? user.profile.github;

    user.profile.linkedin = data.linkedin ?? user.profile.linkedin;

    await user.save();

    return user;
  }

  // ---------------- UPDATE SKILL ASSESSMENT ----------------

  static async updateSkillAssessment(userId, data) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.skillAssessment = {
      programming: data.programming,
      frontend: data.frontend,
      backend: data.backend,
      database: data.database,
      ai: data.ai,
      experience: data.experience,
      role: data.role,

      interests: data.interests || [],

      preferredTech: data.preferredTech || "",
    };

    await user.save();

    return user;
  }
}
