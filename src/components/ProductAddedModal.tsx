
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductAddedModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductAddedModal = ({ product, isOpen, onClose }: ProductAddedModalProps) => {
  const { formatPrice, translate } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
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
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-400 line-through">
              {formatPrice(product.price * 1.17)}
            </span>
            <span className="ml-2 bg-red-500/20 text-red-500 px-2 py-1 text-xs rounded-md">
              -17%
            </span>
          </div>
          
          {/* Configuration options */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-medium mb-2 text-white">RAM:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <button className="w-full border border-tech-blue bg-white/5 text-white rounded-md py-2 px-3 flex items-center">
                    RAM 16GB
                    <span className="absolute -top-2 -right-2 bg-yellow-400 w-4 h-4 rounded-full flex items-center justify-center">
                      <span className="text-xs text-black">✓</span>
                    </span>
                  </button>
                </div>
                <button className="w-full border border-gray-600 text-white rounded-md py-2 px-3">
                  RAM 32GB
                </button>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2 text-white">SSD:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <button className="w-full border border-tech-blue bg-white/5 text-white rounded-md py-2 px-3 flex items-center">
                    SSD 256GB
                    <span className="absolute -top-2 -right-2 bg-yellow-400 w-4 h-4 rounded-full flex items-center justify-center">
                      <span className="text-xs text-black">✓</span>
                    </span>
                  </button>
                </div>
                <button className="w-full border border-gray-600 text-white rounded-md py-2 px-3">
                  SSD 500GB
                </button>
              </div>
            </div>
          </div>
          
          {/* Quantity and add to cart */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center border border-gray-700 rounded">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-1 text-gray-400 hover:bg-gray-800"
              >
                –
              </button>
              <span className="px-4 py-1 border-x border-gray-700 min-w-[40px] text-center">
                {quantity}
              </span>
              <button 
                onClick={incrementQuantity}
                className="px-3 py-1 text-gray-400 hover:bg-gray-800"
              >
                +
              </button>
            </div>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              {translate("addToCart").toUpperCase()}
            </Button>
          </div>
          
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
            {translate("viewProductDetails")} »
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddedModal;
