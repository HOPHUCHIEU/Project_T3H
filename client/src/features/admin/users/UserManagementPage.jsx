import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserManagementPage = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'User' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'Admin' },
    // Thêm dữ liệu mẫu
  ])

  // Kiểm tra đăng nhập
  if (!user) {
    return <Navigate to="/login" />
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
    toast.success('Xóa người dùng thành công!')
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý người dùng</h1>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Thêm người dùng
              </button>
            </div>
          </div>

          {/* Bảng danh sách người dùng */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Sửa
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> trong số <span className="font-medium">20</span> người dùng
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Trước</button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Sau</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
