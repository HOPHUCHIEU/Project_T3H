import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    
    const token = localStorage.getItem('userToken')
    setIsLoggedIn(!!token)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const navLinks = [
    { to: "/", text: "Trang chủ" },
    { to: "/service", text: "Dịch vụ" },
    { to: "/about", text: "Về chúng tôi" },
    { to: "/contact", text: "Liên hệ" }
  ]

  const headerContent = (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        {isHomePage ? (
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/" className={`text-2xl font-bold ${isScrolled ? 'text-red-600' : 'text-white'} transition-colors duration-300`}>
              Luxury Buffet
            </Link>
          </motion.div>
        ) : (
          <Link to="/" className="text-2xl font-bold text-red-600">
            Luxury Buffet
          </Link>
        )}

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            isHomePage ? (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={link.to} 
                  className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-red-600 transition-colors duration-300`}
                >
                  {link.text}
                </Link>
              </motion.div>
            ) : (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-gray-800 hover:text-red-600 transition-colors duration-300"
              >
                {link.text}
              </Link>
            )
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button   className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
            <a href="#booking">Đặt bàn</a>
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2"
              >
                <img
                  src="https://ui-avatars.com/api/?name=User&background=random"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Thông tin cá nhân
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Lịch đặt bàn
                    </Link>
                    <Link to="/payments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Thanh toán
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
  )

  return isHomePage ? (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {headerContent}
    </motion.header>
  ) : (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      {headerContent}
    </header>
  )
}

export default Header