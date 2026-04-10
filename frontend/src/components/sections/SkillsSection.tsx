import { motion } from "framer-motion";

import { orbitSkills, skillGroups } from "../../data/portfolio";
import { FadeUpBlock } from "../effects/FadeUpBlock";
import { SplitReveal } from "../effects/SplitReveal";

export function SkillsSection() {
  return (
    <section id="skills" className="relative border-t border-white/[0.05] bg-[#020202] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[92rem]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.98),rgba(2,2,2,0.92))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.05),transparent_60%)]" />
        <div className="relative">
        <FadeUpBlock>
          <p className="text-[11px] uppercase tracking-[0.48em] text-zinc-500">Stack Language</p>
        </FadeUpBlock>

        <SplitReveal
          as="h2"
          text="The stack should read like capability, not just a list of logos."
          className="mt-5 max-w-6xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-[5.2rem]"
        />

        <FadeUpBlock className="mt-6 max-w-3xl" delay={120}>
          <p className="text-lg leading-9 text-zinc-300">
            Frontend, backend, databases, and platform tools are all part of the same delivery system. This section keeps the breadth visible without dropping into a plain resume grid.
          </p>
        </FadeUpBlock>

        <div className="mt-10 space-y-4">
          {[0, 1].map((row) => (
            <div
              key={row}
              className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.03] py-4"
            >
              <motion.div
                animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: row === 0 ? 20 : 24, ease: "linear" }}
                className="flex min-w-max gap-3 px-3"
              >
                {[...orbitSkills, ...orbitSkills, ...orbitSkills].map((skill, index) => (
                  <span
                    key={`${skill}-${row}-${index}`}
                    className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm uppercase tracking-[0.3em] text-zinc-100"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <FadeUpBlock key={group.title} delay={160 + index * 90}>
              <div className="rounded-[2rem] border border-white/10 bg-black/55 p-6 shadow-glass backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/16 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-white">{group.title}</h3>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      group.accent === "lime"
                        ? "bg-lime-300"
                        : group.accent === "white"
                          ? "bg-white"
                          : group.accent === "stone"
                            ? "bg-stone-300"
                            : "bg-zinc-400"
                    }`}
                  />
                </div>

                <div className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      data-cursor="Skill"
                      className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200 transition duration-300 hover:-translate-y-0.5 hover:border-lime-300/20 hover:bg-white/[0.06]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUpBlock>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
