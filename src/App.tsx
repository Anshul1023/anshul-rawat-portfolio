import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

const TargetCursor = lazy(() => import("@/components/cursor/TargetCursor"));

const App = () => {
  const [showCursor, setShowCursor] = useState(false);

  const cursorEnabled = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!cursorEnabled) {
      return;
    }

    setShowCursor(true);
  }, [cursorEnabled]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <div className="story-root relative">
        {showCursor ? (
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
