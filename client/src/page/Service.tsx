import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'

const Service = () => {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Dịch vụ Buffet Cao cấp | Nhà hàng Luxury Buffet"
    const metaDescription = document.createElement('meta')
    metaDescription.name = "description"
    metaDescription.content = "Trải nghiệm ẩm thực buffet cao cấp với hơn 100+ món ăn từ Á đến Âu. Không gian sang trọng, dịch vụ 5 sao tại Luxury Buffet."
    document.head.appendChild(metaDescription)

    return () => {
      document.head.removeChild(metaDescription)
    }
  }, [])

  const menuCategories = [
    {
      title: "Món Á",
      description: "Các món ăn đặc sắc từ Nhật Bản, Hàn Quốc, Trung Quốc",
      image: "https://giadinh.mediacdn.vn/zoom/740_463/2015/2-nhung-mon-an-noi-tieng-chau-a-nghe-ten-da-biet-nguon-goc-50bca6d9ad-1451057260179-crop-1451057322925.jpg",
      items: ["Sushi", "Sashimi", "Kim chi", "Dimsum"]
    },
    {
      title: "Món Âu",
      description: "Những món ăn tinh tế từ Pháp, Ý, Tây Ban Nha",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3",
      items: ["Steak", "Pasta", "Seafood", "Pizza"]
    },
    {
      title: "Hải sản",
      description: "Hải sản tươi sống được nhập khẩu hàng ngày",
      image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3",
      items: ["Tôm hùm", "Cua hoàng đế", "Hàu", "Cá hồi"]
    },
    {
      title: "Tráng miệng",
      description: "Các loại bánh và đồ ngọt thượng hạng",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3",
      items: ["Bánh ngọt Pháp", "Kem Ý", "Trái cây tươi", "Chocolate"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3" 
              alt="Buffet luxury" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">Luxury Buffet Experience</h1>
            <p className="text-xl max-w-2xl text-center">
              Trải nghiệm ẩm thực đẳng cấp với hơn 100+ món ăn từ khắp nơi trên thế giới
            </p>
          </div>
        </motion.div>

        {/* Menu Categories */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Thực đơn đa dạng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="text-gray-500">
                    {category.items.map((item, i) => (
                      <li key={i} className="mb-1">• {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Đặc quyền của bạn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chất lượng 5 sao</h3>
                <p className="text-gray-600">Đạt tiêu chuẩn khắt khe về vệ sinh và an toàn thực phẩm</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Phục vụ 24/7</h3>
                <p className="text-gray-600">Sẵn sàng phục vụ bạn mọi lúc mọi nơi</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Giá cả hợp lý</h3>
                <p className="text-gray-600">Cam kết giá tốt nhất cho trải nghiệm cao cấp</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-600 to-red-600 py-16 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Đặt bàn ngay hôm nay</h2>
            <p className="text-xl mb-8">Trải nghiệm bữa tiệc buffet đẳng cấp cùng người thân và bạn bè</p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Đặt bàn ngay
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Service