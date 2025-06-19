import { Navigate } from 'react-router-dom';
import DashboardPage from '../features/admin/dashboard/DashboardPage';
import AppointmentManagementPage from '../features/admin/appointments/AppointmentManagementPage';
import UserManagementPage from '../features/admin/users/UserManagementPage';
import ProfilePage from '../features/user/profile/ProfilePage';
import BookingsPage from '../features/user/bookings/BookingsPage';
import LoginPage from '../page/LoginPage';
import SignupPage from '../page/SignupPage';
import HomePage from '../page/HomePage';
import NewsPage from '../features/news/NewsPage';
import NewsDetail from '../features/news/NewsDetail';
import ProtectedRoute from '../components/common/ProtectedRoute';

import AdminLayout from '../components/layouts/AdminLayout';

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/profile',
    element: <ProtectedRoute roles={['user', 'admin']}><ProfilePage /></ProtectedRoute>
  },
  {
    path: '/bookings',
    element: <ProtectedRoute roles={['user', 'admin']}><BookingsPage /></ProtectedRoute>
  },
  {
    path: '/admin',
    element: <ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'appointments',
        element: <AppointmentManagementPage />
      },
      {
        path: 'users',
        element: <UserManagementPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

export default routes;
