
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "vi";
export type Currency = "USD" | "VND";

// Exchange rate (1 USD = X VND)
const VND_EXCHANGE_RATE = 23000;

interface LanguageContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  translate: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    laptops: "Laptops",
    gamingPCs: "Gaming PCs",
    components: "Components",
    deals: "Deals",
    searchProducts: "Search products...",
    myAccount: "My Account",
    featuredProducts: "Featured Products",
    exploreAll: "Explore All",
    add: "Add",
    sale: "Sale",
    new: "New",
  },
  vi: {
    home: "Trang Chủ",
    laptops: "Máy Tính Xách Tay",
    gamingPCs: "PC Gaming",
    components: "Linh Kiện",
    deals: "Khuyến Mãi",
    searchProducts: "Tìm kiếm sản phẩm...",
    myAccount: "Tài Khoản",
    featuredProducts: "Sản Phẩm Nổi Bật",
    exploreAll: "Xem Tất Cả",
    add: "Thêm",
    sale: "Giảm giá",
    new: "Mới",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatPrice = (priceInUSD: number): string => {
    if (currency === "USD") {
      return `$${priceInUSD.toFixed(2)}`;
    } else {
      // Convert to VND
      const priceInVND = priceInUSD * VND_EXCHANGE_RATE;
      // Format with thousand separators
      return `₫${priceInVND.toLocaleString("vi-VN")}`;
    }
  };

  const translate = (key: string): string => {
    // @ts-ignore - We know that our translations object might not have all keys
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        formatPrice,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
