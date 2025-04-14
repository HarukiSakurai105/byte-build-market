
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
import { Eye, MoreHorizontal, Edit, Trash2, Plus, Filter, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for demonstration
const productCategories = ['Laptop', 'PC Gaming', 'Phụ kiện', 'Màn hình', 'Bàn phím', 'Chuột', 'Tai nghe'];

const brands = ['Asus', 'Acer', 'Dell', 'HP', 'Lenovo', 'MSI', 'Apple', 'Logitech', 'Steelseries', 'Corsair', 'Razer'];

// Mock products data
const initialProducts = [
  {
    id: 1,
    name: 'Laptop Gaming Asus ROG Strix G15',
    category: 'Laptop',
    brand: 'Asus',
    price: 32990000,
    stock: 15,
    image: '/placeholder.svg',
    description: 'Laptop gaming hiệu năng cao với màn hình 144Hz',
  },
  {
    id: 2,
    name: 'PC Gaming Acer Predator Orion 3000',
    category: 'PC Gaming',
    brand: 'Acer',
    price: 45990000,
    stock: 8,
    image: '/placeholder.svg',
    description: 'PC Gaming mạnh mẽ với GPU RTX 3080',
  },
  {
    id: 3,
    name: 'Chuột Logitech G502 HERO',
    category: 'Chuột',
    brand: 'Logitech',
    price: 1790000,
    stock: 24,
    image: '/placeholder.svg',
    description: 'Chuột gaming với cảm biến HERO 25K',
  },
  {
    id: 4,
    name: 'Bàn phím cơ SteelSeries Apex Pro',
    category: 'Bàn phím',
    brand: 'Steelseries',
    price: 4590000,
    stock: 12,
    image: '/placeholder.svg',
    description: 'Bàn phím cơ có thể điều chỉnh độ nhạy phím',
  },
  {
    id: 5,
    name: 'Tai nghe Razer BlackShark V2 Pro',
    category: 'Tai nghe',
    brand: 'Razer',
    price: 3990000,
    stock: 9,
    image: '/placeholder.svg',
    description: 'Tai nghe gaming không dây với micro siêu khử ồn',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

const AdminProducts = () => {
  const { theme } = useAdmin();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    brand: '',
    price: 0,
    stock: 0,
    image: '/placeholder.svg',
    description: '',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    inStock: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesStock = !filters.inStock || product.stock > 0;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      inStock: false,
    });
    setSearchTerm('');
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.brand || newProduct.price <= 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin sản phẩm",
        variant: "destructive",
      });
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const productToAdd = {
      id: newId,
      ...newProduct
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: '',
      brand: '',
      price: 0,
      stock: 0,
      image: '/placeholder.svg',
      description: '',
    });
    
    setIsAddProductOpen(false);
    
    toast({
      title: "Thành công",
      description: `Đã thêm sản phẩm "${productToAdd.name}"`,
    });
  };

  // Handle editing a product
  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.map(p => 
      p.id === selectedProduct.id ? selectedProduct : p
    ));
    
    setIsEditProductOpen(false);
    setSelectedProduct(null);
    
    toast({
      title: "Thành công",
      description: `Đã cập nhật sản phẩm "${selectedProduct.name}"`,
    });
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setSelectedProduct({...product});
    setIsEditProductOpen(true);
  };

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Thành công",
      description: `Đã xóa sản phẩm "${selectedProduct.name}"`,
    });
    
    setSelectedProduct(null);
  };

  // Open delete dialog
  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle view product details
  const handleViewProduct = (product: Product) => {
    toast({
      title: product.name,
      description: "Đang mở chi tiết sản phẩm...",
    });
    // Future: Navigate to product detail view
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
          <div className="mb-6">
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                </div>
                <div className="flex gap-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" /> Bộ lọc {isFilterOpen ? '▲' : '▼'}
                    </Button>
                  </CollapsibleTrigger>
                  <Button variant="outline" onClick={clearFilters}>
                    Xóa lọc
                  </Button>
                </div>
              </div>

              <CollapsibleContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category-filter">Danh mục</Label>
                    <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                      <SelectTrigger id="category-filter" className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
                        <SelectValue placeholder="Tất cả danh mục" />
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
                  <div>
                    <Label htmlFor="brand-filter">Thương hiệu</Label>
                    <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
                      <SelectTrigger id="brand-filter" className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
                        <SelectValue placeholder="Tất cả thương hiệu" />
                      </SelectTrigger>
                      <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                        <SelectItem value="">Tất cả</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox 
                      id="stock-filter" 
                      checked={filters.inStock}
                      onCheckedChange={(checked) => 
                        setFilters({...filters, inStock: Boolean(checked)})}
                    />
                    <Label htmlFor="stock-filter">Chỉ hiện sản phẩm còn hàng</Label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
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
                {filteredProducts.length === 0 ? (
                  <TableRow className={isDark ? 'border-gray-700' : ''}>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Search className="h-10 w-10 text-gray-400" />
                        <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
                        <Button variant="outline" onClick={clearFilters}>
                          Xóa bộ lọc
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className={isDark ? 'border-gray-700 hover:bg-gray-700/50' : ''}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="aspect-square h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="truncate font-medium" title={product.name}>
                          {product.name}
                        </div>
                        <div className="truncate text-xs text-gray-500" title={product.description}>
                          {product.description}
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem 
                              className="flex items-center cursor-pointer"
                              onClick={() => handleViewProduct(product)}
                            >
                              <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center cursor-pointer"
                              onClick={() => openEditDialog(product)}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center cursor-pointer text-red-600 dark:text-red-400"
                              onClick={() => openDeleteDialog(product)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
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
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Danh mục
              </Label>
              <Select 
                value={newProduct.category} 
                onValueChange={(value) => setNewProduct({...newProduct, category: value})}
              >
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
              <Select
                value={newProduct.brand}
                onValueChange={(value) => setNewProduct({...newProduct, brand: value})}
              >
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
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
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
                value={newProduct.stock || ''}
                onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
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
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddProduct}>Thêm sản phẩm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className={`sm:max-w-[625px] ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin sản phẩm
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Tên sản phẩm
                </Label>
                <Input
                  id="edit-name"
                  placeholder="Nhập tên sản phẩm"
                  className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Danh mục
                </Label>
                <Select 
                  value={selectedProduct.category} 
                  onValueChange={(value) => setSelectedProduct({...selectedProduct, category: value})}
                >
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
                <Label htmlFor="edit-brand" className="text-right">
                  Thương hiệu
                </Label>
                <Select
                  value={selectedProduct.brand}
                  onValueChange={(value) => setSelectedProduct({...selectedProduct, brand: value})}
                >
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
                <Label htmlFor="edit-price" className="text-right">
                  Giá bán
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  placeholder="Nhập giá bán"
                  className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({...selectedProduct, price: Number(e.target.value)})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Số lượng
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  placeholder="Nhập số lượng tồn kho"
                  className={`col-span-3 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  value={selectedProduct.stock}
                  onChange={(e) => setSelectedProduct({...selectedProduct, stock: Number(e.target.value)})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Hình ảnh
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Input
                    id="edit-image"
                    type="file"
                    className={`flex-1 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Mô tả
                </Label>
                <Textarea
                  id="edit-description"
                  placeholder="Nhập mô tả sản phẩm"
                  className={`col-span-3 min-h-[100px] ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditProduct}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.name}"? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={isDark ? 'bg-gray-700 hover:bg-gray-600' : ''}>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteProduct}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
