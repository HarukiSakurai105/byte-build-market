
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

// Mock data for demonstration purposes
const revenueData = [
  { name: 'T1', value: 45000000 },
  { name: 'T2', value: 52000000 },
  { name: 'T3', value: 48000000 },
  { name: 'T4', value: 61000000 },
  { name: 'T5', value: 55000000 },
  { name: 'T6', value: 67000000 },
  { name: 'T7', value: 72000000 },
  { name: 'T8', value: 59000000 },
  { name: 'T9', value: 74000000 },
  { name: 'T10', value: 78000000 },
  { name: 'T11', value: 82000000 },
  { name: 'T12', value: 91000000 },
];

const orderStatusData = [
  { name: 'Mới', value: 18 },
  { name: 'Đang xử lý', value: 25 },
  { name: 'Hoàn thành', value: 57 },
];

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const productCategoryData = [
  { name: 'Laptop', value: 35 },
  { name: 'PC Gaming', value: 45 },
  { name: 'Phụ kiện', value: 20 },
];

const lowStockItems = [
  { id: 1, name: 'Laptop Gaming Asus ROG', stock: 3, threshold: 5 },
  { id: 2, name: 'Chuột Logitech G502', stock: 2, threshold: 10 },
  { id: 3, name: 'Bàn phím cơ Keychron K2', stock: 4, threshold: 5 },
  { id: 4, name: 'Tai nghe SteelSeries Arctis 7', stock: 1, threshold: 5 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const AdminOverview = () => {
  const { theme } = useAdmin();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tổng quan hệ thống</h1>
        <Tabs defaultValue="day">
          <TabsList>
            <TabsTrigger value="day">Ngày</TabsTrigger>
            <TabsTrigger value="month">Tháng</TabsTrigger>
            <TabsTrigger value="year">Năm</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <TrendingUp className="h-4 w-4 text-tech-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(784000000)}</div>
            <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-tech-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">246</div>
            <p className="text-xs text-muted-foreground">+12.5% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-tech-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">358</div>
            <p className="text-xs text-muted-foreground">+5 sản phẩm mới trong tháng</p>
          </CardContent>
        </Card>
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <Users className="h-4 w-4 text-tech-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">+85 khách hàng mới trong tháng</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
            <CardDescription>Tổng doanh thu trong 12 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#eee'} />
                  <XAxis dataKey="name" tick={{ fill: isDark ? '#ddd' : '#666' }} />
                  <YAxis 
                    tickFormatter={(value) => value / 1000000 + 'M'} 
                    tick={{ fill: isDark ? '#ddd' : '#666' }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: isDark ? '#555' : '#ddd' }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle>Phân bố trạng thái đơn hàng</CardTitle>
            <CardDescription>Tỷ lệ các trạng thái đơn hàng hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`col-span-1 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Sản phẩm sắp hết hàng
            </CardTitle>
            <CardDescription>Danh sách sản phẩm có tồn kho thấp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`rounded-md ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="p-4">
                <ul className="space-y-3">
                  {lowStockItems.map((item) => (
                    <li key={item.id} className={`flex items-center justify-between p-3 rounded-md ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className={`text-sm ${item.stock <= item.threshold / 2 ? 'text-red-500' : 'text-orange-500'}`}>
                          Còn lại: {item.stock} / Ngưỡng: {item.threshold}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.stock <= item.threshold / 2 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {item.stock <= item.threshold / 2 ? 'Khẩn cấp' : 'Cảnh báo'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`col-span-1 lg:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle>Phân bố sản phẩm theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ sản phẩm trong các danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData.slice(6)} // Last 6 months
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#eee'} />
                  <XAxis dataKey="name" tick={{ fill: isDark ? '#ddd' : '#666' }} />
                  <YAxis 
                    tickFormatter={(value) => value / 1000000 + 'M'} 
                    tick={{ fill: isDark ? '#ddd' : '#666' }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{ backgroundColor: isDark ? '#333' : '#fff', borderColor: isDark ? '#555' : '#ddd' }} 
                  />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
