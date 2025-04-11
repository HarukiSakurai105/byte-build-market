import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for language and currency
export type Language = "en" | "vi";
export type Currency = "USD" | "VND";

// Define exchange rate
const VND_EXCHANGE_RATE = 24000; // USD to VND conversion rate

// Define context type
export interface LanguageContextType {
  language: Language;
  currency: Currency;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  translate: (key: string) => string;
}

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
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    authConfigRequired: "Authentication setup required",
    email: "Email",
    password: "Password",
    name: "Name",
    namePlaceholder: "Enter your name",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your password",
    error: "Error",
    success: "Success",
    pleaseEnterEmailAndPassword: "Please enter both email and password",
    pleaseEnterAllFields: "Please fill in all fields",
    passwordsDoNotMatch: "Passwords do not match",
    loginSuccessful: "Login successful!",
    signupSuccessful: "Sign up successful!",
    connecting: "Connecting to server...",
    connectionSuccess: "Connected to database successfully",
    connectionFailed: "Failed to connect to database",
    serverSettings: "Server Settings",
    serverAddress: "Server Address",
    databaseName: "Database Name",
    username: "Username",
    connectToServer: "Connect to Server",
    databaseConnection: "Database Connection",
    disconnect: "Disconnect",
    serverAddressPlaceholder: "Enter server address",
    databaseNamePlaceholder: "Enter database name",
    usernamePlaceholder: "Enter username",
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
    dontHaveAccount: "Chưa có tài khoản?",
    alreadyHaveAccount: "Đã có tài khoản?",
    authConfigRequired: "Yêu cầu thiết lập xác thực",
    email: "Email",
    password: "Mật khẩu",
    name: "Tên",
    namePlaceholder: "Nhập tên của bạn",
    confirmPassword: "Xác nhận mật khẩu",
    confirmPasswordPlaceholder: "Xác nhận mật khẩu của bạn",
    error: "Lỗi",
    success: "Thành công",
    pleaseEnterEmailAndPassword: "Vui lòng nhập email và mật khẩu",
    pleaseEnterAllFields: "Vui lòng điền vào tất cả các trường",
    passwordsDoNotMatch: "Mật khẩu không khớp",
    loginSuccessful: "Đăng nhập thành công!",
    signupSuccessful: "Đăng ký thành công!",
    connecting: "Đang kết nối đến máy chủ...",
    connectionSuccess: "Kết nối đến cơ sở dữ liệu thành công",
    connectionFailed: "Kết nối đến cơ sở dữ liệu thất bại",
    serverSettings: "Cài đặt máy chủ",
    serverAddress: "Địa chỉ máy chủ",
    databaseName: "Tên cơ sở dữ liệu",
    username: "Tên đăng nhập",
    connectToServer: "Kết nối đến máy chủ",
    databaseConnection: "Kết nối cơ sở dữ liệu",
    disconnect: "Ngắt kết nối",
    serverAddressPlaceholder: "Nhập địa chỉ máy chủ",
    databaseNamePlaceholder: "Nhập tên cơ sở dữ liệu",
    usernamePlaceholder: "Nhập tên đăng nhập",
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
