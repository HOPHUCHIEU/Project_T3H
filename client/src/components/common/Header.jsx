import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Kiểm tra nếu đang ở trang login hoặc signup thì không hiển thị header
  const hideHeaderPaths = ["/login", "/signup"];
  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

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
          className={`text-2xl font-bold ${
            isScrolled ? "text-red-600" : "text-white"
          } transition-colors duration-300`}
        >
          Luxury Buffet
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-red-600 transition-colors duration-300`}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
            <a href="#booking">Đặt bàn</a>
          </button>
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

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
                  {user.role === "admin" ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
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
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        to="/users"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
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
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        Quản lý người dùng
                      </Link>
                      <Link
                        to="/menu"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        Quản lý thực đơn
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
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
                            d="M5.121 17.804A9.004 9.004 0 0112 15c2.21 0 4.21.805 5.879 2.135M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/bookings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
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
                            d="M8 7V3m8 4V3m-9 8h10m-5 4h5m-5 4h5M3 7h18M5 11v10h14V11H5z"
                          />
                        </svg>
                        Lịch hẹn đặt bàn
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-100"></div>
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      {headerContent}
    </header>
  ) : (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      {headerContent}
    </header>
  );
};

export default Header;
