import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('API URL:', API_URL); // Log API URL để debug

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use((config) => {
  // Log request details
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    headers: config.headers
  });

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Add response interceptor
api.interceptors.response.use((response) => {
  console.log('API Response:', {
    url: response.config.url,
    status: response.status,
    data: response.data
  });
  return response;
}, (error) => {
  console.error('Response Error:', {
    url: error.config?.url,
    status: error.response?.status,
    data: error.response?.data
  });
  return Promise.reject(error);
});

export default api;
