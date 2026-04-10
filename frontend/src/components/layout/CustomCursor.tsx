import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("cursor-active");

    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, label");
      const cursorLabelTarget = target?.closest<HTMLElement>("[data-cursor]");
      setHovering(Boolean(interactive));
      setLabel(cursorLabelTarget?.dataset.cursor ?? "");
    };

    window.addEventListener("pointermove", move);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("pointermove", move);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          scale: hovering ? 1.7 : 1
        }}
        transition={{ type: "spring", damping: 24, stiffness: 320, mass: 0.22 }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-9 w-9 rounded-full border border-lime-300/45 bg-lime-300/8 mix-blend-screen backdrop-blur md:block"
      />
      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: hovering ? 0.6 : 1
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden h-2 w-2 rounded-full bg-white md:block"
      />
      <motion.div
        animate={{
          x: position.x + 18,
          y: position.y - 12,
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.92
        }}
        transition={{ type: "spring", damping: 24, stiffness: 320 }}
        className="pointer-events-none fixed left-0 top-0 z-[82] hidden rounded-full border border-white/10 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-lime-100 md:block"
      >
        {label}
      </motion.div>
    </>
  );
}
