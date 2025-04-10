
import { ShoppingCart, X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const { translate, formatPrice } = useLanguage();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={toggleDropdown}
      >
        <ShoppingCart className="h-5 w-5 text-gray-300" />
        {totalItems() > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-tech-red text-white px-1.5 min-w-5 h-5 flex items-center justify-center">
            {totalItems()}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card shadow-xl rounded-lg border border-gray-800 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{translate("shoppingCart")}</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleDropdown}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-96 overflow-auto">
            {items.length === 0 ? (
              <div className="py-8 px-4 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-400">{translate("emptyCart")}</p>
                <Button variant="link" className="mt-2 text-tech-blue" onClick={toggleDropdown}>
                  <Link to="/products">{translate("continueShopping")}</Link>
                </Button>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-800 flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            {translate("remove")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between mb-4">
                <span>{translate("subtotal")}</span>
                <span className="font-semibold">{formatPrice(totalPrice())}</span>
              </div>
              <Button className="w-full bg-tech-blue hover:bg-tech-blue/90">
                <Link to="/checkout" className="w-full" onClick={toggleDropdown}>
                  {translate("checkout")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
