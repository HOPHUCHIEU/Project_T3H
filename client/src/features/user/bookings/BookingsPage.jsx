import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/common/Header';
// import MainLayout from '../../../components/layouts/MainLayout';

const BookingsPage = () => {
  // Giả lập dữ liệu đặt bàn
  const bookings = [
    {
      id: 1,
      date: '2025-06-10',
      time: '18:30',
      guests: 4,
      status: 'Đã xác nhận',
    },
    {
      id: 2,
      date: '2025-06-15',
      time: '19:00',
      guests: 2,
      status: 'Chờ xác nhận',
    },
  ];

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

            <div className="space-y-6">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
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
                        Ngày: {new Date(booking.date).toLocaleDateString('vi-VN')}
                      </p>
                      <p className="text-gray-600">Thời gian: {booking.time}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm ${
                      booking.status === 'Đã xác nhận' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex space-x-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Chỉnh sửa
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Hủy đặt bàn
                    </button>
                  </div>
                </motion.div>
              ))}
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
