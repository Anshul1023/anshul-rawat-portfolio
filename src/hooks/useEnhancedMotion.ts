import { useEffect, useState } from "react";

const supportsEnhancedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasEnoughMemory =
    "deviceMemory" in navigator ? (navigator as Navigator & { deviceMemory: number }).deviceMemory > 4 : true;
  const hasEnoughCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency > 4 : true;

  return hasFinePointer && !prefersReducedMotion && hasEnoughMemory && hasEnoughCores && window.innerWidth >= 1100;
};

export const useEnhancedMotion = () => {
  const [enabled, setEnabled] = useState(supportsEnhancedMotion);

  useEffect(() => {
    const update = () => {
      setEnabled(supportsEnhancedMotion());
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return enabled;
};
