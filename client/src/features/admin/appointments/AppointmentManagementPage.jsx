import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { appointmentService } from '../../../services/appointment.service'

const AppointmentManagementPage = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const data = await appointmentService.getAppointments()
      setAppointments(data)
    } catch {
      toast.error('Không thể tải danh sách lịch hẹn!')
    } finally {
      setLoading(false)
    }
  }

  // Kiểm tra đăng nhập và quyền admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />
  }


  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận'
      case 'confirmed':
        return 'Đã xác nhận'
      case 'cancelled':
        return 'Đã hủy'
      case 'completed':
        return 'Hoàn thành'
      default:
        return status
    }
  }

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(app => app.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý lịch hẹn</h1>
              <div className="flex items-center space-x-4">
                <select 
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Thêm lịch hẹn
                </button>
              </div>
            </div>
          </div>

          {/* Bảng lịch hẹn */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày giờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số khách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={8} className="text-center py-8">Đang tải...</td></tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8">Không có lịch hẹn</td></tr>
                ) : filteredAppointments.map((app) => (
                  <tr key={app._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.userId?.username || app.userId?.email || 'Ẩn'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.date?.slice(0,10)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.numberOfPeople}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(app.status)}`}>{getStatusText(app.status)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.notes || ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* Thêm nút xác nhận/hủy nếu muốn */}
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
                  Hiển thị <span className="font-medium">1</span> đến{" "}
                  <span className="font-medium">10</span> trong số{" "}
                  <span className="font-medium">20</span> lịch hẹn
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Trước
                </button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">
                  1
                </button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentManagementPage
