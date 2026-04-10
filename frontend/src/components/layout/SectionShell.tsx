import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type SectionShellProps = PropsWithChildren<{
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}>;

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  className = "",
  children
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="mb-12 max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200/80">
          {eyebrow}
        </span>
        <h2 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

