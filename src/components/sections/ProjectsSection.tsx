import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/portfolio';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { useStoryAnimations } from "@/hooks/useStoryAnimations";

gsap.registerPlugin(ScrollTrigger);

const projectImages: Record<string, string> = {
  'tax-association': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
  'fastapi': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
  'swipenrise': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'snake-game': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  // STORY HOOK
  const storyRef = useStoryAnimations();

  // -----------------------------
  // 🔥 HEADING ANIMATION FIXED
  // -----------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = document.querySelector(".projects-heading");

      // Prevent double processing
      if (heading && !heading.classList.contains("rendered")) {
        heading.classList.add("rendered");

        const text = heading.getAttribute("data-text")!;
        const chars = text.split("");

        heading.innerHTML = chars
          .map((c) => `<span class='char inline-block opacity-0'>${c}</span>`)
          .join("");
      }

      // Portfolio Label Animation
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

      // Premium Heading Character Animation
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

      // Subtext Animation
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

  // -----------------------------
  // HORIZONTAL SCROLL (UNCHANGED)
  // -----------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (horizontalRef.current) {
        const scrollWidth =
          horizontalRef.current.scrollWidth - window.innerWidth;

        gsap.to(horizontalRef.current, {
          x: -scrollWidth,
          ease: "none",
          id: "horizontal-scroll",
          scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Project card entrance animation
        projects.forEach((_, index) => {
          gsap.fromTo(
            `.project-card-${index}`,
            { scale: 0.85, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `.project-card-${index}`,
                containerAnimation: gsap.getById("horizontal-scroll"),
                start: "left center",
                end: "center center",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // -----------------------------
  // JSX RENDERING
  // -----------------------------
  return (
    <section
      id="projects"
      ref={(el) => {
        sectionRef.current = el;
        storyRef.current = el;
      }}
      className="overflow-hidden story-root"
    >
      {/* Section header */}
      <div className="section-padding pb-12">
        <div className="container-wide">

          {/* 🔥 UPDATED HEADING (PREMIUM LOOK) */}
          <p className="portfolio-label text-primary text-2xl tracking-[0.35em] uppercase mb-6 font-bold">
            PORTFOLIO
          </p>

          <h2
            className="projects-heading font-display 
              text-[5rem] md:text-[7rem] lg:text-[9rem]
              font-bold leading-[0.9] tracking-tight drop-shadow-2xl text-white"
            data-text="Featured Projects"
          >
            Featured Projects
          </h2>

          <p className="projects-sub text-muted-foreground max-w-xl mt-6 text-base md:text-lg">
            A selection of production-ready applications built with modern technologies and best practices.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div className="horizontal-scroll-container h-screen">
        <div
          ref={horizontalRef}
          className="flex items-center h-full gap-8 pl-6 md:pl-20 pr-[50vw]"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card-${index} story-project-reveal flex-shrink-0 
                w-[85vw] md:w-[60vw] lg:w-[50vw] h-[70vh] relative group`}
            >
              <div className="premium-card h-full flex flex-col overflow-hidden">

                {/* IMAGE AREA */}
                <div
                  className="relative h-1/2 overflow-hidden story-parallax-layer"
                  data-depth="0.15"
                >
                  <img
                    src={projectImages[project.image]}
                    alt={project.title}
                    className="w-full h-full object-cover story-pan-image transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                  {/* Date */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {project.date}
                    </span>
                  </div>

                  {/* External link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full 
                        bg-primary/20 backdrop-blur-sm flex items-center justify-center 
                        text-primary hover:bg-primary hover:text-primary-foreground 
                        transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-6 flex flex-col">
                  <p className="text-primary text-xs uppercase tracking-wider mb-2 story-text-line">
                    {project.subtitle}
                  </p>

                  <h3 className="font-display text-2xl md:text-3xl mb-4 story-text-line group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <ul className="flex-1 space-y-2 mb-6">
                    {project.description.slice(0, 3).map((desc, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-sm flex items-start gap-2 story-text-line"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 story-stagger-rise">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-border bg-surface text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* FINAL CTA CARD */}
          <div className="flex-shrink-0 w-[40vw] h-[70vh] flex items-center justify-center story-cta-bloom">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group flex items-center gap-4 text-3xl font-display text-muted-foreground hover:text-primary transition-colors"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
