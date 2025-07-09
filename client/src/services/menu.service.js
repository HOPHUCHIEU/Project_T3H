import axios from './api'; // Đã cấu hình baseURL ở api.js

// Lấy danh sách món đặc biệt
export const fetchSpecialMenus = async () => {
  const res = await axios.get('/menus/special');
  return res.data;
};

// Admin: Thêm món mới
export const createMenu = async (data, token) => {
  const res = await axios.post('/menus', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Admin: Sửa món
export const updateMenu = async (id, data, token) => {
  const res = await axios.patch(`/menus/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Admin: Xóa món
export const deleteMenu = async (id, token) => {
  const res = await axios.delete(`/menus/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Đếm tổng số menu (admin)
export const countMenus = async (token) => {
  const res = await axios.get('/menus/count', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Admin: Lấy tất cả menu (cho quản trị)
export const fetchAllMenus = async (token) => {
  const res = await axios.get('/menus', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Admin: Upload ảnh
export const uploadMenuImage = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post('/menus/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};
