import api from './api';

export const appointmentService = {
  // Lấy danh sách tất cả lịch hẹn (có phân trang, lọc theo trạng thái)
  async getAppointments({ page = 1, limit = 10, status = '' } = {}) {
    let query = `/appointments?page=${page}&limit=${limit}`;
    if (status) query += `&status=${status}`;
    const response = await api.get(query);
    return response.data;
  },

  // Lấy lịch hẹn của user hiện tại (role user)
  async getMyAppointments() {
    const response = await api.get('/appointments/my');
    // Nếu backend trả { data: [...] } thì sửa lại: return response.data.data;
    return response.data;
  },

  // Tạo lịch hẹn mới (đặt bàn)
  async createAppointment({ date, time, guests, note, customerName, customerPhone }) {
    const payload = { date, time, guests, note, customerName, customerPhone };
    const response = await api.post('/appointments', payload);
    return response.data;
  },

  // Admin cập nhật lịch hẹn
  async updateAppointment(id, { date, time, guests, note, status }) {
    const payload = { date, time, guests, note, status };
    const response = await api.put(`/appointments/${id}`, payload);
    return response.data;
  },

  // Admin xoá lịch hẹn
  async deleteAppointment(id) {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  // Admin duyệt/chuyển trạng thái lịch hẹn (option)
  async changeStatus(id, status) {
    const response = await api.patch(`/appointments/${id}/status`, { status });
    return response.data;
  },

  // Lấy chi tiết lịch hẹn
  async getAppointmentDetail(id) {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
};
