import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Luxury Buffet</h2>
          <p className="text-gray-400">Trải nghiệm ẩm thực đẳng cấp, phục vụ tận tâm.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <h3 className="font-semibold mb-1">Liên hệ</h3>
            <p className="text-gray-400 text-sm">Hotline: 0356241423</p>
            <p className="text-gray-400 text-sm">Email: hophuchieu135@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Địa chỉ</h3>
            <p className="text-gray-400 text-sm">Phường Hòa An, Quận Cẩm Lệ, TP. Đà Nẵn</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Luxury Buffet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
