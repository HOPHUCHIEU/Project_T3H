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
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
