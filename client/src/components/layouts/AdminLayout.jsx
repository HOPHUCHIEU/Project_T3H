import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Đang tải thông tin người dùng...</div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-8 text-center text-red-600">
        Bạn không có quyền truy cập trang quản trị.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Xin chào, {user.username}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`h-screen bg-white shadow-lg transition-all duration-300 ${
            isExpanded ? 'w-64' : 'w-20'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <SidebarItem to="/admin/dashboard" label="Dashboard" isExpanded={isExpanded} />
              <SidebarItem to="/admin/users" label="Users" isExpanded={isExpanded} />
              <SidebarItem to="/admin/appointments" label="Appointments" isExpanded={isExpanded} />
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Sidebar item component
const SidebarItem = ({ to, label, isExpanded }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <div className="w-6 h-6 mr-2 text-gray-500">
        {/* Icon placeholder */}
        <span className="block w-2 h-2 bg-gray-500 rounded-full" />
      </div>
      <span
        className={`ml-1 ${!isExpanded && 'opacity-0'} transition-opacity duration-300`}
      >
        {label}
      </span>
    </NavLink>
  </li>
);

export default AdminLayout;
