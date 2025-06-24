import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedDate, setSelectedTime, setGuests, setNote, resetForm
} from '../features/reservationFormSlice';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const { selectedDate, selectedTime, guests, note } = useSelector((state) => state.reservationForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Xử lý gửi dữ liệu
    const reservationData = {
      selectedDate,
      selectedTime,
      guests,
      note,
    };

    // Ở đây bạn có thể gửi reservationData tới API/server
    alert(`Dữ liệu đặt bàn:\n${JSON.stringify(reservationData, null, 2)}`);

    // Sau khi gửi, reset form
    dispatch(resetForm());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Đặt bàn nhà hàng</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Ngày <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => dispatch(setSelectedDate(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Thời gian <span className="text-red-500">*</span></label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => dispatch(setSelectedTime(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
            step="60" // chọn từng phút, muốn mượt hơn thì đổi step (ví dụ 300 là 5 phút)
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Số người <span className="text-red-500">*</span></label>
          <input
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={(e) => dispatch(setGuests(Number(e.target.value)))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Ghi chú</label>
          <textarea
            value={note}
            onChange={(e) => dispatch(setNote(e.target.value))}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
            placeholder="Ví dụ: Có trẻ em, cần ghép bàn, dị ứng thực phẩm..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-800 transition-colors text-lg font-bold shadow-md"
      >
        Xác nhận đặt bàn
      </button>
    </form>
  );
};

export default ReservationForm;
