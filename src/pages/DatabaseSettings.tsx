
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DatabaseConnection from '@/components/DatabaseConnection';
import { useLanguage } from '@/contexts/LanguageContext';

const DatabaseSettings = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-tech-black text-white">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {translate('serverSettings')}
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <DatabaseConnection />
            
            <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-200">
                SQL Server {translate('connectionFailed')}
              </h2>
              <p className="text-gray-400 mb-4">
                Để kết nối với SQL Server, bạn cần:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
                <li>Đảm bảo SQL Server đang chạy và có thể truy cập được từ máy chủ này</li>
                <li>Xác minh thông tin đăng nhập và quyền truy cập vào cơ sở dữ liệu</li>
                <li>Kiểm tra tường lửa hoặc các cài đặt mạng có thể chặn kết nối</li>
                <li>Cấu hình kết nối SQL Server để chấp nhận kết nối từ xa</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DatabaseSettings;
