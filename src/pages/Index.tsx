
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import SpecialOffer from "@/components/SpecialOffer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DollarSign, Globe, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import CartDropdown from "@/components/CartDropdown";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import LanguageCurrencySelector from "@/components/LanguageCurrencySelector";

const Index = () => {
  const { language, currency, setLanguage, setCurrency } = useLanguage();
  const { totalItems } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Quick access language, currency and cart controls - Mobile friendly */}
        <div className="container mx-auto px-4 py-4 flex justify-end items-center gap-2 md:hidden">
          <LanguageCurrencySelector />
          <CartDropdown />
        </div>
        
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <SpecialOffer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
