import { motion } from "framer-motion";

import { storyChapters } from "../../data/portfolio";
import { SplitReveal } from "../effects/SplitReveal";

export function StorySection() {
  return (
    <section id="story" className="relative bg-[#020202]">
      {storyChapters.map((chapter, index) => {
        const reverse = index % 2 === 1;

        return (
          <section
            key={chapter.slug}
            className="relative border-t border-white/[0.05] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.98),rgba(2,2,2,0.94))]" />
            <div className="pointer-events-none absolute left-[-16rem] top-0 h-[28rem] w-[28rem] rounded-full border border-white/[0.04]" />
            <div className="pointer-events-none absolute right-[-12rem] bottom-[-6rem] h-[24rem] w-[24rem] rounded-full border border-lime-300/[0.05]" />

            <div className="relative mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: reverse ? 120 : -120, rotateY: reverse ? -12 : 12, filter: "blur(14px)" }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={reverse ? "lg:order-2" : ""}
              >
                <div style={{ perspective: "1600px" }} className="w-full">
                  <motion.div
                    whileHover={{ rotateY: reverse ? -8 : 8, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-black/60 shadow-glass backdrop-blur-2xl"
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="h-[23rem] w-full object-cover object-center sm:h-[30rem] lg:h-[38rem]"
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: reverse ? -80 : 80, rotateX: "-14deg", filter: "blur(12px)" }}
                whileInView={{ opacity: 1, x: 0, rotateX: "0deg", filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className={reverse ? "lg:order-1" : ""}
              >
                <p className="text-[11px] uppercase tracking-[0.48em] text-lime-200/90">{chapter.eyebrow}</p>
                <SplitReveal
                  as="h2"
                  text={chapter.title}
                  className="mt-5 max-w-5xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-[5rem]"
                />

                <p className="mt-6 max-w-3xl text-lg leading-9 text-zinc-300">{chapter.body}</p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {chapter.bullets.map((bullet, bulletIndex) => (
                    <motion.div
                      key={bullet}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.55, delay: 0.18 + bulletIndex * 0.08 }}
                      data-cursor="Focus"
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-300 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/18 hover:bg-white/[0.05]"
                    >
                      {bullet}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: 0.36 }}
                  className="mt-8 inline-flex w-fit rounded-full border border-lime-300/18 bg-lime-300/[0.08] px-5 py-3 text-xs uppercase tracking-[0.38em] text-lime-100"
                >
                  {chapter.metric}
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
