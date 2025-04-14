
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

// Note: We're importing from components/admin, not pages/admin
import AdminProducts from "./components/admin/AdminProducts";
import AdminOrders from "./components/admin/AdminOrders";
import AdminCustomers from "./components/admin/AdminCustomers";
import AdminPromotions from "./components/admin/AdminPromotions";
import AdminInventory from "./components/admin/AdminInventory";
import AdminReviews from "./components/admin/AdminReviews";
import AdminReports from "./components/admin/AdminReports";
import AdminStaff from "./components/admin/AdminStaff";
import AdminSettings from "./components/admin/AdminSettings";
import AdminProfile from "./components/admin/AdminProfile";

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
