
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              Home
            </Link>
            <Link to="/category/laptops" className="text-gray-300 hover:text-white transition-colors">
              Laptops
            </Link>
            <Link to="/category/gaming-pcs" className="text-gray-300 hover:text-white transition-colors">
              Gaming PCs
            </Link>
            <Link to="/category/components" className="text-gray-300 hover:text-white transition-colors">
              Components
            </Link>
            <Link to="/deals" className="text-gray-300 hover:text-white transition-colors">
              Deals
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-64 bg-gray-800 border-gray-700 text-gray-200 pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-gray-300" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-tech-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-gray-300" />
            </Button>
            <Button variant="ghost" size="icon" className="relative ml-2">
              <ShoppingCart className="h-5 w-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-tech-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-tech-black border-t border-gray-800 animate-accordion-down">
            <div className="relative mb-4 px-2">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-gray-800 border-gray-700 text-gray-200 pl-10"
              />
              <Search className="h-4 w-4 absolute left-5 top-3 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-3 px-2">
              <Link to="/" className="text-gray-300 hover:text-white py-2 transition-colors">
                Home
              </Link>
              <Link to="/category/laptops" className="text-gray-300 hover:text-white py-2 transition-colors">
                Laptops
              </Link>
              <Link to="/category/gaming-pcs" className="text-gray-300 hover:text-white py-2 transition-colors">
                Gaming PCs
              </Link>
              <Link to="/category/components" className="text-gray-300 hover:text-white py-2 transition-colors">
                Components
              </Link>
              <Link to="/deals" className="text-gray-300 hover:text-white py-2 transition-colors">
                Deals
              </Link>
              <Link to="/account" className="text-gray-300 hover:text-white py-2 transition-colors">
                My Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
