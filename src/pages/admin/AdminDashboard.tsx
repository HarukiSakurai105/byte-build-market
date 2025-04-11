
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminPosts from '@/components/admin/AdminPosts';
import AdminDiscounts from '@/components/admin/AdminDiscounts';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLogin from '@/components/admin/AdminLogin';

const AdminDashboard = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not an admin
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

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
