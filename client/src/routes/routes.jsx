import { Navigate } from "react-router-dom";

// Admin pages
import DashboardPage from "../features/admin/dashboard/DashboardPage";
import AppointmentManagementPage from "../features/admin/appointments/AppointmentManagementPage";
import UserManagementPage from "../features/admin/users/UserManagementPage";
import MenuManagementPage from "../features/admin/menu/MenuManagementPage";

// User pages
import ProfilePage from "../features/user/profile/ProfilePage";
import BookingsPage from "../features/user/bookings/BookingsPage";

// Public pages
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SignupPage";
import HomePage from "../page/HomePage";
import AboutPage from "../page/AboutPage";
import Contact from "../page/Contact";
import Service from "../page/Service";

// Auth layout & protection
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../components/layouts/AdminLayout";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute roles={["user", "admin"]}>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <ProtectedRoute roles={["user", "admin"]}>
        <BookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "appointments", element: <AppointmentManagementPage /> },
      { path: "menu", element: <MenuManagementPage /> },
      { path: "users", element: <UserManagementPage /> },
    ],
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
