import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/common/Header';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Lấy token từ localStorage (nếu có)
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        console.log('API /users/me trả về:', res.data);
        
        setUserData(res.data);
        setForm({
          username: res.data.username || '',
          email: res.data.email || '',
          password: '',
        });
      })
      .catch(() => setError('Không thể tải thông tin người dùng!'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username.trim()) return 'Tên người dùng không được để trống.';
    if (!form.email.trim()) return 'Email không được để trống.';
    // Đơn giản, bạn có thể dùng regex kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return 'Email không hợp lệ.';
    if (form.password && form.password.length < 6) return 'Mật khẩu phải từ 6 ký tự trở lên.';
    return '';
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validateMsg = validateForm();
    if (validateMsg) {
      setError(validateMsg);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const payload = { username: form.username, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await axios.patch('/api/users/me', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data.user);
      setShowEdit(false);
      setSuccess('Cập nhật thành công!');
      setForm({ ...form, password: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Cập nhật thất bại!');
      }
    }
  };

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (!userData) return <div className="text-center py-20 text-red-600">Không có dữ liệu người dùng.</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-6 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.username}</h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Thông tin cá nhân</h2>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Tên người dùng</label>
                    <p className="text-gray-800">{userData.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-gray-800">{userData.email}</p>
                  </div>
                </div>
              </div>

              
            </div>

            <div className="mt-8">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => setShowEdit(true)}
              >
                Cập nhật thông tin
              </button>
            </div>

            {showEdit && (
              <div className="fixed inset-0 bg-red bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                <form
                  className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative"
                  onSubmit={handleUpdate}
                >
                  <h2 className="text-xl font-bold mb-4">Cập nhật thông tin cá nhân</h2>
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowEdit(false)}
                  >
                    &times;
                  </button>
                  <div className="mb-4">
                    <label className="block text-gray-700">Tên người dùng</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700">Mật khẩu mới (nếu muốn đổi)</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      autoComplete="new-password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
                  >
                    Lưu thay đổi
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
