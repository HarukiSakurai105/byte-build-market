
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminCustomers = () => {
  const { theme } = useAdmin();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
      <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-1">Tính năng đang được phát triển</h3>
            <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Chức năng quản lý khách hàng sẽ sớm được hoàn thiện.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
