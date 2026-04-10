import { motion } from "framer-motion";

import { architectureFlow } from "../../data/portfolio";
import { FadeUpBlock } from "../effects/FadeUpBlock";
import { SplitReveal } from "../effects/SplitReveal";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative border-t border-white/[0.05] bg-[#020202] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[92rem]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.98),rgba(2,2,2,0.94))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.04),transparent_62%)]" />
        <div className="relative">
        <FadeUpBlock>
          <p className="text-[11px] uppercase tracking-[0.48em] text-zinc-500">Systems Thinking</p>
        </FadeUpBlock>

        <SplitReveal
          as="h2"
          text="The backend story underneath the visuals is performance, clarity, and scale."
          className="mt-5 max-w-6xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-[5rem]"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {architectureFlow.map((item, index) => (
            <FadeUpBlock key={item.title} delay={index * 90}>
              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                data-cursor="Flow"
                className="rounded-[1.9rem] border border-white/10 bg-black/55 p-6 shadow-glass backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.34em] text-zinc-500">
                  0{index + 1}
                </p>
                <h3 className="mt-5 font-display text-3xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">{item.description}</p>
              </motion.div>
            </FadeUpBlock>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
