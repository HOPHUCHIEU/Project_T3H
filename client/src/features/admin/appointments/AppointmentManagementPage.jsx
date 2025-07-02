import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appointmentService } from "../../../services/appointment.service";

const PAGE_SIZE = 10;

const AppointmentManagementPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  const fetchAppointments = async (page) => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments({ page, limit: PAGE_SIZE });
      setAppointments(Array.isArray(data.data) ? data.data : []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Không thể tải danh sách lịch hẹn!");
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra đăng nhập và quyền admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "approved":
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  // Đổi trạng thái lịch hẹn
  const handleChangeStatus = async (id, status) => {
    try {
      await appointmentService.changeStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
      fetchAppointments(currentPage);
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  // Xoá lịch hẹn
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá lịch hẹn này?")) return;
    try {
      await appointmentService.deleteAppointment(id);
      toast.success("Đã xoá lịch hẹn!");
      fetchAppointments(currentPage);
    } catch {
      toast.error("Xoá thất bại!");
    }
  };

  // Lọc theo trạng thái
  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((app) => app.status === filterStatus);

  // Tính STT cho từng dòng (theo phân trang)
  const getIndex = (idx) => (currentPage - 1) * PAGE_SIZE + idx + 1;

  const totalPages = Math.ceil(total / PAGE_SIZE);

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
                  <option value="approved">Đã xác nhận</option>
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
                    STT
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
                  <tr>
                    <td colSpan={8} className="text-center py-8">
                      Đang tải...
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8">
                      Không có lịch hẹn
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app, idx) => (
                    <tr key={app._id}>
                      {/* STT */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getIndex(idx)}
                      </td>
                      {/* Tên khách hàng */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.customerName || "Ẩn"}
                      </td>
                      {/* Ngày giờ */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.date?.slice(0, 10)} {app.time}
                      </td>
                      {/* Số khách */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.guests}
                      </td>
                      {/* Trạng thái */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                            app.status
                          )}`}
                        >
                          {getStatusText(app.status)}
                        </span>
                      </td>
                      {/* Thông tin liên hệ */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          {app.customerPhone && (
                            <div>📞 {app.customerPhone}</div>
                          )}
                          {app.customerEmail && (
                            <div>✉️ {app.customerEmail}</div>
                          )}
                        </div>
                      </td>
                      {/* Thao tác */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() => handleChangeStatus(app._id, "approved")}
                          disabled={app.status === "approved" || app.status === "completed"}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleChangeStatus(app._id, "cancelled")}
                          disabled={app.status === "cancelled" || app.status === "completed"}
                        >
                          Huỷ
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                          onClick={() => handleDelete(app._id)}
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * PAGE_SIZE + 1}
                  </span>{" "}
                  đến{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * PAGE_SIZE, total)}
                  </span>{" "}
                  trong số <span className="font-medium">{total}</span> lịch hẹn
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === i + 1
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagementPage;
