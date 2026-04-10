import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDownRight, Github, Linkedin } from "lucide-react";
import { AnimatePresence, motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { heroRoles, heroStats } from "../../data/portfolio";
import { RibbonBackdrop } from "../effects/RibbonBackdrop";

const HeroScene = lazy(() => import("./HeroScene"));

type FloatingPanelProps = {
  className: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  scrollProgress: MotionValue<number>;
  direction: "left" | "right";
};

function FloatingPanel({
  className,
  image,
  alt,
  eyebrow,
  title,
  scrollProgress,
  direction
}: FloatingPanelProps) {
  const x = useTransform(scrollProgress, [0, 0.35, 0.95], [direction === "left" ? -120 : 120, 0, direction === "left" ? -180 : 180]);
  const y = useTransform(scrollProgress, [0, 0.35, 0.95], [60, 0, -90]);
  const opacity = useTransform(scrollProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const rotateZ = useTransform(scrollProgress, [0, 0.35, 0.95], [direction === "left" ? -7 : 7, 0, direction === "left" ? -10 : 10]);

  return (
    <motion.div
      style={{ x, y, opacity, rotateZ }}
      className={`hidden xl:block ${className}`}
    >
      <div style={{ perspective: "1600px" }} className="w-full">
        <motion.div
          whileHover={{ rotateY: direction === "left" ? 9 : -9, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/72 shadow-glass backdrop-blur-2xl"
        >
          <div className="relative overflow-hidden">
            <img src={image} alt={alt} className="h-[24rem] w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.02),rgba(2,2,2,0.22)_52%,rgba(2,2,2,0.84)_100%)]" />
          </div>
          <div className="p-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">{eyebrow}</p>
            <p className="mt-3 font-display text-2xl leading-tight text-white">{title}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.72, 1], [0, -90, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.97, 0.9]);
  const bottomStripY = useTransform(scrollYProgress, [0, 0.55, 1], [45, 0, -80]);
  const bottomStripOpacity = useTransform(scrollYProgress, [0, 0.14, 0.84, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden border-b border-white/[0.05] bg-[#020202] px-4 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-[#020202]" />}>
          <HeroScene />
        </Suspense>
      </div>
      <RibbonBackdrop />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.28),rgba(2,2,2,0.42)_36%,rgba(2,2,2,0.78)_72%,rgba(2,2,2,0.96)_100%)]" />
      <div className="pointer-events-none absolute left-[-22rem] top-[8rem] h-[42rem] w-[42rem] rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute right-[-24rem] top-[18rem] h-[46rem] w-[46rem] rounded-full border border-white/[0.04]" />

      <FloatingPanel
        className="absolute left-[3.5%] top-[22%] w-[21rem]"
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=jpg&q=80&w=1200"
        alt="Developer workstation"
        eyebrow="Frontend atmosphere"
        title="Interfaces that feel considered from the first frame."
        scrollProgress={scrollYProgress}
        direction="left"
      />
      <FloatingPanel
        className="absolute right-[4%] top-[18%] w-[23rem]"
        image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&fm=jpg&q=80&w=1200"
        alt="Backend systems"
        eyebrow="Backend depth"
        title="APIs, async flows, and scalable system decisions underneath."
        scrollProgress={scrollYProgress}
        direction="right"
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-[86vh] max-w-[92rem] flex-col justify-center"
      >
        <div className="mx-auto flex w-full max-w-[72rem] flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="inline-flex rounded-full border border-lime-300/18 bg-lime-300/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.42em] text-lime-100/90"
          >
            Full stack developer / premium web storytelling
          </motion.span>

          <motion.div
            style={{ scale: headlineScale }}
            initial={{ opacity: 0, y: 58 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="mt-8"
          >
            <p className="font-display text-[clamp(4.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.05em] text-white">
              Anshul Rawat
            </p>
            <p className="mt-2 font-display text-[clamp(2rem,5vw,4.4rem)] leading-[0.92] tracking-[-0.04em] text-zinc-200">
              builds premium React experiences
              <br />
              with backend systems that scale.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            className="mt-7 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg"
          >
            Full Stack Developer focused on dark product aesthetics, performant interfaces, and production-grade Python and Node backends.
          </motion.p>

          <div className="mt-6 min-h-[1.8rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={heroRoles[roleIndex]}
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(12px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] uppercase tracking-[0.5em] text-lime-100/95 sm:text-xs"
              >
                {heroRoles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.56 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              data-cursor="Work"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:translate-y-[-2px]"
            >
              View Projects
              <ArrowDownRight size={16} />
            </button>
            <button
              type="button"
              data-cursor="Contact"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition hover:border-lime-300/28 hover:bg-white/[0.08]"
            >
              Contact Me
            </button>
            <a
              href="/Anshul-Rawat-Resume.pdf"
              download
              data-cursor="Resume"
              className="inline-flex items-center gap-2 rounded-full border border-lime-300/18 bg-lime-300/[0.07] px-6 py-3 text-sm font-semibold text-lime-100 transition hover:bg-lime-300/[0.12]"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="mt-12 flex items-center gap-4 text-zinc-400"
          >
            <a
              href="https://github.com/Anshul1023"
              target="_blank"
              rel="noreferrer"
              data-cursor="GitHub"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08] hover:text-white"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/anshul-rawat-235019290/"
              target="_blank"
              rel="noreferrer"
              data-cursor="LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08] hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ y: bottomStripY, opacity: bottomStripOpacity }}
          className="mt-10 grid gap-4 border-t border-white/[0.06] pt-6 md:grid-cols-3"
        >
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.8 + index * 0.1 }}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-xl"
            >
              <p className="text-[11px] uppercase tracking-[0.42em] text-zinc-500">Signal</p>
              <p className="mt-3 font-display text-3xl text-white">{stat.value}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
