import { motion } from "framer-motion";

const orbs = [
  { className: "left-[-12%] top-[-15%] h-[34rem] w-[34rem] bg-lime-300/5", duration: 18 },
  { className: "right-[-10%] top-[22%] h-[32rem] w-[32rem] bg-white/3", duration: 22 },
  { className: "left-[20%] bottom-[-22%] h-[30rem] w-[30rem] bg-zinc-400/4", duration: 20 }
];

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#010101]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.018),transparent_22%),linear-gradient(180deg,#010101_0%,#020202_38%,#010101_100%)]" />
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          animate={{
            x: [0, 40, -25, 0],
            y: [0, -35, 30, 0],
            scale: [1, 1.08, 0.95, 1]
          }}
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className={`absolute rounded-full blur-[110px] ${orb.className}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:140px_140px] opacity-[0.08]" />
      <div className="absolute left-[-20rem] top-[8rem] h-[38rem] w-[38rem] rounded-full border border-white/[0.04]" />
      <div className="absolute right-[-26rem] top-[20rem] h-[42rem] w-[42rem] rounded-full border border-white/[0.04]" />
      <div className="absolute left-[18%] top-[-14rem] h-[28rem] w-[28rem] rounded-full border border-lime-300/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,1,1,0.14)_45%,rgba(1,1,1,0.94)_100%)]" />
    </div>
  );
}
