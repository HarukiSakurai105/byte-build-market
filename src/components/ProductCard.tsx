
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  category, 
  price, 
  oldPrice, 
  rating, 
  image, 
  isNew = false,
  isFeatured = false
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md card-hover border border-gray-800">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="product-image hover:scale-110"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-tech-blue text-white">New</Badge>
        )}
        {oldPrice && (
          <Badge className="absolute top-2 right-2 bg-tech-red text-white">
            Sale
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
                <span className="font-bold text-xl mr-2">${price.toFixed(2)}</span>
                <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-xl">${price.toFixed(2)}</span>
            )}
          </div>
          
          <Button size="sm" className="bg-tech-blue hover:bg-tech-blue/90">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
