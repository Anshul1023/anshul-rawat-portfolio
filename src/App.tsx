import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnhancedMotion } from "@/hooks/useEnhancedMotion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

const TargetCursor = lazy(() => import("@/components/cursor/TargetCursor"));

const App = () => {
  const enhancedMotion = useEnhancedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <div className="story-root relative">
        {enhancedMotion ? (
          <Suspense fallback={null}>
            <TargetCursor
              spinDuration={2}
              hideDefaultCursor={true}
              parallaxOn={true}
            />
          </Suspense>
        ) : null}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  );
};

export default App;
