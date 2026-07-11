import api from './api';

export const authService = {
  // Register a new user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Get current user profile
  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
