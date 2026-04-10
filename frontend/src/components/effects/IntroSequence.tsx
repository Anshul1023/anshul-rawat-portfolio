import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "My name is Anshul Rawat.",
  "I build interfaces that should feel premium before a recruiter reads a single bullet.",
  "I engineer backend systems that stay calm when products get real.",
  "I care about motion, architecture, performance, and product atmosphere.",
  "So before the projects, let me tell you the story."
];

export function IntroSequence() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const totalDuration = useMemo(() => lines.length * 2400 + 1500, []);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= lines.length - 1) {
          window.clearInterval(lineTimer);
          return current;
        }

        return current + 1;
      });
    }, 2400);

    const finishTimer = window.setTimeout(() => {
      setComplete(true);
    }, totalDuration);

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(finishTimer);
    };
  }, [totalDuration]);

  return (
    <AnimatePresence>
      {!complete ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-[#010101]"
        >
          <div className="w-full max-w-5xl px-6 text-center">
            <AnimatePresence mode="wait">
            <motion.div
                key={index}
              initial={{ opacity: 0, y: 36, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -36, filter: "blur(16px)" }}
              transition={{ duration: 1.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl leading-[1.02] text-[#f5f5f0] sm:text-5xl lg:text-7xl"
            >
              {lines[index]}
            </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (index + 1) / lines.length }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-10 h-[2px] w-56 origin-left bg-[#a3e635]"
            />
            <p className="mt-5 text-[11px] uppercase tracking-[0.45em] text-zinc-500">
              story mode / slow reveal
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
