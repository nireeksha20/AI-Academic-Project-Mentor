import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export class AuthService {
  /**
   * Hash a plaintext password
   * @param {string} password 
   * @returns {Promise<string>} hashed password
   */
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare plaintext password with hashed password
   * @param {string} plainPassword 
   * @param {string} hashedPassword 
   * @returns {Promise<boolean>}
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Generate JWT Token
   * @param {Object} payload 
   * @returns {string} token
   */
  static generateToken(payload) {
    return jwt.sign(
      { id: payload._id, email: payload.email, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  /**
   * Verify JWT Token
   * @param {string} token 
   * @returns {Object} decoded payload
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  /**
   * Register a new user
   * @param {Object} userData 
   * @returns {Promise<Object>} user document (without password)
   */
  static async registerUser(userData) {
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('Email already registered');
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password before returning
    user.password = undefined;
    return user;
  }

  /**
   * Authenticate a user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{ user: Object, token: string }>}
   */
  static async loginUser(email, password) {
    // Note: select('+password') because it is hidden by default in schema
    const user = await User.findOne({ email }).select('+password');
    
    // Generic error to prevent revealing email existence
    const authError = new Error('Invalid email or password');
    authError.statusCode = 401;

    if (!user) {
      throw authError;
    }

    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) {
      throw authError;
    }

    const token = this.generateToken(user);
    
    user.password = undefined;

    return { user, token };
  }

  /**
   * Fetch a user by ID
   * @param {string} userId 
   * @returns {Promise<Object>} user document
   */
  static async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}
