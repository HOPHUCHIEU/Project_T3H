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
  const [message, setMessage] = useState('')
  // Thêm state cho phân trang và tìm kiếm
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await userService.getAllUsers(page, limit, search)
      let userList = Array.isArray(data) ? data : data.users
      if (!Array.isArray(userList)) userList = []
      // Lọc bỏ admin trước khi phân trang
      let filteredUsers = userList.filter(u => u.role !== 'admin')
      // Nếu có search, ưu tiên user khớp từ khóa lên đầu
      if (search.trim()) {
        const keyword = search.trim().toLowerCase()
        filteredUsers = filteredUsers.sort((a, b) => {
          const aMatch = a.username.toLowerCase().includes(keyword) || a.email.toLowerCase().includes(keyword)
          const bMatch = b.username.toLowerCase().includes(keyword) || b.email.toLowerCase().includes(keyword)
          if (aMatch && !bMatch) return -1
          if (!aMatch && bMatch) return 1
          return 0
        })
      }
      setUsers(filteredUsers)
      // Tính lại totalPages dựa trên số lượng user đã filter nếu API không trả về đúng
      const total = data.totalPages || Math.ceil(filteredUsers.length / limit) || 1
      setTotalPages(total)
    } catch {
      setUsers([])
      setTotalPages(1)
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
        setMessage('Cập nhật người dùng thành công!')
        toast.success('Cập nhật thành công!')
      } else {
        await userService.registerUser(form);
        setMessage('Thêm người dùng thành công!')
        toast.success('Thêm người dùng thành công!')
      }
      setShowModal(false)
      fetchUsers()
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Thao tác thất bại!')
      toast.error('Thao tác thất bại!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-10 pb-12">
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg animate-fadeIn">
          {message}
        </div>
      )}
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý người dùng</h1>
              <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Thêm người dùng
              </button>
            </div>
            {/* Tìm kiếm */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Tìm kiếm tên hoặc email..."
                className="border px-3 py-2 rounded-lg w-64"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
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
                ) : users.slice((page-1)*limit, page*limit).map((user, idx) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(page - 1) * limit + idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-semibold transition"
                        onClick={() => handleEditUser(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                        onClick={() => handleDeleteUser(user._id)}
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
                  Hiển thị{' '}
                  <span className="font-medium">{(page - 1) * limit + 1}</span>{' '}
                  đến{' '}
                  <span className="font-medium">{Math.min(page * limit, users.length)}</span>{' '}
                  trong số <span className="font-medium">{users.length}</span> người dùng
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Trước
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded-md ${
                      page === i + 1
                        ? 'bg-red-100 text-red-700 font-bold'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages || totalPages === 0}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal thêm/sửa user */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)'}}>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl min-w-[350px] w-full max-w-md space-y-6 animate-fadeIn border border-gray-200">
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
                {/* Ẩn option admin khi thêm/sửa */}
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