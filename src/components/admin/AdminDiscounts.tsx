import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface Discount {
  id: number;
  code: string;
  percentage: number;
  validUntil: string;
  isActive: boolean;
}

const AdminDiscounts = () => {
  const { toast } = useToast();
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: 1, code: 'SUMMER23', percentage: 10, validUntil: '2023-08-31', isActive: true },
    { id: 2, code: 'WELCOME15', percentage: 15, validUntil: '2023-12-31', isActive: true },
  ]);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    percentage: 0,
    validUntil: '',
    isActive: true,
  });

  const handleAddDiscount = () => {
    if (!newDiscount.code || !newDiscount.validUntil || newDiscount.percentage <= 0) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập đầy đủ thông tin mã giảm giá',
        variant: 'destructive',
      });
      return;
    }

    if (newDiscount.percentage > 100) {
      toast({
        title: 'Lỗi',
        description: 'Phần trăm giảm giá không thể lớn hơn 100%',
        variant: 'destructive',
      });
      return;
    }

    const newId = discounts.length > 0 ? Math.max(...discounts.map(discount => discount.id)) + 1 : 1;
    
    setDiscounts([...discounts, { id: newId, ...newDiscount }]);
    setNewDiscount({ code: '', percentage: 0, validUntil: '', isActive: true });
    setShowAddForm(false);
    
    toast({
      title: 'Thành công',
      description: 'Đã thêm mã giảm giá mới',
    });
  };

  const handleDeleteDiscount = (id: number) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
    toast({
      title: 'Thành công',
      description: 'Đã xoá mã giảm giá',
    });
  };

  const handleStartEdit = (discount: Discount) => {
    setEditingDiscount({ ...discount });
  };

  const handleSaveEdit = () => {
    if (!editingDiscount) return;

    if (editingDiscount.percentage > 100) {
      toast({
        title: 'Lỗi',
        description: 'Phần trăm giảm giá không thể lớn hơn 100%',
        variant: 'destructive',
      });
      return;
    }
    
    setDiscounts(discounts.map(discount => 
      discount.id === editingDiscount.id ? editingDiscount : discount
    ));
    setEditingDiscount(null);
    
    toast({
      title: 'Thành công',
      description: 'Đã cập nhật mã giảm giá',
    });
  };

  const handleCancelEdit = () => {
    setEditingDiscount(null);
  };

  const toggleDiscountActive = (id: number) => {
    setDiscounts(discounts.map(discount => 
      discount.id === id ? { ...discount, isActive: !discount.isActive } : discount
    ));
    
    toast({
      title: 'Thành công',
      description: 'Đã thay đổi trạng thái mã giảm giá',
    });
  };

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Quản lý mã giảm giá</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-tech-blue hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Thêm mã giảm giá
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-white border border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-black mb-1">
                  Mã giảm giá
                </label>
                <Input
                  id="code"
                  value={newDiscount.code}
                  onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })}
                  placeholder="Ví dụ: SUMMER23"
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <label htmlFor="percentage" className="block text-sm font-medium text-black mb-1">
                  Phần trăm giảm giá (%)
                </label>
                <Input
                  id="percentage"
                  type="number"
                  value={newDiscount.percentage.toString()}
                  onChange={(e) => setNewDiscount({ ...newDiscount, percentage: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <label htmlFor="validUntil" className="block text-sm font-medium text-black mb-1">
                  Có hiệu lực đến
                </label>
                <Input
                  id="validUntil"
                  type="date"
                  value={newDiscount.validUntil}
                  onChange={(e) => setNewDiscount({ ...newDiscount, validUntil: e.target.value })}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-tech-blue hover:bg-blue-700" onClick={handleAddDiscount}>
                  Thêm mã giảm giá
                </Button>
                <Button variant="outline" className="ml-2" onClick={() => setShowAddForm(false)}>
                  Huỷ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-black">ID</TableHead>
                <TableHead className="text-black">Mã giảm giá</TableHead>
                <TableHead className="text-black">Giảm giá (%)</TableHead>
                <TableHead className="text-black">Có hiệu lực đến</TableHead>
                <TableHead className="w-[100px] text-black">Trạng thái</TableHead>
                <TableHead className="w-[120px] text-right text-black">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-black">
                    Chưa có mã giảm giá nào
                  </TableCell>
                </TableRow>
              ) : (
                discounts.map((discount) => (
                  <TableRow key={discount.id} className="text-black">
                    <TableCell className="text-black">{discount.id}</TableCell>
                    <TableCell className="text-black">
                      {editingDiscount?.id === discount.id ? (
                        <Input
                          value={editingDiscount.code}
                          onChange={(e) => setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() })}
                          className="bg-white border-gray-300 text-black"
                        />
                      ) : (
                        <code className="bg-gray-100 px-2 py-1 rounded text-black">{discount.code}</code>
                      )}
                    </TableCell>
                    <TableCell className="text-black">
                      {editingDiscount?.id === discount.id ? (
                        <Input
                          type="number"
                          value={editingDiscount.percentage.toString()}
                          onChange={(e) => setEditingDiscount({ ...editingDiscount, percentage: parseInt(e.target.value) || 0 })}
                          min="0"
                          max="100"
                          className="bg-white border-gray-300 w-20 text-black"
                        />
                      ) : (
                        `${discount.percentage}%`
                      )}
                    </TableCell>
                    <TableCell className="text-black">
                      {editingDiscount?.id === discount.id ? (
                        <Input
                          type="date"
                          value={editingDiscount.validUntil}
                          onChange={(e) => setEditingDiscount({ ...editingDiscount, validUntil: e.target.value })}
                          className="bg-white border-gray-300 text-black"
                        />
                      ) : (
                        discount.validUntil
                      )}
                    </TableCell>
                    <TableCell className="text-black">
                      <Button
                        variant={discount.isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDiscountActive(discount.id)}
                        className={discount.isActive ? "bg-green-600 hover:bg-green-700" : "text-gray-500"}
                      >
                        {discount.isActive ? "Đang hoạt động" : "Đã tắt"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingDiscount?.id === discount.id ? (
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 text-gray-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSaveEdit}
                            className="h-8 w-8 text-green-600"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStartEdit(discount)}
                            className="h-8 w-8 text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDiscount(discount.id)}
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDiscounts;
