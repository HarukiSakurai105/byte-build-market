
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";

const Deals = () => {
  const { translate } = useLanguage();
  const [sortOrder, setSortOrder] = useState("featured");
  
  // Filter products to only show products on sale
  const dealsProducts = products.filter(product => 
    product.oldPrice !== null && product.oldPrice !== undefined
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">{translate("deals")}</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <ProductFilters 
                onFilterChange={() => {}} 
                onSortChange={(order) => setSortOrder(order)}
                className="text-white"
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              {dealsProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-white">No deals found at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dealsProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
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

export default Deals;
