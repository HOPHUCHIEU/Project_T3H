import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

const AboutPage = () => {
  useEffect(() => {
    // SEO Meta Tagsádasdasd
    document.title = "Về chúng tôi | Luxury Buffet - Nhà hàng Buffet cao cấp";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Khám phá câu chuyện của Luxury Buffet - Nơi hội tụ tinh hoa ẩm thực với hơn 10 năm kinh nghiệm phục vụ.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Về Chúng Tôi</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Nơi hội tụ tinh hoa ẩm thực từ khắp nơi trên thế giới
            </p>
          </div>
        </div>
      </motion.div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
            <p className="text-gray-600 mb-4">
              Được thành lập vào năm 2015, Luxury Buffet bắt đầu với một ước mơ đơn giản: 
              mang đến trải nghiệm ẩm thực đẳng cấp quốc tế cho thực khách Việt Nam.
            </p>
            <p className="text-gray-600 mb-4">
              Trải qua hơn 10 năm phát triển, chúng tôi tự hào là một trong những nhà hàng 
              buffet hàng đầu với hơn 200+ món ăn được chế biến từ những nguyên liệu tươi ngon nhất.
            </p>
          </div>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3"
            alt="Restaurant interior"
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>

      {/* Values Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🌟",
              title: "Chất lượng",
              description: "Cam kết sử dụng nguyên liệu tươi ngon nhất"
            },
            {
              icon: "🤝",
              title: "Dịch vụ",
              description: "Phục vụ chuyên nghiệp, tận tâm với khách hàng"
            },
            {
              icon: "♻️",
              title: "Bền vững",
              description: "Thực phẩm có nguồn gốc rõ ràng, thân thiện môi trường"
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
              className="text-center p-6 bg-white rounded-lg shadow-lg cursor-pointer"
            >
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Gordon James Ramsay",
                position: "Bếp trưởng",
                image: "https://cdn-ak.f.st-hatena.com/images/fotolife/n/nguoidoidien/20181114/20181114165927.jpg"
              },
              {
                name: "Trần Quốc Toản",
                position: "Quản lý nhà hàng",
                image: "https://cdnmedia.baotintuc.vn/Upload/DGCvMTLSo95Cq4TvfGr0A/files/2019/04/11-4/Dau%20bep.jpg"
              },
              {
                name: "Võ Văn Kiệt",
                position: "Bếp trưởng món Á",
                image: "https://cdn.24h.com.vn/upload/3-2022/images/2022-09-13/dau-bep-Nguyen-Tuan-Anh-uoc-muon-Viet-Nam-tro-thanh-diem-den-am-thuc-cua-the-gioi-anh--1--1663041034-578-width660height989.jpg"
              },
              {
                name: "Martin Yan",
                position: "Bếp trưởng món Âu",
                image: "https://www.cet.edu.vn/wp-content/uploads/2018/05/dau-bep.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div 
                  className="relative mb-4 aspect-square overflow-hidden rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
