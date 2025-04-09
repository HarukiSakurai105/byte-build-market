
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe, DollarSign, CircleDollarSign } from "lucide-react";

type Language = "en" | "vi";
type Currency = "USD" | "VND";

const LanguageCurrencySelector = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // You could add additional logic here to change the language throughout the app
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    // You could add additional logic here to update prices throughout the app
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
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
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
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
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
