import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import { useLanguage } from "@/contexts/LanguageContext";
import CartDropdown from "./CartDropdown";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();
  const navigate = useNavigate(); // Add useNavigate hook
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <header className="bg-tech-black sticky top-0 z-50 w-full border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
              ByteBuild
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              {translate("home")}
            </Link>
            <Link to="/category/laptops" className="text-gray-300 hover:text-white transition-colors">
              {translate("laptops")}
            </Link>
            <Link to="/category/gaming-pcs" className="text-gray-300 hover:text-white transition-colors">
              {translate("gamingPCs")}
            </Link>
            <Link to="/category/components" className="text-gray-300 hover:text-white transition-colors">
              {translate("components")}
            </Link>
            <Link to="/deals" className="text-gray-300 hover:text-white transition-colors">
              {translate("deals")}
            </Link>
          </nav>

          {/* Search, Language/Currency and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder={translate("searchProducts")}
                className="w-64 bg-gray-800 border-gray-700 text-gray-200 pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <LanguageCurrencySelector />
            <Button variant="ghost" size="icon" onClick={handleLoginClick}>
              <User className="h-5 w-5 text-gray-300" />
            </Button>
            <CartDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <LanguageCurrencySelector />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-gray-300" />
            </Button>
            <CartDropdown />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-tech-black border-t border-gray-800 animate-accordion-down">
            <div className="relative mb-4 px-2">
              <Input 
                type="text" 
                placeholder={translate("searchProducts")}
                className="w-full bg-gray-800 border-gray-700 text-gray-200 pl-10"
              />
              <Search className="h-4 w-4 absolute left-5 top-3 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-3 px-2">
              <Link to="/" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("home")}
              </Link>
              <Link to="/category/laptops" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("laptops")}
              </Link>
              <Link to="/category/gaming-pcs" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("gamingPCs")}
              </Link>
              <Link to="/category/components" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("components")}
              </Link>
              <Link to="/deals" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("deals")}
              </Link>
              <Link to="/account" className="text-gray-300 hover:text-white py-2 transition-colors">
                {translate("myAccount")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
