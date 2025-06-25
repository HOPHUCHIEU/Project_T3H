import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => navigate("/login");

  const navLinks = [
    { to: "/", text: "Trang chủ" },
    { to: "/service", text: "Dịch vụ" },
    { to: "/about", text: "Về chúng tôi" },
    { to: "/contact", text: "Liên hệ" },
  ];

  const headerContent = (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-600"
        >
          Luxury Buffet
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-red-600 font-semibold"
                  : isHomePage && !isScrolled
                  ? "text-white"
                  : "text-gray-800 hover:text-red-600"
              }`}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {(!user || user.role !== "admin") && (
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
              <a href="#booking">Đặt bàn</a>
            </button>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-6 py-2 rounded-full bg-white text-gray-800 border border-gray-200"
              >
                <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="font-medium">{user.username}</span>
                <svg
                  className="w-4 h-4 ml-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
                  {user.role === "admin" ? (
                    <>
                      <DropdownItem to="/admin/dashboard" text="Dashboard" />
                      <DropdownItem to="/admin/users" text="Quản lý người dùng" />
                      <DropdownItem to="/admin/appointments" text="Quản lý thực đơn" />
                    </>
                  ) : (
                    <>
                      <DropdownItem to="/profile" text="Thông tin cá nhân" />
                      <DropdownItem
                        to="/bookings"
                        text="Lịch hẹn đặt bàn"
                        highlight={location.pathname === "/bookings"}
                      />
                    </>
                  )}
                  <div className="border-t border-gray-100" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return isHomePage ? (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-[#e3f0fa] shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: isScrolled
          ? "#e3f0fa" // màu xanh dương nhạt khi scroll trên trang chủ
          : "rgba(0, 0, 0, 0)",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {headerContent}
    </motion.header>
  ) : (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#e3f0fa] shadow-lg">
      {headerContent}
    </header>
  );
};

const DropdownItem = ({ to, text, highlight }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2 text-sm ${
      highlight ? "text-red-600 font-semibold" : "text-gray-700"
    } hover:bg-gray-100`}
  >
    {text}
  </Link>
);

export default Header;
