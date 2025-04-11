
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Tag, Package, Database, LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAdmin();

  const menuItems = [
    {
      name: 'Bài viết',
      path: '/admin/posts',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: 'Giảm giá',
      path: '/admin/discounts',
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: 'Sản phẩm',
      path: '/admin/products',
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: 'Cơ sở dữ liệu',
      path: '/database-settings',
      icon: <Database className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 hidden md:flex flex-col bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <div className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          Admin Panel
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive(item.path)
                  ? 'bg-tech-blue text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
