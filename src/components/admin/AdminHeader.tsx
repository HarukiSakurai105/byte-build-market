
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Tag, Package, Database, LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link to="/admin" className="ml-2 md:ml-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/" className="text-sm text-gray-300 hover:text-white mr-4">
            Về trang chính
          </Link>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-1" /> Đăng xuất
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-700 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 rounded hover:bg-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;
