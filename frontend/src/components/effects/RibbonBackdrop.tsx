import { motion } from "framer-motion";

const ribbons = [
  {
    className:
      "left-[-18%] top-[10%] h-[22rem] w-[140%] -rotate-[14deg] bg-[linear-gradient(90deg,transparent,rgba(163,230,53,0.06),transparent)]",
    duration: 14
  },
  {
    className:
      "left-[-16%] top-[34%] h-[18rem] w-[140%] rotate-[10deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]",
    duration: 18
  },
  {
    className:
      "left-[-12%] bottom-[8%] h-[20rem] w-[132%] -rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(115,115,115,0.08),transparent)]",
    duration: 16
  }
];

export function RibbonBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ribbons.map((ribbon) => (
        <motion.div
          key={ribbon.className}
          animate={{ x: ["-4%", "4%", "-2%", "0%"] }}
          transition={{ duration: ribbon.duration, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-[999px] blur-3xl ${ribbon.className}`}
        />
      ))}
    </div>
  );
}
