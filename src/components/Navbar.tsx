
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import { useLanguage } from "@/contexts/LanguageContext";
import CartDropdown from "./CartDropdown";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [clerkAvailable, setClerkAvailable] = useState(false);
  
  useEffect(() => {
    // Check if Clerk is properly configured
    const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    setClerkAvailable(key && key.startsWith('pk_') && key !== 'pk_test_placeholder');
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
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
            
            {/* Authentication UI - conditionally rendered based on Clerk availability */}
            {clerkAvailable ? (
              <>
                <SignedIn>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-9 h-9",
                        userButtonTrigger: "focus:shadow-none"
                      }
                    }}
                  />
                </SignedIn>
                <SignedOut>
                  <Button variant="ghost" size="icon" onClick={handleLoginClick}>
                    <User className="h-5 w-5 text-gray-300" />
                  </Button>
                </SignedOut>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={handleLoginClick}>
                <User className="h-5 w-5 text-gray-300" />
              </Button>
            )}
            
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
              
              {/* Authentication for mobile - conditionally rendered based on Clerk availability */}
              {clerkAvailable ? (
                <>
                  <SignedIn>
                    <div className="flex items-center gap-2 py-2">
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8",
                            userButtonTrigger: "focus:shadow-none"
                          }
                        }}
                      />
                      <span className="text-gray-300">{translate("myAccount")}</span>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <Link to="/login" className="text-gray-300 hover:text-white py-2 transition-colors">
                      {translate("login")}
                    </Link>
                  </SignedOut>
                </>
              ) : (
                <Link to="/login" className="text-gray-300 hover:text-white py-2 transition-colors">
                  {translate("login")}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
