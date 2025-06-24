import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/common/Header';
import { appointmentService } from '../../../services/appointment.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await appointmentService.getMyAppointments();
        setBookings(data);
      } catch (err) {
        console.error('Load bookings error:', err);
        toast.error('Không thể tải lịch đặt bàn!');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto p-6">
          <ToastContainer />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Lịch đặt bàn của bạn</h1>

            <div className="space-y-6">
              {loading ? (
                <p>Đang tải...</p>
              ) : bookings.length === 0 ? (
                <p>Bạn chưa có lịch đặt bàn nào.</p>
              ) : (
                bookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Đặt bàn {booking.numberOfPeople} người
                        </h3>
                        <p className="text-gray-600">
                          Ngày: {new Date(booking.date).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-gray-600">Thời gian: {booking.time}</p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Đặt bàn mới
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
