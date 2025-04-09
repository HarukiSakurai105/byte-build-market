
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe, DollarSign } from "lucide-react";
import { useLanguage, Language, Currency } from "@/contexts/LanguageContext";

const LanguageCurrencySelector = () => {
  const { language, currency, setLanguage, setCurrency } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Globe className="h-5 w-5 text-gray-300" />
            <span className="absolute -bottom-1 -right-1 text-xs font-bold">
              {language.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 z-50">
          <DropdownMenuItem 
            className={`text-gray-200 hover:text-white ${language === "en" ? "bg-gray-700" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`text-gray-200 hover:text-white ${language === "vi" ? "bg-gray-700" : ""}`}
            onClick={() => handleLanguageChange("vi")}
          >
            Tiếng Việt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <DollarSign className="h-5 w-5 text-gray-300" />
            <span className="absolute -bottom-1 -right-1 text-xs font-bold">
              {currency}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 z-50">
          <DropdownMenuItem 
            className={`text-gray-200 hover:text-white ${currency === "USD" ? "bg-gray-700" : ""}`}
            onClick={() => handleCurrencyChange("USD")}
          >
            USD ($)
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`text-gray-200 hover:text-white ${currency === "VND" ? "bg-gray-700" : ""}`}
            onClick={() => handleCurrencyChange("VND")}
          >
            VND (₫)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageCurrencySelector;
