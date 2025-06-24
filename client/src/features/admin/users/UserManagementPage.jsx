import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userService } from '../../../services/user.service'

const initialForm = { username: '', email: '', password: '', role: 'user' }

const UserManagementPage = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch {
      toast.error('Không thể tải danh sách người dùng!')
    }
    setLoading(false)
  }

  // Kiểm tra đăng nhập
  if (!user) {
    return <Navigate to="/login" />
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) return
    try {
      await userService.deleteUser(userId)
      setUsers(users.filter(u => u._id !== userId))
      toast.success('Xóa người dùng thành công!')
    } catch {
      toast.error('Xóa thất bại!')
    }
  }

  const handleEditUser = (user) => {
    setForm({ username: user.username, email: user.email, password: '', role: user.role })
    setEditId(user._id)
    setShowModal(true)
  }

  const handleAddUser = () => {
    setForm(initialForm)
    setEditId(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let submitForm = { ...form }
      if (editId && !form.password) {
        // Nếu đang sửa và không nhập mật khẩu mới thì không gửi trường password
        const { password: _omit, ...rest } = submitForm
        submitForm = rest
      }
      // Nếu đang sửa và email không đổi thì không gửi email
      if (editId) {
        const oldUser = users.find(u => u._id === editId)
        if (oldUser && oldUser.email === submitForm.email) {
          const { email: _omit, ...rest } = submitForm
          submitForm = rest
        }
        await userService.updateUser(editId, submitForm)
        toast.success('Cập nhật thành công!')
      } else {
        await userService.register(form.username, form.email, form.password)
        toast.success('Thêm người dùng thành công!')
      }
      setShowModal(false)
      fetchUsers()
    } catch {
      toast.error('Thao tác thất bại!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý người dùng</h1>
              <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Thêm người dùng
              </button>
            </div>
          </div>

          {/* Bảng danh sách người dùng */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người dùng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-8">Đang tải...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8">Không có người dùng</td></tr>
                ) : users.map((user, idx) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleEditUser(user)}>Sửa</button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteUser(user._id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal thêm/sửa user */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl min-w-[350px] w-full max-w-md space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-2 text-center text-green-700">{editId ? 'Sửa người dùng' : 'Thêm người dùng'}</h2>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Tên người dùng</label>
              <input type="text" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Email</label>
              <input type="email" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            {!editId && (
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Mật khẩu</label>
                <input type="password" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Vai trò</label>
              <select className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={() => setShowModal(false)}>Hủy</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow">{editId ? 'Lưu' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserManagementPage
