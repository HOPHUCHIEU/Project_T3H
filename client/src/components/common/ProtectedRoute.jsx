import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth()

  if (!user) {
    // Nếu chưa đăng nhập, chuyển về trang login
    return <Navigate to="/login" />
  }

  if (adminOnly && user.role !== 'admin') {
    // Nếu trang yêu cầu admin nhưng user không phải admin
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute