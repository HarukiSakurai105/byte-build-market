
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortOption = "featured" | "price-low" | "price-high" | "rating";

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
  className?: string;
}

const SortDropdown = ({ onSortChange, currentSort, className = "" }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "featured": return "Featured";
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      case "rating": return "Customer Rating";
      default: return "Sort by";
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center justify-between min-w-40 border-gray-700"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={className}>{getSortLabel(currentSort)}</span>
        {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-full z-10 bg-card rounded-md shadow-lg border border-gray-700 overflow-hidden">
          <div className="py-1">
            {(["featured", "price-low", "price-high", "rating"] as SortOption[]).map((option) => (
              <button
                key={option}
                className={`block px-4 py-2 text-sm w-full text-left hover:bg-tech-blue/10 ${
                  currentSort === option ? "bg-tech-blue/20 text-tech-blue" : className
                }`}
                onClick={() => {
                  onSortChange(option);
                  setIsDropdownOpen(false);
                }}
              >
                {getSortLabel(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
