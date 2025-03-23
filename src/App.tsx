
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

// Pages
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientView from "./pages/PatientView";
import NotFound from "./pages/NotFound";
import AgendarCita from "./pages/AgendarCita";
import ProximasCitas from "./pages/ProximasCitas";
import HistorialClinico from "./pages/HistorialClinico";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/patient" element={<PatientView />} />
                <Route path="/agendar-cita" element={<AgendarCita />} />
                <Route path="/proximas-citas" element={<ProximasCitas />} />
                <Route path="/historial-clinico" element={<HistorialClinico />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
