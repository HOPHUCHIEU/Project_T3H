import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appointmentService } from "../../../services/appointment.service";
import { FiPhone, FiMail } from "react-icons/fi";

const PAGE_SIZE = 10;

const AppointmentManagementPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchAppointments(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  // Xem chi tiết lịch hẹn
  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };
  const handleCloseDetail = () => setShowDetailModal(false);

  const fetchAppointments = async (page) => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments({
        page,
        limit: PAGE_SIZE,
      });
      setAppointments(Array.isArray(data.data) ? data.data : []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Không thể tải danh sách lịch hẹn!");
    } finally {
      setLoading(false);
    }
  };

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

  const handleChangeStatus = async (id, status) => {
    try {
      await appointmentService.changeStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
      fetchAppointments(currentPage);
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

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

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((app) => app.status === filterStatus);

  const getIndex = (idx) => (currentPage - 1) * PAGE_SIZE + idx + 1;
  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  return (
    <div className="min-h-screen bg-gray-100 pt-7 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
            <div className="flex items-center space-x-4">
              <select
                className="rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="approved">Đã xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition flex items-center gap-2"
                onClick={() => fetchAppointments(currentPage)}
                title="Tải lại bảng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0113.5-5.303M4.5 12v-3.75m0 3.75h3.75M19.5 12a7.5 7.5 0 01-13.5 5.303M19.5 12v3.75m0-3.75h-3.75"
                  />
                </svg>
                Tải lại
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Ngày giờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Số khách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Thông tin liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      Không có lịch hẹn
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app, idx) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{getIndex(idx)}</td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-blue-700 underline cursor-pointer font-medium"
                        onClick={() => handleShowDetail(app)}
                        title="Xem chi tiết"
                      >
                        {app.customerName || "Ẩn"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold">{app.date?.slice(0, 10)}</div>
                        <div className="text-sm text-gray-500">{app.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {app.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                            app.status
                          )}`}
                        >
                          {getStatusText(app.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {app.customerPhone && (
                            <span className="flex items-center gap-1">
                              <FiPhone className="inline mr-1 text-red-500" />{" "}
                              {app.customerPhone}
                            </span>
                          )}
                          {app.customerEmail && (
                            <span className="flex items-center gap-1">
                              <FiMail className="inline mr-1 text-blue-500" />{" "}
                              {app.customerEmail}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-semibold transition"
                          onClick={() => handleChangeStatus(app._id, "approved")}
                          disabled={
                            app.status === "approved" || app.status === "completed"
                          }
                        >
                          Xác nhận
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                          onClick={() => handleChangeStatus(app._id, "cancelled")}
                          disabled={
                            app.status === "cancelled" || app.status === "completed"
                          }
                        >
                          Huỷ
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded font-semibold transition"
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
                        ? "bg-red-100 text-red-700 font-bold"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Modal chi tiết lịch hẹn */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 bg-blue bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-md w-full relative animate-fadeIn">
            <button
              onClick={handleCloseDetail}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-red-500"
              aria-label="Đóng"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-700">
              Chi tiết lịch hẹn
            </h2>
            <div className="mb-2">
              <b>Khách hàng:</b> {selectedAppointment.customerName}
            </div>
            <div className="mb-2">
              <b>Số điện thoại:</b> {selectedAppointment.customerPhone}
            </div>
            <div className="mb-2">
              <b>Ngày giờ:</b> {selectedAppointment.date?.slice(0, 10)}{" "}
              {selectedAppointment.time}
            </div>
            <div className="mb-2">
              <b>Số khách:</b> {selectedAppointment.guests}
            </div>
            <div className="mb-2">
              <b>Trạng thái:</b> {getStatusText(selectedAppointment.status)}
            </div>
            <div className="mb-2">
              <b>Ghi chú:</b>{" "}
              {selectedAppointment.note ? (
                <span className="italic text-gray-800">
                  {selectedAppointment.note}
                </span>
              ) : (
                <span className="italic text-gray-400">Không có</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagementPage;
