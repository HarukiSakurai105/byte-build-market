
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProductById, products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SearchBar = () => {
  const { translate, formatPrice } = useLanguage();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length > 1) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.category.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
      setOpen(true);
    } else {
      setSearchResults([]);
      setOpen(false);
    }
  }, [inputValue]);

  const handleSelect = (productId: number) => {
    const product = getProductById(productId);
    if (product) {
      navigate(`/product/${productId}`);
      setInputValue("");
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelect(searchResults[0].id);
    }
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md">
      <Popover open={open && searchResults.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
            <Input
              ref={inputRef}
              placeholder={translate("searchProducts")}
              className="pl-10 pr-10 bg-gray-900 border-gray-700 focus:border-tech-blue focus-visible:ring-tech-blue"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {inputValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto" align="start">
          <Command>
            <CommandInput
              placeholder={translate("searchProducts")}
              value={inputValue}
              onValueChange={setInputValue}
              className="border-none focus:ring-0"
            />
            <CommandEmpty>{translate("noResults")}</CommandEmpty>
            <CommandGroup>
              {searchResults.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSelect(item.id)}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded overflow-hidden bg-gray-700 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 truncate">{item.category}</p>
                  </div>
                  <div className="text-sm font-medium text-right">
                    {formatPrice(item.price)}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
