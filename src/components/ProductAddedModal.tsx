
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Option price map - this could be moved to a config file later
const OPTION_PRICES = {
  memory: {
    "8GB": 0,
    "16GB": 80,
    "32GB": 160,
    "64GB": 320
  },
  storage: {
    "256GB": 0,
    "512GB": 60,
    "1TB": 120,
    "2TB": 240
  }
};

interface ProductOptionValues {
  memory: string;
  storage: string;
}

interface ProductAddedModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    specs?: {
      processor?: string;
      memory?: string[];
      storage?: string[];
      graphics?: string;
      display?: string;
      [key: string]: string | string[] | undefined;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (selectedOptions?: Record<string, string>, optionPrices?: Record<string, number>, adjustedPrice?: number) => void;
}

const ProductAddedModal = ({ product, isOpen, onClose, onAddToCart }: ProductAddedModalProps) => {
  const { formatPrice, translate } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  
  const form = useForm<ProductOptionValues>({
    defaultValues: {
      memory: "",
      storage: "",
    }
  });

  // Set default values and calculate initial price when modal opens
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
      
      // Set default options when modal opens
      const defaultMemory = product.specs?.memory && product.specs.memory.length > 0 ? product.specs.memory[0] : "";
      const defaultStorage = product.specs?.storage && product.specs.storage.length > 0 ? product.specs.storage[0] : "";
      
      form.reset({
        memory: defaultMemory,
        storage: defaultStorage
      });
      
      // Calculate initial price
      calculateTotalPrice(defaultMemory, defaultStorage);
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, product.specs, product.price]);

  // Calculate total price based on selected options
  const calculateTotalPrice = (memory: string, storage: string) => {
    let price = product.price;
    
    // Add memory price adjustment
    if (memory && OPTION_PRICES.memory[memory as keyof typeof OPTION_PRICES.memory] !== undefined) {
      price += OPTION_PRICES.memory[memory as keyof typeof OPTION_PRICES.memory];
    }
    
    // Add storage price adjustment
    if (storage && OPTION_PRICES.storage[storage as keyof typeof OPTION_PRICES.storage] !== undefined) {
      price += OPTION_PRICES.storage[storage as keyof typeof OPTION_PRICES.storage];
    }
    
    setTotalPrice(price);
    return price;
  };

  // Watch for changes in form values and update price
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && (name === 'memory' || name === 'storage')) {
        calculateTotalPrice(value.memory || "", value.storage || "");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  if (!isOpen) return null;

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  const handleSubmit = (values: ProductOptionValues) => {
    const selectedOptions = {
      memory: values.memory,
      storage: values.storage
    };
    
    const optionPrices = {
      memory: OPTION_PRICES.memory[values.memory as keyof typeof OPTION_PRICES.memory] || 0,
      storage: OPTION_PRICES.storage[values.storage as keyof typeof OPTION_PRICES.storage] || 0
    };
    
    onAddToCart(selectedOptions, optionPrices, totalPrice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-16 overflow-y-auto">
      <div className="relative bg-background rounded-lg shadow-lg w-full max-w-md mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        {/* Product info header */}
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400">ttgshop.vn</p>
        </div>
        
        {/* Product image */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          
          {/* Image navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {[...Array(7)].map((_, i) => (
              <span 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-tech-blue' : 'bg-white/60'}`}
              />
            ))}
          </div>
        </div>
        
        {/* Product details */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-white">{product.name}</h2>
          <p className="text-gray-400 mb-4">{translate("inStock")}: <span className="text-yellow-400">{translate("available")}</span></p>
          
          {/* Price section */}
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-red-500 mr-3">
              {formatPrice(totalPrice)}
            </span>
            <span className="text-gray-400 line-through">
              {formatPrice(totalPrice * 1.17)}
            </span>
            <span className="ml-2 bg-red-500/20 text-red-500 px-2 py-1 text-xs rounded-md">
              -17%
            </span>
          </div>
          
          {/* Configuration form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mb-6">
              {/* Memory options */}
              {product.specs?.memory && product.specs.memory.length > 0 && (
                <FormField
                  control={form.control}
                  name="memory"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-medium text-white">RAM:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          {product.specs.memory.map((memOption) => {
                            const extraPrice = OPTION_PRICES.memory[memOption as keyof typeof OPTION_PRICES.memory];
                            return (
                              <div key={memOption} className="relative">
                                <FormLabel 
                                  htmlFor={`memory-${memOption}`}
                                  className={`w-full border cursor-pointer ${field.value === memOption ? 'border-tech-blue bg-white/5' : 'border-gray-600'} text-white rounded-md py-2 px-3 flex flex-col items-center`}
                                >
                                  <RadioGroupItem 
                                    value={memOption} 
                                    id={`memory-${memOption}`} 
                                    className="sr-only" 
                                  />
                                  <span>{memOption}</span>
                                  {extraPrice > 0 && (
                                    <span className="text-xs text-gray-400">+{formatPrice(extraPrice)}</span>
                                  )}
                                  {field.value === memOption && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 w-4 h-4 rounded-full flex items-center justify-center">
                                      <span className="text-xs text-black">✓</span>
                                    </span>
                                  )}
                                </FormLabel>
                              </div>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              {/* Storage options */}
              {product.specs?.storage && product.specs.storage.length > 0 && (
                <FormField
                  control={form.control}
                  name="storage"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-medium text-white">SSD:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          {product.specs.storage.map((storageOption) => {
                            const extraPrice = OPTION_PRICES.storage[storageOption as keyof typeof OPTION_PRICES.storage];
                            return (
                              <div key={storageOption} className="relative">
                                <FormLabel 
                                  htmlFor={`storage-${storageOption}`}
                                  className={`w-full border cursor-pointer ${field.value === storageOption ? 'border-tech-blue bg-white/5' : 'border-gray-600'} text-white rounded-md py-2 px-3 flex flex-col items-center`}
                                >
                                  <RadioGroupItem 
                                    value={storageOption} 
                                    id={`storage-${storageOption}`} 
                                    className="sr-only" 
                                  />
                                  <span>{storageOption}</span>
                                  {extraPrice > 0 && (
                                    <span className="text-xs text-gray-400">+{formatPrice(extraPrice)}</span>
                                  )}
                                  {field.value === storageOption && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 w-4 h-4 rounded-full flex items-center justify-center">
                                      <span className="text-xs text-black">✓</span>
                                    </span>
                                  )}
                                </FormLabel>
                              </div>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              {/* Quantity and add to cart */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center border border-gray-700 rounded">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-gray-400 hover:bg-gray-800"
                    type="button"
                  >
                    –
                  </button>
                  <span className="px-4 py-1 border-x border-gray-700 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-gray-400 hover:bg-gray-800"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  type="submit"
                >
                  {translate("addToCart").toUpperCase()}
                </Button>
              </div>
            </form>
          </Form>
          
          {/* Social media links */}
          <div className="flex space-x-2 mb-4">
            {['facebook', 'messenger', 'twitter', 'pinterest', 'link'].map((platform) => (
              <button 
                key={platform}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                aria-label={`Share on ${platform}`}
              >
                {platform === 'facebook' && <span className="text-lg">f</span>}
                {platform === 'messenger' && <span className="text-lg">m</span>}
                {platform === 'twitter' && <span className="text-lg">t</span>}
                {platform === 'pinterest' && <span className="text-lg">p</span>}
                {platform === 'link' && <span className="text-lg">l</span>}
              </button>
            ))}
          </div>
          
          <Button variant="link" className="text-gray-400 p-0 h-auto hover:text-tech-blue">
            <Link to={`/product/${product.id}`}>
              {translate("viewProductDetails")} »
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddedModal;
