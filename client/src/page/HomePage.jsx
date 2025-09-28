import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { appointmentService } from "../services/appointment.service";
import { useAuth } from "../context/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import foods from "../data/foods";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //hiển thị đặt lịch hẹn trên homepage
  // const [myBookings, setMyBookings] = useState([]);
  // const [loadingBookings, setLoadingBookings] = useState(true);
  // const [errorBookings, setErrorBookings] = useState("");
  //end hiển thị đặt lịch hẹn trên homepage

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const navigate = useNavigate();
  useAuth();

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Luxury Buffet | Nhà hàng Buffet cao cấp";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Đặt bàn tại Luxury Buffet - Trải nghiệm ẩm thực buffet cao cấp với hơn 200+ món ăn. Không gian sang trọng, dịch vụ 5 sao.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  // useEffect(() => {
  //   // Lấy lịch đặt bàn của user
  //   const fetchBookings = async () => {
  //     setLoadingBookings(true);
  //     setErrorBookings("");
  //     try {
  //       const data = await appointmentService.getMyAppointments();
  //       setMyBookings(data);
  //     } catch {
  //       setErrorBookings("Không thể tải lịch đặt bàn!");
  //     } finally {
  //       setLoadingBookings(false);
  //     }
  //   };
  //   fetchBookings();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!selectedDate || !selectedTime || !guests) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      await appointmentService.createAppointment({
        date: selectedDate,
        time: selectedTime,
        guests, 
        note, 
        customerName,
        customerPhone
      });
      // Sau khi đặt bàn thành công, chuyển hướng sang bookings
      navigate("/bookings");
    } catch {
      setError("Đặt bàn thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const handleFoodClick = (slug) => {
    navigate(`/food/${slug}`);
  };

  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [errorFoods, setErrorFoods] = useState("");

  useEffect(() => {
      setLoadingFoods(true);
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/menus/all`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setFoods(data);
          } else {
            setFoods([]);
          }
          setLoadingFoods(false);
        })
        .catch(() => {
          setErrorFoods("Không thể tải danh sách món ăn!");
          setFoods([]);
          setLoadingFoods(false);
        });
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            alt="Luxury Restaurant Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center space-y-8"
          >
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-bold mb-6 font-serif flex justify-center items-center select-none"
            >
              <span className="text-red-600">Luxury</span>
              <span className="text-blue-600 ml-2">Buffet</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl mb-8 font-light"
            >
              Nơi hương vị gặp gỡ đẳng cấp
            </motion.p>
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-red-600 text-white px-12 py-4 rounded-full hover:bg-red-700 transition-colors text-lg font-semibold"
            >
              Đặt bàn ngay
            </motion.a>
          </motion.div>
        </div>
      </div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "200+ Món ăn",
                description: "Đa dạng từ Á đến Âu",
                icon: "🍽️",
              },
              {
                title: "Không gian sang trọng",
                description: "Thiết kế hiện đại, view đẹp",
                icon: "✨",
              },
              {
                title: "Dịch vụ 5 sao",
                description: "Phục vụ chuyên nghiệp",
                icon: "⭐",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, 2, -2, 0],
                  transition: {
                    rotate: {
                      repeat: 0,
                      duration: 0.5,
                    },
                  },
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg cursor-pointer"
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Đặt bàn</h2>
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8"
            >
              <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                Đặt bàn nhà hàng
              </h2>
              {error && (
                <div className="text-center text-red-500 mb-4">{error}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Ngày <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Thời gian <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  >
                    <option value="">Chọn thời gian</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                    pattern="[0-9]{10,11}"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Số người <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                    placeholder="Ví dụ: Có trẻ em, cần ghép bàn, dị ứng thực phẩm..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-800 transition-colors text-lg font-bold shadow-md"
                disabled={loading}
              >
                {loading ? "Đang đặt bàn..." : "Xác nhận đặt bàn"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Không gian sang trọng
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              "https://statics.vincom.com.vn/xu-huong/nha-hang-view-dep-da-nang-La-Maison-Deli-1657105318.jpeg",
              "https://cdn.tgdd.vn/Files/2022/06/24/1442170/10-nha-hang-da-nang-view-dep-cuc-hap-dan-thuc-khach-202206241713197691.jpg",
              "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473719eZN/nha-hang-everland-quang-binh-898269.jpg",
              "https://digiticket.vn/blog/wp-content/uploads/2021/03/Moo-beef-steak-prime-e1616649707515-1024x829.jpg",
              "https://duonggiahotel.vn/wp-content/uploads/2023/09/nha-hang-da-nang-25.jpg",
              "https://cdn.xanhsm.com/2024/12/b2206f5c-quan-an-tran-thai-tong-10.jpg",
              "https://cdn.xanhsm.com/2024/12/572dde9b-quan-an-ho-tay-2.jpg",
              "https://toplist.vn/images/800px/bbq-and-hot-pot-world-buffet-ha-nam-564412.jpg",
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden group aspect-square"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Food Menu Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Gian món ăn nổi bật
          </h2>
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              aria-label="Tìm kiếm món ăn"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loadingFoods ? (
              <div className="col-span-full text-center text-gray-500">Đang tải danh sách món ăn...</div>
            ) : errorFoods ? (
              <div className="col-span-full text-center text-red-500">{errorFoods}</div>
            ) : filteredFoods.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">Không tìm thấy món ăn phù hợp.</div>
            ) : (
              filteredFoods.map((food, idx) => (
                <article
                  key={food._id || idx}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                  itemScope
                  itemType="http://schema.org/Product"
                  onClick={() => handleFoodClick(food.slug)}
                >
                  <img
                    src={food.image
                      ? food.image.startsWith('/uploads/menus/')
                        ? `${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}${food.image}`
                        : food.image
                      : '/vite.svg'}
                    alt={food.name}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                    itemProp="image"
                  />
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className="text-lg font-semibold mb-2 text-gray-900"
                      itemProp="name"
                    >
                      {food.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span
                        className="text-red-600 text-xl font-bold mr-2"
                        itemProp="offers"
                        itemScope
                        itemType="http://schema.org/Offer"
                      >
                        <meta itemProp="priceCurrency" content="VND" />
                        <span itemProp="price">
                          {food.price ? `₫${food.price.toLocaleString()}` : ''}
                        </span>
                      </span>
                      <span className="ml-auto flex items-center text-yellow-500">
                        <svg
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M9 1.5l2.47 5.01 5.53.8-4 3.89.94 5.5L9 13.77l-4.94 2.59.94-5.5-4-3.89 5.53-.8z" />
                        </svg>
                        {food.rating}
                      </span>
                    </div>
                    <div
                      className="text-sm text-gray-500 mb-4"
                      itemProp="description"
                    >
                      {food.location}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;
