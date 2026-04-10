import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";

type Project = {
  title: string;
  category?: string;
  headline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string | null;
  image?: string;
  details: string[];
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/95 p-6 shadow-glass sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              data-cursor="Close"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 transition hover:bg-white/10"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <p className="text-sm uppercase tracking-[0.32em] text-lime-100/85">
              {project.category ?? "Project Deep Dive"}
            </p>
            <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">{project.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">{project.description}</p>

            {project.image ? (
              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/70">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-64 w-full object-cover object-center"
                />
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-300"
                >
                  {detail}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Code"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
              >
                <Github size={16} />
                GitHub
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Live"
                  className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-3 text-sm text-lime-50 transition hover:bg-lime-300/20"
                >
                  <ArrowUpRight size={16} />
                  Live Demo
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                  Live demo available on request
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
