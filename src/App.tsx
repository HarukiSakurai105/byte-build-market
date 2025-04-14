
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminProvider } from "./contexts/AdminContext";
import { Toaster } from "@/components/ui/toaster";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import GamingPCs from "./pages/GamingPCs";
import Laptops from "./pages/Laptops";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Components from "./pages/Components";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DatabaseSettings from "./pages/DatabaseSettings";
import Checkout from "./pages/Checkout";

// Import all admin pages
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminReports from "./pages/admin/AdminReports";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";

const App = () => {
  return (
    <LanguageProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/gaming-pcs" element={<GamingPCs />} />
            <Route path="/category/laptops" element={<Laptops />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/components" element={<Components />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/database-settings" element={<DatabaseSettings />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AdminProvider>
    </LanguageProvider>
  );
};

export default App;
