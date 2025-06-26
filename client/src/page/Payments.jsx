import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const fakeHistory = [
  {
    id: 123,
    date: '15/06/2025',
    amount: 1500000,
    status: 'Đã thanh toán',
  },
  {
    id: 122,
    date: '10/06/2025',
    amount: 2000000,
    status: 'Đã thanh toán',
  },
  {
    id: 121,
    date: '05/06/2025',
    amount: 950000,
    status: 'Đã thanh toán',
  },
];

const Payments = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage (nếu có)
    const cartData = localStorage.getItem('cartFoods');
    if (cartData) {
      setCart(JSON.parse(cartData));
    } else {
      // Nếu chưa có, kiểm tra selectedFood (từ đặt món)
      const foodData = localStorage.getItem('selectedFood');
      if (foodData) {
        const food = JSON.parse(foodData);
        setCart([{ ...food, quantity: 1 }]);
        localStorage.setItem('cartFoods', JSON.stringify([{ ...food, quantity: 1 }]));
        localStorage.removeItem('selectedFood');
      }
    }
  }, []);

  // Nếu người dùng chọn món mới ở trang khác, thêm vào giỏ hàng
  useEffect(() => {
    const foodData = localStorage.getItem('selectedFood');
    if (foodData) {
      const food = JSON.parse(foodData);
      setCart(prevCart => {
        // Kiểm tra nếu món đã có thì tăng số lượng, chưa có thì thêm mới
        const idx = prevCart.findIndex(item => item.slug === food.slug);
        let newCart;
        if (idx !== -1) {
          newCart = [...prevCart];
          newCart[idx].quantity += 1;
        } else {
          newCart = [...prevCart, { ...food, quantity: 1 }];
        }
        localStorage.setItem('cartFoods', JSON.stringify(newCart));
        return newCart;
      });
      localStorage.removeItem('selectedFood');
    }
  }, []);

  // Thay đổi số lượng món ăn
  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, value);
    setCart(newCart);
    localStorage.setItem('cartFoods', JSON.stringify(newCart));
  };

  // Xóa món ăn khỏi giỏ hàng
  const handleRemoveItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cartFoods', JSON.stringify(newCart));
  };

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h1>

            {cart.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Các món đã chọn</h2>
                <div className="space-y-6">
                  {cart.map((item, idx) => (
                    <div key={item.slug || idx} className="flex items-center gap-6 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <div className="text-gray-600 text-sm mb-1">Khu vực phục vụ: <span className="font-semibold">{item.location}</span></div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 font-bold">₫{item.price.toLocaleString()}</span>
                          <span className="mx-2">x</span>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={e => handleQuantityChange(idx, parseInt(e.target.value) || 1)}
                            className="w-16 border rounded px-2 py-1 text-center"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-[120px]">
                        <div className="text-lg font-bold text-gray-800 text-right">
                          ₫{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <span className="text-2xl font-bold text-red-600">Tổng cộng: ₫{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Thẻ tín dụng/Ghi nợ</h3>
                        <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                        <p className="text-sm text-gray-600">Thanh toán trực tiếp qua ngân hàng</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Tiền mặt</h3>
                        <p className="text-sm text-gray-600">Thanh toán khi đến nhà hàng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Lịch sử thanh toán</h2>
                <div className="space-y-4">
                  {fakeHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Đặt bàn #{item.id}</h3>
                          <p className="text-sm text-gray-600">Ngày: {item.date}</p>
                          <p className="text-sm text-gray-600">Số tiền: {item.amount.toLocaleString()} VNĐ</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Payments;
