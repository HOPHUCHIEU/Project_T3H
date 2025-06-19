import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AppointmentManagementPage = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      date: "2025-06-20",
      time: "18:30",
      guests: 4,
      status: "pending",
      phoneNumber: "0123456789",
      notes: "Vị trí gần cửa sổ",
      createdAt: "2025-06-16"
    },
    // Dữ liệu mẫu
  ])

  const [filterStatus, setFilterStatus] = useState('all')

  // Kiểm tra đăng nhập và quyền admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(app => 
      app.id === appointmentId 
        ? { ...app, status: newStatus }
        : app
    ))
    toast.success('Cập nhật trạng thái thành công!')
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
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.notes}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.guests} người
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Xác nhận
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Hủy
                            </button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Hoàn thành
                          </button>
                        )}
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Chi tiết
                        </button>
                      </div>
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
