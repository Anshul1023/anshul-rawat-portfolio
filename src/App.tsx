import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Storytelling root wrapper (optional but recommended)
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ⭐ ADD TARGET CURSOR IMPORT
import TargetCursor from "@/components/cursor/TargetCursor";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Ensures ScrollTrigger refreshes after route changes
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <div className="story-root relative">

          {/* ⭐ ADD TARGET CURSOR — DOES NOT BREAK ANYTHING */}
          <TargetCursor 
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
          />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Add all custom routes above the catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
