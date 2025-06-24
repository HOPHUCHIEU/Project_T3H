import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(username, email, password);
      toast.success('Đăng ký thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/login'); // Chuyển sang trang đăng nhập
      }, 1000);
    } catch (err) {
      toast.error('Đăng ký không thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError('');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-700">
          Đăng Ký
        </h1>
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}
        <div className="mb-6 text-center text-gray-600">
          <p>Tạo tài khoản mới</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-600">Tên người dùng</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên người dùng"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green-500 p-3 text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Đăng Ký
          </button>
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
