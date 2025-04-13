
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import ProductAddedModal from "./ProductAddedModal";

export interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  salePrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  specs?: {
    processor?: string;
    memory?: string[];
    storage?: string[];
    graphics?: string;
    display?: string;
    [key: string]: string | string[] | undefined;
  };
}

const ProductCard = ({ 
  id, 
  name, 
  category, 
  price, 
  oldPrice, 
  salePrice,
  rating, 
  image, 
  isNew = false,
  isFeatured = false,
  specs
}: ProductCardProps) => {
  const { formatPrice, translate } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddItemAndCloseModal = (
    selectedOptions?: Record<string, string>, 
    optionPrices?: Record<string, number>,
    adjustedPrice?: number
  ) => {
    addItem({
      id,
      name,
      price: adjustedPrice || salePrice || price,
      basePrice: salePrice || price,
      image,
      selectedOptions,
      optionPrices
    });
    
    toast({
      title: translate("addedToCart"),
      description: name,
    });
    
    setIsModalOpen(false);
  };
  
  // Use salePrice or price
  const displayPrice = salePrice || price;
  
  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden shadow-md card-hover border border-gray-800">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="product-image hover:scale-110"
          />
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-tech-blue text-white">
              {translate("new")}
            </Badge>
          )}
          {(oldPrice || salePrice) && (
            <Badge className="absolute top-2 right-2 bg-tech-red text-white">
              {translate("sale")}
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <Link to={`/product/${id}`}>
            <h3 className="font-bold text-lg mb-1 hover:text-tech-blue transition-colors">{name}</h3>
          </Link>
          <p className="text-gray-400 text-sm mb-2">{category}</p>
          
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-400"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-400">({rating.toFixed(1)})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              {oldPrice ? (
                <div className="flex items-center">
                  <span className="font-bold text-xl mr-2">{formatPrice(displayPrice)}</span>
                  <span className="text-gray-400 line-through text-sm">{formatPrice(oldPrice)}</span>
                </div>
              ) : (
                <span className="font-bold text-xl">{formatPrice(displayPrice)}</span>
              )}
            </div>
            
            <Button size="sm" className="bg-tech-blue hover:bg-tech-blue/90" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              {translate("add")}
            </Button>
          </div>
        </div>
      </div>

      <ProductAddedModal 
        product={{ 
          id, 
          name, 
          price: displayPrice, 
          image,
          specs 
        }}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddToCart={handleAddItemAndCloseModal}
      />
    </>
  );
};

export default ProductCard;
