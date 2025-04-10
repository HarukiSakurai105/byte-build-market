
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductFilters from "@/components/ProductFilters";
import { getGamingPCs } from "@/data/products";
import { ProductCardProps } from "@/components/ProductCard";
import ProductHeader from "@/components/product/ProductHeader";
import ProductGrid from "@/components/product/ProductGrid";
import SortDropdown, { SortOption } from "@/components/product/SortDropdown";
import ProductsCount from "@/components/product/ProductsCount";

const GamingPCs = () => {
  const [products, setProducts] = useState(getGamingPCs());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const handleFilterChange = (filters: any) => {
    let filtered = [...products];
    
    // Apply price filter
    if (filters.price) {
      filtered = filtered.filter(product => 
        product.price >= filters.price[0] && product.price <= filters.price[1]
      );
    }
    
    // Apply other filters if implemented
    
    setFilteredProducts(filtered);
    applySorting(filtered, sortOption);
  };

  const applySorting = (productsToSort: ProductCardProps[], option: SortOption) => {
    const sorted = [...productsToSort];
    
    switch (option) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - no specific sorting
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    applySorting(filteredProducts, option);
  };

  useEffect(() => {
    // Apply initial sort
    applySorting(products, sortOption);
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-6 pb-12">
        <div className="container mx-auto px-4">
          <ProductHeader 
            title="Gaming PCs" 
            description="High-performance custom gaming computers built for ultimate gaming experience" 
          />
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <ProductFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <ProductsCount count={filteredProducts.length} />
                <SortDropdown 
                  onSortChange={handleSortChange}
                  currentSort={sortOption}
                />
              </div>
              
              {/* Products */}
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamingPCs;
