import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MenuManagementPage = () => {
  const { user } = useAuth()
  const [menuItems, setMenuItems] = useState([
    { 
      id: 1, 
      name: 'Món ăn 1', 
      category: 'Món chính',
      price: 150000,
      image: 'https://via.placeholder.com/150',
      status: 'available'
    },
    // Thêm dữ liệu mẫu
  ])

  // Kiểm tra đăng nhập
  if (!user) {
    return <Navigate to="/login" />
  }

  const handleDeleteItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId))
    toast.success('Xóa món ăn thành công!')
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý thực đơn</h1>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Thêm món ăn mới
              </button>
            </div>
          </div>

          {/* Bộ lọc */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex space-x-4">
              <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Tất cả danh mục</option>
                <option>Món chính</option>
                <option>Món phụ</option>
                <option>Tráng miệng</option>
              </select>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Tất cả trạng thái</option>
                <option>Còn hàng</option>
                <option>Hết hàng</option>
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 flex-1"
              />
            </div>
          </div>

          {/* Danh sách món ăn */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'available' ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-medium text-gray-900">
                    {item.price.toLocaleString('vi-VN')} đ
                  </p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Sửa
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">9</span> trong số <span className="font-medium">20</span> món ăn
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Trước</button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Sau</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuManagementPage
