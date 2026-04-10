import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { navItems } from "../../data/portfolio";

type HeaderProps = {
  activeSection: string;
};

export function Header({ activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        animate={{
          borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
          backgroundColor: scrolled ? "rgba(3,3,3,0.84)" : "rgba(3,3,3,0.48)"
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 shadow-glass backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          data-cursor="Top"
          className="font-display text-lg font-semibold tracking-[0.28em] text-white"
        >
          ANSHUL
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                data-cursor={item.label}
                className={`rounded-full px-4 py-2 text-sm transition duration-300 ${
                  active
                    ? "bg-lime-300/12 text-lime-100"
                    : "text-zinc-400 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/Anshul-Rawat-Resume.pdf"
            download
            data-cursor="Resume"
            className="hidden rounded-full border border-lime-300/35 bg-lime-300/10 px-4 py-2 text-sm font-medium text-lime-100 transition duration-300 hover:-translate-y-0.5 hover:border-lime-200/60 hover:bg-lime-300/18 sm:inline-flex"
          >
            Download Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-black/92 p-4 shadow-glass backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                data-cursor={item.label}
                className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeSection === item.id
                    ? "bg-lime-300/10 text-lime-100"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
