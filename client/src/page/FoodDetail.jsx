import React from "react";
import { useParams } from "react-router-dom";
import foods from "../data/foods";
import Header from "../components/common/Header";

const FoodDetail = () => {
  const { slug } = useParams();
  const food = foods.find((item) => item.slug === slug);

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Không tìm thấy món ăn!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f0fa] via-[#f8fafc] to-[#e0e7ff] relative overflow-hidden">
      {/* Hiệu ứng background sáng tạo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#a7e0ff] via-[#e0e7ff] to-[#f8fafc] rounded-full opacity-40 blur-2xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#a7e0ff] rounded-full opacity-30 blur-2xl z-0"></div>
      <Header />
      <main className="py-23 relative z-10">
        <div className="max-w-6xl mx-auto px-2">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center">
              <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                <img
                  src={food.image}
                  alt={food.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  itemProp="image"
                />
              </div>
              <div className="flex gap-2 mt-6">
                <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-semibold text-lg shadow hover:from-red-600 hover:to-red-800 transition-colors">Mua ngay</button>
                <button className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold text-lg shadow hover:bg-gray-300 transition-colors">Thêm vào giỏ</button>
              </div>
            </div>
            <div className="flex flex-col justify-center" itemScope itemType="http://schema.org/Product">
              <h1 className="text-4xl md:text-4xl font-bold mb-4 text-gray-900" itemProp="name">{food.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-red-600 text-3xl font-bold mr-4" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="VND" />
                  <span itemProp="price">₫{food.price.toLocaleString()}</span>
                </span>
                <span className="flex items-center text-yellow-500 text-xl">
                  <svg width="22" height="22" fill="currentColor" className="mr-1"><path d="M9 1.5l2.47 5.01 5.53.8-4 3.89.94 5.5L9 13.77l-4.94 2.59.94-5.5-4-3.89 5.53-.8z"/></svg>
                  {food.rating}
                </span>
              </div>
              <div className="mb-6 text-lg text-gray-700" itemProp="description">
                Địa điểm: <span className="font-semibold">{food.location}</span>
              </div>
              <ul className="mb-8 text-gray-600 text-base list-disc pl-5">
                <li>Nguyên liệu tươi ngon, chế biến công phu</li>
                <li>Phù hợp cho bữa tiệc, họp mặt gia đình, bạn bè</li>
                <li>Không gian sang trọng, phục vụ chuyên nghiệp</li>
              </ul>
              <div className="flex gap-3 items-center">
                <span className="text-gray-500">Chia sẻ:</span>
                <a href="#" className="hover:text-blue-600" aria-label="Chia sẻ Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-sky-400" aria-label="Chia sẻ Messenger"><i className="fab fa-facebook-messenger"></i></a>
                <a href="#" className="hover:text-pink-500" aria-label="Chia sẻ Pinterest"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FoodDetail;
