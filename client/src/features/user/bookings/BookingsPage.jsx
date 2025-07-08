import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/common/Header';
import { appointmentService } from '../../../services/appointment.service';
import { useAuth } from '../../../context/AuthContext';

const statusMap = {
  approved: { text: 'Đã xác nhận', className: 'bg-green-100 text-green-800' },
  confirmed: { text: 'Đã xác nhận', className: 'bg-green-100 text-green-800' }, // fallback
  pending: { text: 'Chờ xác nhận', className: 'bg-yellow-100 text-yellow-800' },
  cancelled: { text: 'Đã hủy', className: 'bg-red-100 text-red-800' },
  // completed: { text: 'Đã hoàn thành', className: 'bg-blue-100 text-blue-800' },
};

const BookingsPage = () => {
  useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await appointmentService.getMyAppointments();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError('Không thể tải lịch đặt bàn!');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Lịch đặt bàn của bạn</h1>
            {loading ? (
              <div className="text-center py-8 text-lg text-gray-500">Đang tải dữ liệu...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Bạn chưa có lịch đặt bàn nào.</div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const statusObj = statusMap[booking.status] || { text: booking.status, className: 'bg-gray-100 text-gray-800' };
                  return (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Đặt bàn {booking.guests} người
                          </h3>
                          <p className="text-gray-600">
                            Ngày: {booking.date ? new Date(booking.date + 'T00:00:00').toLocaleDateString('vi-VN') : ''}
                          </p>
                          <p className="text-gray-600">Thời gian: {booking.time}</p>
                          {booking.note && <p className="text-gray-500 mt-1">Ghi chú: {booking.note}</p>}
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm ${statusObj.className}`}>
                          {statusObj.text}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            <div className="mt-8">
              <a href="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Đặt bàn mới
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
