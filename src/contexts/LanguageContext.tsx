import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define translation interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Predefined translations
const translations: Translations = {
  en: {
    login: 'Login',
    signup: 'Sign Up',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
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
    shoppingCart: "Shopping Cart",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    remove: "Remove",
    subtotal: "Subtotal",
    checkout: "Checkout",
    noProductsFound: "No products found matching your criteria.",
    noDealsFound: "No deals found at the moment.",
  },
  vi: {
    login: 'Đăng nhập',
    signup: 'Đăng ký',
    emailPlaceholder: 'Nhập email của bạn',
    passwordPlaceholder: 'Nhập mật khẩu',
    noAccount: 'Chưa có tài khoản?',
    signUp: 'Đăng ký',
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
    shoppingCart: "Giỏ Hàng",
    emptyCart: "Giỏ hàng của bạn trống",
    continueShopping: "Tiếp Tục Mua Sắm",
    remove: "Xóa",
    subtotal: "Tổng Phụ",
    checkout: "Thanh Toán",
    noProductsFound: "Không tìm thấy sản phẩm phù hợp với tiêu chí của bạn.",
    noDealsFound: "Không có khuyến mãi nào vào lúc này.",
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
