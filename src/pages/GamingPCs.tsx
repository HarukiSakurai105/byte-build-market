
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { getGamingPCs } from "@/data/products";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const GamingPCs = () => {
  const [products, setProducts] = useState(getGamingPCs());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState("featured");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
    
    const sorted = [...filteredProducts];
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

  useEffect(() => {
    // Apply initial sort
    handleSortChange(sortOption);
  }, [products]);

  const getSortLabel = (option: string) => {
    switch (option) {
      case "featured": return "Featured";
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      case "rating": return "Customer Rating";
      default: return "Sort by";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-6 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gaming PCs</h1>
            <p className="text-gray-400">
              High-performance custom gaming computers built for ultimate gaming experience
            </p>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <ProductFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}  // Add this line
            />
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">
                  Showing {filteredProducts.length} products
                </p>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-between min-w-40 border-gray-700"
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  >
                    <span>{getSortLabel(sortOption)}</span>
                    {isSortDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                  
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full z-10 bg-card rounded-md shadow-lg border border-gray-700 overflow-hidden">
                      <div className="py-1">
                        {["featured", "price-low", "price-high", "rating"].map((option) => (
                          <button
                            key={option}
                            className={`block px-4 py-2 text-sm w-full text-left hover:bg-tech-blue/10 ${
                              sortOption === option ? "bg-tech-blue/20 text-tech-blue" : ""
                            }`}
                            onClick={() => handleSortChange(option)}
                          >
                            {getSortLabel(option)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-400">Try adjusting your filters or browse our other categories</p>
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

export default GamingPCs;
