import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';
import { MdDashboard, MdPeople, MdEventNote } from 'react-icons/md';

const AdminLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Đang tải thông tin người dùng...</div>;
  }

  if (user && user.role !== 'admin') {
    return (
      <div className="p-8 text-center text-red-600">
        Bạn không có quyền truy cập trang quản trị.
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-20 flex-shrink-0">
        <Header />
      </div>

      {/* Layout body (Sidebar + Main) */}
      <div className="flex flex-1 h-[calc(100vh-80px)]"> {/* 80px = h-20 header */}
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg transition-all duration-300 overflow-hidden ${
            isExpanded ? 'w-64' : 'w-20'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <nav className="p-4">
            <ul className="space-y-3">
              <SidebarItem to="/admin/dashboard" label="Dashboard" icon={MdDashboard} isExpanded={isExpanded} />
              <SidebarItem to="/admin/users" label="Users" icon={MdPeople} isExpanded={isExpanded} />
              <SidebarItem to="/admin/appointments" label="Appointments" icon={MdEventNote} isExpanded={isExpanded} />
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, label, icon: Icon, isExpanded }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <div className="w-6 h-6 mr-2 text-xl text-gray-500">
        {Icon && <Icon />}
      </div>
      <span className={`ml-1 ${!isExpanded && 'opacity-0'} transition-opacity duration-300`}>
        {label}
      </span>
    </NavLink>
  </li>
);

export default AdminLayout;
