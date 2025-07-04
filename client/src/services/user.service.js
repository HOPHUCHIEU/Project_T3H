import api from './api';

export const userService = {
  async getAllUsers(page = 1, limit = 10) {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async updateUser(id, userData) {
  const response = await api.patch(`/users/${id}`, userData); // dùng PATCH thay vì PUT
  return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async registerUser(userData) {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  async getTotalUserCount() {
    const response = await api.get('/users/count');
    return response.data;
  },

  async getProfile() {
  const response = await api.get('/users/me');
  return response.data;
  },

  async updateProfile(userData) {
  const response = await api.patch('/users/me', userData);
  return response.data;
  },
};
