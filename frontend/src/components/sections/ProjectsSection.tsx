import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

import { projects } from "../../data/portfolio";
import CircularGallery from "../effects/CircularGallery";
import { FadeUpBlock } from "../effects/FadeUpBlock";
import { SplitReveal } from "../effects/SplitReveal";

type ProjectSelection = (typeof projects)[number] | null;

type ProjectsSectionProps = {
  setSelectedProject: Dispatch<SetStateAction<ProjectSelection>>;
};

export function ProjectsSection({ setSelectedProject }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems = useMemo(
    () =>
      projects.map((project) => ({
        image: project.image,
        text: project.title
      })),
    []
  );

  const activeProject = projects[activeIndex];

  return (
    <section id="projects" className="relative border-t border-white/[0.05] bg-[#020202] py-14 lg:py-18">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <FadeUpBlock>
          <p className="text-[11px] uppercase tracking-[0.48em] text-zinc-500">Selected Projects</p>
        </FadeUpBlock>

        <SplitReveal
          as="h2"
          text="The project section should feel like a premium moving wall, not a boxed showcase."
          className="mt-4 max-w-6xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-[5.3rem]"
        />

        <FadeUpBlock className="mt-5 max-w-3xl" delay={120}>
          <p className="text-lg leading-9 text-zinc-300">
            Scroll or drag the gallery. Click any project card to open the full details, code links, and deeper explanation.
          </p>
        </FadeUpBlock>
      </div>

      <div className="relative mt-10 left-1/2 w-screen -translate-x-1/2 border-y border-white/[0.06] bg-[#050505] py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_52%)]" />
        <div className="pointer-events-none absolute left-[-16rem] top-10 h-[28rem] w-[28rem] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute right-[-12rem] bottom-[-8rem] h-[24rem] w-[24rem] rounded-full border border-lime-300/[0.06]" />

        <div className="relative mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.42em] text-lime-100/90">
                Full-width circular gallery
              </p>
              <p className="mt-3 text-sm leading-8 text-zinc-300">
                The gallery itself is the navigation now. No extra box around it. No second fake showcase layer on top of it.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.36em] text-zinc-300">
              Click any card for details
            </div>
          </div>

          <div style={{ height: "720px", position: "relative" }} className="w-full">
            <CircularGallery
              items={galleryItems}
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.05}
              onActiveIndexChange={setActiveIndex}
              onItemClick={(index) => setSelectedProject(projects[index])}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          key={activeProject.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5 border-t border-white/[0.06] pt-8 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="rounded-[2.1rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.42em] text-lime-100/90">
                {activeProject.category}
              </p>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.32em] text-zinc-300">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-4 font-display text-4xl leading-[0.94] text-white sm:text-5xl">
              {activeProject.title}
            </h3>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-zinc-100/92">{activeProject.headline}</p>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-zinc-300">{activeProject.description}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  data-cursor="Project"
                  className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.34em] transition duration-300 ${
                    activeIndex === index
                      ? "border-lime-300/28 bg-lime-300/[0.1] text-lime-100"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06]"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Code"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.09]"
              >
                <Github size={16} />
                GitHub
              </a>
              {activeProject.liveUrl ? (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Live"
                  className="inline-flex items-center gap-2 rounded-full border border-lime-300/22 bg-lime-300/[0.1] px-5 py-3 text-sm text-lime-100 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300/[0.14]"
                >
                  <ArrowUpRight size={16} />
                  Live Demo
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-300">
                  Live demo on request
                </span>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(activeProject)}
                data-cursor="Details"
                className="inline-flex items-center gap-2 rounded-full border border-lime-300/18 bg-lime-300/[0.08] px-5 py-3 text-sm text-lime-100 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300/[0.12]"
              >
                Open Project Details
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {activeProject.details.map((detail) => (
              <div
                key={detail}
                className="rounded-[1.8rem] border border-white/10 bg-black/58 p-5 text-sm leading-7 text-zinc-300 backdrop-blur-xl"
              >
                {detail}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
