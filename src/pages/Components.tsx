
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";

const Components = () => {
  const { translate } = useLanguage();
  const [sortOrder, setSortOrder] = useState("featured");
  
  // Filter products to only show components
  const componentProducts = products.filter(product => 
    product.category === "component" || product.category === "components"
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{translate("components")}</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <ProductFilters 
                onFilterChange={() => {}} 
                onSortChange={(order) => setSortOrder(order)}
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              {componentProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">No components found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {componentProducts.map((product) => (
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

export default Components;
