
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, MoreHorizontal, Edit, Trash2, Plus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Mock data for demonstration
const productCategories = ['Laptop', 'PC Gaming', 'Phụ kiện', 'Màn hình', 'Bàn phím', 'Chuột', 'Tai nghe'];

const brands = ['Asus', 'Acer', 'Dell', 'HP', 'Lenovo', 'MSI', 'Apple', 'Logitech', 'Steelseries', 'Corsair', 'Razer'];

const products = [
  {
    id: 1,
    name: 'Laptop Gaming Asus ROG Strix G15',
    category: 'Laptop',
    brand: 'Asus',
    price: 32990000,
    stock: 15,
    image: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'PC Gaming Acer Predator Orion 3000',
    category: 'PC Gaming',
    brand: 'Acer',
    price: 45990000,
    stock: 8,
    image: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Chuột Logitech G502 HERO',
    category: 'Chuột',
    brand: 'Logitech',
    price: 1790000,
    stock: 24,
    image: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'Bàn phím cơ SteelSeries Apex Pro',
    category: 'Bàn phím',
    brand: 'Steelseries',
    price: 4590000,
    stock: 12,
    image: '/placeholder.svg',
  },
  {
    id: 5,
    name: 'Tai nghe Razer BlackShark V2 Pro',
    category: 'Tai nghe',
    brand: 'Razer',
    price: 3990000,
    stock: 9,
    image: '/placeholder.svg',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const AdminProducts = () => {
  const { theme } = useAdmin();
  const isDark = theme === 'dark';
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term: string, category: string) => {
    let filtered = products;
    
    if (term) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.brand.toLowerCase().includes(term)
      );
    }
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearch}
                className={isDark ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Lọc
                  </Button>
                </DialogTrigger>
                <DialogContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                  <DialogHeader>
                    <DialogTitle>Lọc sản phẩm</DialogTitle>
                    <DialogDescription>
                      Chọn các điều kiện lọc sản phẩm
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Danh mục
                      </Label>
                      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                          <SelectItem value="">Tất cả</SelectItem>
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsFilterOpen(false)}>Áp dụng</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className={isDark ? 'border-gray-700 hover:bg-gray-700/50' : ''}>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead className="w-[80px]">Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Thương hiệu</TableHead>
                  <TableHead className="text-right">Giá bán</TableHead>
                  <TableHead className="text-center">Tồn kho</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className={isDark ? 'border-gray-700 hover:bg-gray-700/50' : ''}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" /> Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className={`sm:max-w-[625px] ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để thêm sản phẩm mới vào hệ thống
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên sản phẩm
              </Label>
              <Input
                id="name"
                placeholder="Nhập tên sản phẩm"
                className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Danh mục
              </Label>
              <Select>
                <SelectTrigger className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Thương hiệu
              </Label>
              <Select>
                <SelectTrigger className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}>
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Giá bán
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Nhập giá bán"
                className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Số lượng
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="Nhập số lượng tồn kho"
                className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Hình ảnh
              </Label>
              <Input
                id="image"
                type="file"
                className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Mô tả
              </Label>
              <Textarea
                id="description"
                placeholder="Nhập mô tả sản phẩm"
                className={`col-span-3 min-h-[100px] ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddProductOpen(false)}>Thêm sản phẩm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
