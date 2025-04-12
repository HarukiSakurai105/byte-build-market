
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import SpecialOffer from "@/components/SpecialOffer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/hooks/useCart";
import LanguageCurrencySelector from "@/components/LanguageCurrencySelector";
import CartDropdown from "@/components/CartDropdown";

const Index = () => {
  const { language, currency } = useLanguage();
  const { totalItems } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col text-white">
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
