
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";

const Laptops = () => {
  const { translate } = useLanguage();
  const [sortOrder, setSortOrder] = useState("featured");
  
  // Filter products to only show laptops
  const laptopProducts = products.filter(product => 
    product.category === "laptop" || product.category === "laptops"
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{translate("laptops")}</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <ProductFilters 
                onFilterChange={() => {}} 
                onSortChange={(order) => setSortOrder(order)}
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              {laptopProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">No laptops found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {laptopProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Laptops;
