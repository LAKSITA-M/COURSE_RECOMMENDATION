import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Details from "./pages/Details";
import UserTypeSelection from "./pages/UserTypeSelection";
import SchoolFlow from "./pages/SchoolFlow";
import CollegeFlow from "./pages/CollegeFlow";
import OfficeFlow from "./pages/OfficeFlow";
import Recommendations from "./pages/Recommendations";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/details" element={<Details />} />
            <Route path="/user-type" element={<UserTypeSelection />} />
            <Route path="/school" element={<SchoolFlow />} />
            <Route path="/college" element={<CollegeFlow />} />
            <Route path="/office" element={<OfficeFlow />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
