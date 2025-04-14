
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Tag, Package, Database, UserCircle, Settings, LogOut, Moon, Sun, Users, ShoppingCart, BarChart2, Star, Inbox, Archive, AlertTriangle } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, adminProfile, theme, setTheme } = useAdmin();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="icon"
            className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link to="/admin" className="ml-2 md:ml-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={toggleTheme} 
            variant="ghost" 
            size="icon" 
            className={theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Link to="/" className={`text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mr-2 hidden md:block`}>
            Về trang chính
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={adminProfile.avatar} alt={adminProfile.name} />
                  <AvatarFallback>{adminProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`} align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{adminProfile.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{adminProfile.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/admin/profile" className="flex items-center w-full">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/admin/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt hệ thống</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className={`md:hidden p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/overview"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                <span>Tổng quan</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                <span>Đơn hàng</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Khách hàng</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/discounts"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Tag className="h-5 w-5 mr-3" />
                <span>Giảm giá</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/inventory"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Archive className="h-5 w-5 mr-3" />
                <span>Kho hàng</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reviews"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Star className="h-5 w-5 mr-3" />
                <span>Đánh giá</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/posts"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Bài viết</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                <span>Báo cáo</span>
              </Link>
            </li>
            <li>
              <Link
                to="/database-settings"
                className={`flex items-center p-2 rounded hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Database className="h-5 w-5 mr-3" />
                <span>Cơ sở dữ liệu</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;
