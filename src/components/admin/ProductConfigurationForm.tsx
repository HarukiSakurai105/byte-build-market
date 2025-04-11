
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ProductConfiguration {
  name: string;
  price: number;
  category: string;
  description: string;
  specs: {
    processor?: string;
    memory?: string;
    storage?: string;
    graphics?: string;
    display?: string;
    [key: string]: string | undefined;
  };
  images: string[];
  discount?: {
    percentage: number;
    code?: string;
  };
}

interface ProductConfigurationFormProps {
  initialConfig?: ProductConfiguration;
  onSave: (config: ProductConfiguration) => void;
  onCancel: () => void;
}

const defaultConfig: ProductConfiguration = {
  name: '',
  price: 0,
  category: 'Gaming PC',
  description: '',
  specs: {
    processor: '',
    memory: '',
    storage: '',
    graphics: '',
  },
  images: [],
};

const ProductConfigurationForm: React.FC<ProductConfigurationFormProps> = ({
  initialConfig = defaultConfig,
  onSave,
  onCancel,
}) => {
  const [config, setConfig] = useState<ProductConfiguration>(initialConfig);
  const [customSpec, setCustomSpec] = useState({ key: '', value: '' });
  const { toast } = useToast();

  const handleChange = (field: keyof ProductConfiguration, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const handleSpecChange = (key: string, value: string) => {
    setConfig({
      ...config,
      specs: { ...config.specs, [key]: value },
    });
  };

  const addCustomSpec = () => {
    if (!customSpec.key.trim() || !customSpec.value.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập cả tên và giá trị thông số",
        variant: "destructive",
      });
      return;
    }

    setConfig({
      ...config,
      specs: { ...config.specs, [customSpec.key]: customSpec.value },
    });
    setCustomSpec({ key: '', value: '' });
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...config.specs };
    delete newSpecs[key];
    setConfig({ ...config, specs: newSpecs });
  };

  const addDiscount = () => {
    setConfig({
      ...config,
      discount: config.discount || { percentage: 0 },
    });
  };

  const removeDiscount = () => {
    const { discount, ...rest } = config;
    setConfig(rest);
  };

  const handleDiscountChange = (field: keyof (typeof config.discount & {}), value: any) => {
    if (!config.discount) return;
    
    setConfig({
      ...config,
      discount: { ...config.discount, [field]: value },
    });
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, we would upload the file to a server and get a URL back
      // Here we'll just use a simulated URL
      const newImageURL = URL.createObjectURL(e.target.files[0]);
      setConfig({
        ...config,
        images: [...config.images, newImageURL],
      });
      
      toast({
        title: "Thành công",
        description: "Đã thêm hình ảnh",
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...config.images];
    newImages.splice(index, 1);
    setConfig({ ...config, images: newImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.name || config.price <= 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tên sản phẩm và giá",
        variant: "destructive",
      });
      return;
    }
    onSave(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input
              id="name"
              value={config.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <Label htmlFor="price">Giá (VND)</Label>
            <Input
              id="price"
              type="number"
              value={config.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              placeholder="Nhập giá sản phẩm"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="category">Danh mục</Label>
            <Select 
              value={config.category} 
              onValueChange={(value) => handleChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gaming PC">Gaming PC</SelectItem>
                <SelectItem value="Workstation">Workstation</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Gaming Laptop">Gaming Laptop</SelectItem>
                <SelectItem value="Creator PC">Creator PC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Thông số kỹ thuật</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="processor">CPU</Label>
                <Input
                  id="processor"
                  value={config.specs.processor || ''}
                  onChange={(e) => handleSpecChange('processor', e.target.value)}
                  placeholder="Ví dụ: Intel Core i9-13900K"
                />
              </div>
              <div>
                <Label htmlFor="memory">RAM</Label>
                <Input
                  id="memory"
                  value={config.specs.memory || ''}
                  onChange={(e) => handleSpecChange('memory', e.target.value)}
                  placeholder="Ví dụ: 32GB DDR5 5200MHz"
                />
              </div>
              <div>
                <Label htmlFor="storage">Ổ cứng</Label>
                <Input
                  id="storage"
                  value={config.specs.storage || ''}
                  onChange={(e) => handleSpecChange('storage', e.target.value)}
                  placeholder="Ví dụ: 2TB NVMe SSD"
                />
              </div>
              <div>
                <Label htmlFor="graphics">Card đồ họa</Label>
                <Input
                  id="graphics"
                  value={config.specs.graphics || ''}
                  onChange={(e) => handleSpecChange('graphics', e.target.value)}
                  placeholder="Ví dụ: NVIDIA RTX 4080"
                />
              </div>

              {/* Custom specs added by user */}
              {Object.entries(config.specs)
                .filter(([key]) => !['processor', 'memory', 'storage', 'graphics'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Input
                      value={key}
                      disabled
                      className="w-1/3"
                    />
                    <Input
                      value={value}
                      onChange={(e) => handleSpecChange(key, e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600"
                      onClick={() => removeSpec(key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

              {/* Add custom spec form */}
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={customSpec.key}
                  onChange={(e) => setCustomSpec({ ...customSpec, key: e.target.value })}
                  placeholder="Tên thông số"
                  className="w-1/3"
                />
                <Input
                  value={customSpec.value}
                  onChange={(e) => setCustomSpec({ ...customSpec, value: e.target.value })}
                  placeholder="Giá trị"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={addCustomSpec}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discount section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Giảm giá</h3>
          {!config.discount ? (
            <Button type="button" variant="outline" size="sm" onClick={addDiscount}>
              <Plus className="h-4 w-4 mr-2" /> Thêm giảm giá
            </Button>
          ) : (
            <Button type="button" variant="ghost" size="sm" className="text-red-600" onClick={removeDiscount}>
              <X className="h-4 w-4 mr-2" /> Xóa giảm giá
            </Button>
          )}
        </div>

        {config.discount && (
          <Card>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount-percentage">Phần trăm giảm giá (%)</Label>
                <Input
                  id="discount-percentage"
                  type="number"
                  value={config.discount.percentage}
                  onChange={(e) => handleDiscountChange('percentage', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="discount-code">Mã giảm giá (tuỳ chọn)</Label>
                <Input
                  id="discount-code"
                  value={config.discount.code || ''}
                  onChange={(e) => handleDiscountChange('code', e.target.value.toUpperCase())}
                  placeholder="Ví dụ: SUMMER23"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Images section */}
      <div className="space-y-4">
        <h3 className="font-medium">Hình ảnh sản phẩm</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.images.map((image, index) => (
            <div key={index} className="relative aspect-video bg-gray-100 rounded overflow-hidden">
              <img src={image} alt={`Sản phẩm ${index + 1}`} className="w-full h-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-red-600/90"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          <label className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Thêm ảnh</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleAddImage} />
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Huỷ
        </Button>
        <Button type="submit">
          Lưu cấu hình
        </Button>
      </div>
    </form>
  );
};

export default ProductConfigurationForm;
