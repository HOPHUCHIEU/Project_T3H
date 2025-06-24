import api from './api';

export const appointmentService = {
  async getAppointments(page = 1, limit = 10) {
    const response = await api.get(`/appointments?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getMyAppointments() {
    const response = await api.get('/appointments/my-appointments');
    return response.data;
  },

  async createAppointment(appointmentData) {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  async updateAppointment(id, appointmentData) {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  async deleteAppointment(id) {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }
};
