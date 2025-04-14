
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLogin from '@/components/admin/AdminLogin';
import { getConnectionConfig, testConnection } from '@/services/databaseService';
import { useToast } from '@/hooks/use-toast';

// Import admin page components
import AdminOverview from '@/components/admin/AdminOverview';
import AdminPosts from '@/components/admin/AdminPosts';
import AdminDiscounts from '@/components/admin/AdminDiscounts';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminCustomers from '@/components/admin/AdminCustomers';
import AdminPromotions from '@/components/admin/AdminPromotions';
import AdminInventory from '@/components/admin/AdminInventory';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminReports from '@/components/admin/AdminReports';
import AdminStaff from '@/components/admin/AdminStaff';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminProfile from '@/components/admin/AdminProfile';

const AdminDashboard = () => {
  const { isAdmin, isDbConnected, setDbConnected, theme } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {!isDbConnected && (
            <div className={`${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-l-4 border-yellow-400 p-4 mb-6`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.873-1.505 3.173-1.505 4.046 0l5.996 10.326c.854 1.477-.224 3.179-2.022 3.179H4.511c-1.798 0-2.876-1.702-2.022-3.179L8.485 2.495zm.93 9.505h2.1v-2h-2.1v2zm0-4h2.1V4h-2.1v4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>
                    Chưa kết nối đến cơ sở dữ liệu SQL Server. Các thay đổi sẽ được lưu tạm thời.{' '}
                    <a href="/database-settings" className={`font-medium underline ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'} hover:text-yellow-600`}>
                      Thiết lập kết nối
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<Navigate to="/admin/overview" replace />} />
            <Route path="/overview" element={<AdminOverview />} />
            <Route path="/posts" element={<AdminPosts />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/discounts" element={<AdminDiscounts />} />
            <Route path="/promotions" element={<AdminPromotions />} />
            <Route path="/inventory" element={<AdminInventory />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/staff" element={<AdminStaff />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="*" element={<Navigate to="/admin/overview" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
