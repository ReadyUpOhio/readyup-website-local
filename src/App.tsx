import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
const Admin = lazy(() => import("./pages/Admin"));
import Sell from "./pages/Sell";
import Events from "./pages/Events";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
                    <Route path="/admin" element={<Suspense fallback={<div>Loading...</div>}><Admin /></Suspense>} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Services />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
