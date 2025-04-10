
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GamingPCs from "./pages/GamingPCs";
import ProductDetail from "./pages/ProductDetail";
import { LanguageProvider } from "./contexts/LanguageContext";
import Laptops from "./pages/Laptops";
import Components from "./pages/Components";
import Deals from "./pages/Deals";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/gaming-pcs" element={<GamingPCs />} />
              <Route path="/category/laptops" element={<Laptops />} />
              <Route path="/category/components" element={<Components />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
