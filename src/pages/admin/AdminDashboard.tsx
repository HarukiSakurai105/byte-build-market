
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminPosts from '@/components/admin/AdminPosts';
import AdminDiscounts from '@/components/admin/AdminDiscounts';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLogin from '@/components/admin/AdminLogin';
import { getConnectionConfig, testConnection } from '@/services/databaseService';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAdmin, isDbConnected, setDbConnected } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to login page if not an admin
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    // Check database connection
    const checkDbConnection = async () => {
      const config = getConnectionConfig();
      if (config) {
        try {
          const connected = await testConnection(config);
          setDbConnected(connected);
          
          if (!connected) {
            toast({
              title: "Cảnh báo",
              description: "Không thể kết nối đến cơ sở dữ liệu SQL Server. Vui lòng kiểm tra cấu hình kết nối.",
              variant: "destructive",
            });
          }
        } catch (error) {
          setDbConnected(false);
          toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra khi kết nối đến cơ sở dữ liệu.",
            variant: "destructive",
          });
        }
      }
    };
    
    if (isAdmin) {
      checkDbConnection();
    }
  }, [isAdmin, setDbConnected, toast]);

  if (!isAdmin) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {!isDbConnected && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.873-1.505 3.173-1.505 4.046 0l5.996 10.326c.854 1.477-.224 3.179-2.022 3.179H4.511c-1.798 0-2.876-1.702-2.022-3.179L8.485 2.495zm.93 9.505h2.1v-2h-2.1v2zm0-4h2.1V4h-2.1v4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Chưa kết nối đến cơ sở dữ liệu SQL Server. Các thay đổi sẽ được lưu tạm thời.{' '}
                    <a href="/database-settings" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                      Thiết lập kết nối
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<Navigate to="/admin/posts" replace />} />
            <Route path="/posts" element={<AdminPosts />} />
            <Route path="/discounts" element={<AdminDiscounts />} />
            <Route path="*" element={<Navigate to="/admin/posts" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
