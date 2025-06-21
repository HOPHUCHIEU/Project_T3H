import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState(2);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đặt bàn ở đây
    console.log({ selectedDate, selectedTime, guests });
  };

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
              className="text-7xl font-bold mb-6 font-serif"
            >
              Luxury Buffet
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Ngày</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Thời gian</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Số người</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold"
              >
                Xác nhận đặt bàn
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
      <Outlet />
      <Footer />
    </div>
    
  );
  
};

export default HomePage;
