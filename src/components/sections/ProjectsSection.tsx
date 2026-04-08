import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEnhancedMotion } from "@/hooks/useEnhancedMotion";
import { useStoryAnimations } from "@/hooks/useStoryAnimations";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const projectImages: Record<string, string> = {
  "tax-association":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
  fastapi:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
  swipenrise:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  "snake-game":
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop",
};

const ProjectCard = ({
  project,
  index,
  compact = false,
}: {
  project: (typeof projects)[number];
  index: number;
  compact?: boolean;
}) => (
  <article
    className={`project-card-${index} story-project-reveal relative group ${
      compact ? "h-full" : "h-[70vh] w-[85vw] flex-shrink-0 md:w-[60vw] lg:w-[50vw]"
    }`}
  >
    <div className="premium-card flex h-full flex-col overflow-hidden">
      <div
        className="story-parallax-layer relative h-1/2 overflow-hidden"
        data-depth={compact ? "0.08" : "0.15"}
      >
        <img
          src={projectImages[project.image]}
          alt={project.title}
          loading="lazy"
          className="story-pan-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">{project.date}</span>
        </div>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full
              bg-primary/20 text-primary transition-all duration-300
              hover:bg-primary hover:text-primary-foreground
            "
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="story-text-line mb-2 text-xs uppercase tracking-wider text-primary">
          {project.subtitle}
        </p>

        <h3 className="story-text-line mb-4 text-2xl font-display transition-colors group-hover:text-primary md:text-3xl">
          {project.title}
        </h3>

        <ul className="mb-6 flex-1 space-y-2">
          {project.description.slice(0, compact ? 4 : 3).map((desc) => (
            <li
              key={desc}
              className="story-text-line flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
              <span className={compact ? "" : "line-clamp-2"}>{desc}</span>
            </li>
          ))}
        </ul>

        <div className="story-stagger-rise flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

const HorizontalProjects = ({
  horizontalRef,
}: {
  horizontalRef: RefObject<HTMLDivElement>;
}) => (
  <div className="horizontal-scroll-container h-screen">
    <div
      ref={horizontalRef}
      className="flex h-full items-center gap-8 pl-6 pr-[50vw] md:pl-20"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  </div>
);

const StackedProjects = () => (
  <div className="section-padding pt-0">
    <div className="container-wide grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.title}
          project={project}
          index={index}
          compact={true}
        />
      ))}
    </div>
  </div>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const storyRef = useStoryAnimations();
  const enhancedMotion = useEnhancedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector(".projects-heading");

      if (heading && !heading.classList.contains("rendered")) {
        heading.classList.add("rendered");

        const text = heading.getAttribute("data-text");
        if (text) {
          heading.innerHTML = text
            .split("")
            .map((char) => `<span class='char inline-block opacity-0'>${char}</span>`)
            .join("");
        }
      }

      gsap.fromTo(
        ".portfolio-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );

      gsap.fromTo(
        ".projects-heading .char",
        {
          opacity: 0,
          y: 60,
          rotateX: -80,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0)",
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );

      gsap.fromTo(
        ".projects-sub",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!enhancedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!horizontalRef.current) {
        return;
      }

      const scrollWidth = horizontalRef.current.scrollWidth - window.innerWidth;

      const animation = gsap.to(horizontalRef.current, {
        x: -scrollWidth,
        ease: "none",
        id: "horizontal-scroll",
        scrollTrigger: {
          trigger: ".horizontal-scroll-container",
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      projects.forEach((_, index) => {
        gsap.fromTo(
          `.project-card-${index}`,
          { scale: 0.9, opacity: 0.45 },
          {
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.project-card-${index}`,
              containerAnimation: animation,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [enhancedMotion]);

  return (
    <section
      id="projects"
      ref={(element) => {
        sectionRef.current = element;
        storyRef.current = element;
      }}
      className="story-root overflow-hidden"
    >
      <div className="section-padding pb-12">
        <div className="container-wide">
          <p className="portfolio-label mb-6 text-2xl font-bold uppercase tracking-[0.35em] text-primary">
            Portfolio
          </p>

          <h2
            className="
              projects-heading font-display text-[4rem] font-bold leading-[0.9]
              tracking-tight text-white drop-shadow-2xl md:text-[6rem] lg:text-[8rem]
            "
            data-text="Featured Projects"
          >
            Featured Projects
          </h2>

          <p className="projects-sub mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A selection of production-ready applications built with modern
            technologies and best practices.
          </p>
        </div>
      </div>

      {enhancedMotion ? (
        <HorizontalProjects horizontalRef={horizontalRef} />
      ) : (
        <StackedProjects />
      )}
    </section>
  );
};

export default ProjectsSection;
