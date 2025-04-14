
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Tag, Package, Database, LogOut, 
  ShoppingCart, Users, BarChart2, Settings, Star, Inbox, 
  Archive, AlertTriangle, Percent
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, theme } = useAdmin();
  const { language } = useLanguage();

  const getMenuItems = () => {
    if (language === 'en') {
      return [
        {
          name: 'Overview',
          path: '/admin/overview',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          name: 'Products',
          path: '/admin/products',
          icon: <Package className="h-5 w-5" />,
        },
        {
          name: 'Orders',
          path: '/admin/orders',
          icon: <ShoppingCart className="h-5 w-5" />,
        },
        {
          name: 'Customers',
          path: '/admin/customers',
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: 'Promotions',
          path: '/admin/promotions',
          icon: <Percent className="h-5 w-5" />,
        },
        {
          name: 'Inventory',
          path: '/admin/inventory',
          icon: <Archive className="h-5 w-5" />,
        },
        {
          name: 'Reviews',
          path: '/admin/reviews',
          icon: <Star className="h-5 w-5" />,
        },
        {
          name: 'Reports',
          path: '/admin/reports',
          icon: <BarChart2 className="h-5 w-5" />,
        },
        {
          name: 'Posts',
          path: '/admin/posts',
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: 'Discounts',
          path: '/admin/discounts',
          icon: <Tag className="h-5 w-5" />,
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: <Settings className="h-5 w-5" />,
        },
        {
          name: 'Database',
          path: '/database-settings',
          icon: <Database className="h-5 w-5" />,
        },
      ];
    } else {
      return [
        {
          name: 'Tổng quan',
          path: '/admin/overview',
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          name: 'Sản phẩm',
          path: '/admin/products',
          icon: <Package className="h-5 w-5" />,
        },
        {
          name: 'Đơn hàng',
          path: '/admin/orders',
          icon: <ShoppingCart className="h-5 w-5" />,
        },
        {
          name: 'Khách hàng',
          path: '/admin/customers',
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: 'Khuyến mãi',
          path: '/admin/promotions',
          icon: <Percent className="h-5 w-5" />,
        },
        {
          name: 'Kho hàng',
          path: '/admin/inventory',
          icon: <Archive className="h-5 w-5" />,
        },
        {
          name: 'Đánh giá',
          path: '/admin/reviews',
          icon: <Star className="h-5 w-5" />,
        },
        {
          name: 'Báo cáo',
          path: '/admin/reports',
          icon: <BarChart2 className="h-5 w-5" />,
        },
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
          name: 'Cài đặt',
          path: '/admin/settings',
          icon: <Settings className="h-5 w-5" />,
        },
        {
          name: 'Cơ sở dữ liệu',
          path: '/database-settings',
          icon: <Database className="h-5 w-5" />,
        },
      ];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`w-64 hidden md:flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {language === 'en' ? 'Admin Panel' : 'Quản Trị'}
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
                  : theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={logout}
          className={`flex items-center justify-center w-full px-4 py-2 rounded-md ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">{language === 'en' ? 'Log out' : 'Đăng xuất'}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
