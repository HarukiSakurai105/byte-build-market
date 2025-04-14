
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, Download, Moon, Sun, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const settings = {
  general: {
    siteName: 'Tech Store',
    siteDescription: 'Cửa hàng máy tính và linh kiện điện tử hàng đầu',
    contactEmail: 'admin@techstore.com',
    contactPhone: '0123 456 789',
    address: 'Số 123 Đường ABC, Quận XYZ, TP.HCM',
  },
  payment: {
    paymentMethods: ['bank', 'credit', 'cash'],
    bankName: 'Ngân hàng Techcombank',
    bankAccount: '123456789',
    bankAccountName: 'CÔNG TY TNHH TECH STORE',
  },
  shipping: {
    freeShippingThreshold: 2000000,
    standardShippingFee: 30000,
    expressShippingFee: 60000,
  },
};

const AdminSettings = () => {
  const { theme, setTheme } = useAdmin();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState(settings.general);
  const [paymentSettings, setPaymentSettings] = useState(settings.payment);
  const [shippingSettings, setShippingSettings] = useState(settings.shipping);
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSettings({
      ...paymentSettings,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingSettings({
      ...shippingSettings,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };
  
  const handlePaymentMethodsChange = (value: string) => {
    let methods = [...paymentSettings.paymentMethods];
    
    if (methods.includes(value)) {
      methods = methods.filter(method => method !== value);
    } else {
      methods.push(value);
    }
    
    setPaymentSettings({
      ...paymentSettings,
      paymentMethods: methods,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would save to a database
    toast({
      title: "Cài đặt đã được lưu",
      description: "Các thay đổi cài đặt đã được lưu thành công.",
    });
  };
  
  const handleBackupData = () => {
    // In a real application, this would trigger a backup process
    toast({
      title: "Sao lưu dữ liệu",
      description: "Quá trình sao lưu dữ liệu đã được bắt đầu.",
    });
  };
  
  const handleRestoreData = () => {
    // In a real application, this would trigger a restore process
    toast({
      title: "Khôi phục dữ liệu",
      description: "Quá trình khôi phục dữ liệu đã được bắt đầu.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Thông tin chung</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>
                Quản lý thông tin cơ bản của cửa hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Tên cửa hàng</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Mô tả</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email liên hệ</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Số điện thoại</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                </div>
                
                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle>Cài đặt thanh toán</CardTitle>
              <CardDescription>
                Quản lý các phương thức thanh toán và cài đặt liên quan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Phương thức thanh toán</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="payment-bank" 
                          checked={paymentSettings.paymentMethods.includes('bank')}
                          onCheckedChange={() => handlePaymentMethodsChange('bank')}
                        />
                        <Label htmlFor="payment-bank">Chuyển khoản ngân hàng</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="payment-credit" 
                          checked={paymentSettings.paymentMethods.includes('credit')}
                          onCheckedChange={() => handlePaymentMethodsChange('credit')}
                        />
                        <Label htmlFor="payment-credit">Thẻ tín dụng</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="payment-cash" 
                          checked={paymentSettings.paymentMethods.includes('cash')}
                          onCheckedChange={() => handlePaymentMethodsChange('cash')}
                        />
                        <Label htmlFor="payment-cash">Tiền mặt khi nhận hàng</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Thông tin tài khoản ngân hàng</h3>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Tên ngân hàng</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={paymentSettings.bankName}
                        onChange={handlePaymentChange}
                        className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Số tài khoản</Label>
                      <Input
                        id="bankAccount"
                        name="bankAccount"
                        value={paymentSettings.bankAccount}
                        onChange={handlePaymentChange}
                        className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankAccountName">Tên chủ tài khoản</Label>
                      <Input
                        id="bankAccountName"
                        name="bankAccountName"
                        value={paymentSettings.bankAccountName}
                        onChange={handlePaymentChange}
                        className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                      />
                    </div>
                  </div>
                </div>
                
                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle>Cài đặt vận chuyển</CardTitle>
              <CardDescription>
                Quản lý phí vận chuyển và các cài đặt liên quan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Ngưỡng miễn phí vận chuyển (VNĐ)</Label>
                    <Input
                      id="freeShippingThreshold"
                      name="freeShippingThreshold"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={handleShippingChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                    <p className="text-sm text-muted-foreground">
                      Đơn hàng có giá trị lớn hơn số tiền này sẽ được miễn phí vận chuyển
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingFee">Phí vận chuyển tiêu chuẩn (VNĐ)</Label>
                    <Input
                      id="standardShippingFee"
                      name="standardShippingFee"
                      type="number"
                      value={shippingSettings.standardShippingFee}
                      onChange={handleShippingChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingFee">Phí vận chuyển nhanh (VNĐ)</Label>
                    <Input
                      id="expressShippingFee"
                      name="expressShippingFee"
                      type="number"
                      value={shippingSettings.expressShippingFee}
                      onChange={handleShippingChange}
                      className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    />
                  </div>
                </div>
                
                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
              <CardDescription>
                Quản lý các cài đặt chung cho hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Giao diện</Label>
                  <RadioGroup defaultValue={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light" className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" /> 
                        Sáng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark" className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" /> 
                        Tối
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Sao lưu và phục hồi</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleBackupData}
                      className={isDark ? 'border-gray-600' : ''}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Sao lưu dữ liệu
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleRestoreData}
                      className={isDark ? 'border-gray-600' : ''}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Phục hồi dữ liệu
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`text-red-500 ${isDark ? 'border-gray-600 hover:text-red-400' : 'hover:text-red-600'}`}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Khôi phục cài đặt gốc
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
