import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//sssssád
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-6 mb-8">
              <img
                src={userData.image || 'https://ui-avatars.com/api/?name=User&background=random'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Thông tin cá nhân</h2>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Username</label>
                    <p className="text-gray-800">{userData.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Số điện thoại</label>
                    <p className="text-gray-800">{userData.phone || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Địa chỉ</label>
                    <p className="text-gray-800">{userData.address || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Lịch sử đặt bàn</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">Chưa có lịch sử đặt bàn</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Cập nhật thông tin
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
