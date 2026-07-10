import { AuthService } from '../services/authService.js';

export const protect = (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      const error = new Error('Not authorized to access this route, no token provided');
      error.statusCode = 401;
      throw error;
    }

    try {
      // Verify token
      const decoded = AuthService.verifyToken(token);
      req.user = decoded; // Attach the decoded payload { id, email, role } to req
      next();
    } catch (err) {
      const error = new Error('Not authorized, token failed or expired');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
