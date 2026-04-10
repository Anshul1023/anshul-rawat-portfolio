import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.18
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-lime-300 via-white to-zinc-400"
    />
  );
}
