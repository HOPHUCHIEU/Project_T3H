import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const DashboardPage = () => {
  const { user } = useAuth()
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('token') // hoặc lấy từ context nếu có
        const res = await fetch('http://localhost:3000/users/count', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const count = await res.json()
          setUserCount(count)
        } else {
          setUserCount(0)
        }
      } catch {
        setUserCount(0)
      }
    }
    if (user) fetchUserCount()
  }, [user])

  // Kiểm tra đăng nhập
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
          {/* Thống kê tổng quan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Tổng số người dùng</h3>
              <p className="text-3xl font-bold text-blue-600">{userCount}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Tổng số món ăn</h3>
              <p className="text-3xl font-bold text-green-600">45</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Đơn đặt hàng mới</h3>
              <p className="text-3xl font-bold text-purple-600">25</p>
            </div>
          </div>

          {/* Biểu đồ hoặc dữ liệu chi tiết */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Doanh thu theo tháng</h3>
              <div className="h-64 bg-white rounded border border-gray-200">
                {/* Thêm biểu đồ doanh thu ở đây */}
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Món ăn phổ biến</h3>
              <div className="space-y-4">
                {/* Danh sách món ăn phổ biến */}
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span>Món ăn 1</span>
                  <span className="text-green-600">89 đơn</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span>Món ăn 2</span>
                  <span className="text-green-600">76 đơn</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span>Món ăn 3</span>
                  <span className="text-green-600">65 đơn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
