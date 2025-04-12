import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Slider as SliderComponent 
} from "@/components/ui/slider";
import { X, SlidersHorizontal } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (order: string) => void;
  className?: string;
}

const ProductFilters = ({ onFilterChange, className = "" }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([500, 4000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [processors, setProcessors] = useState<string[]>([]);
  const [graphics, setGraphics] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    applyFilters({ price: values });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...brands, brand]
      : brands.filter(b => b !== brand);
    
    setBrands(newBrands);
    applyFilters({ brands: newBrands });
  };

  const handleProcessorChange = (processor: string, checked: boolean) => {
    const newProcessors = checked 
      ? [...processors, processor]
      : processors.filter(p => p !== processor);
    
    setProcessors(newProcessors);
    applyFilters({ processors: newProcessors });
  };

  const handleGraphicsChange = (gpu: string, checked: boolean) => {
    const newGraphics = checked 
      ? [...graphics, gpu]
      : graphics.filter(g => g !== gpu);
    
    setGraphics(newGraphics);
    applyFilters({ graphics: newGraphics });
  };

  const applyFilters = (filter: any) => {
    onFilterChange({
      price: filter.price || priceRange,
      brands: filter.brands || brands,
      processors: filter.processors || processors,
      graphics: filter.graphics || graphics
    });
  };

  const resetFilters = () => {
    setPriceRange([500, 4000]);
    setBrands([]);
    setProcessors([]);
    setGraphics([]);
    onFilterChange({
      price: [500, 4000],
      brands: [],
      processors: [],
      graphics: []
    });
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const FilterContent = () => (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-medium ${className}`}>Price Range</h3>
          <span className={`text-sm ${className}`}>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <SliderComponent 
          defaultValue={[500, 4000]}
          min={500}
          max={4000}
          step={100}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="my-4"
        />
      </div>

      <Accordion type="multiple" defaultValue={["brands", "processors", "graphics"]} className="w-full">
        <AccordionItem value="brands">
          <AccordionTrigger className={`py-3 ${className}`}>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["ByteBuild", "TechForce", "NovaTech", "CyberPower", "MSI"].map((brand) => (
                <div className="flex items-center space-x-2" key={brand}>
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={brands.includes(brand)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <Label htmlFor={`brand-${brand}`} className={className}>{brand}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="processors">
          <AccordionTrigger className={`py-3 ${className}`}>Processors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Intel Core i9", "Intel Core i7", "Intel Core i5", "AMD Ryzen 9", "AMD Ryzen 7"].map((processor) => (
                <div className="flex items-center space-x-2" key={processor}>
                  <Checkbox 
                    id={`processor-${processor}`} 
                    checked={processors.includes(processor)}
                    onCheckedChange={(checked) => 
                      handleProcessorChange(processor, checked as boolean)
                    }
                  />
                  <Label htmlFor={`processor-${processor}`} className={className}>{processor}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="graphics">
          <AccordionTrigger className={`py-3 ${className}`}>Graphics Card</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["NVIDIA RTX 4090", "NVIDIA RTX 4080", "NVIDIA RTX 4070", "NVIDIA RTX 4060", "AMD RX 7900 XT"].map((gpu) => (
                <div className="flex items-center space-x-2" key={gpu}>
                  <Checkbox 
                    id={`gpu-${gpu}`} 
                    checked={graphics.includes(gpu)}
                    onCheckedChange={(checked) => 
                      handleGraphicsChange(gpu, checked as boolean)
                    }
                  />
                  <Label htmlFor={`gpu-${gpu}`} className={className}>{gpu}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button 
          variant="outline" 
          className="w-full border-gray-700 hover:bg-gray-800"
          onClick={resetFilters}
        >
          <span className={className}>Reset Filters</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 bg-card rounded-lg p-5 border border-gray-800 h-fit sticky top-24">
        <h2 className={`text-xl font-bold mb-6 ${className}`}>Filters</h2>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button 
          className="rounded-full h-14 w-14 bg-tech-blue shadow-lg"
          size="icon"
          onClick={toggleMobileFilters}
        >
          <SlidersHorizontal className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden overflow-auto">
          <div className="bg-card h-full w-full max-w-md ml-auto p-6 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${className}`}>Filters</h2>
              <Button variant="ghost" size="icon" onClick={toggleMobileFilters}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <FilterContent />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-gray-800">
              <Button 
                className="w-full bg-tech-blue"
                onClick={toggleMobileFilters}
              >
                <span className={className}>Apply Filters</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
