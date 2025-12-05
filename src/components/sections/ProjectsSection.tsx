import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/portfolio';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.projects-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Horizontal scroll animation
      if (horizontalRef.current) {
        const scrollWidth = horizontalRef.current.scrollWidth - window.innerWidth;
        
        gsap.to(horizontalRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-scroll-container',
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Animate each project card as it comes into view
        projects.forEach((_, index) => {
          gsap.fromTo(
            `.project-card-${index}`,
            { scale: 0.9, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: `.project-card-${index}`,
                containerAnimation: gsap.getById('horizontal-scroll'),
                start: 'left center',
                end: 'center center',
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="overflow-hidden"
    >
      {/* Section header */}
      <div className="section-padding pb-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="projects-title text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Portfolio
              </p>
              <h2 className="projects-title text-headline font-display">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <p className="projects-title text-muted-foreground max-w-md text-sm md:text-base">
              A selection of production-ready applications built with modern technologies and best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="horizontal-scroll-container h-screen">
        <div
          ref={horizontalRef}
          className="flex items-center h-full gap-8 pl-6 md:pl-20 pr-[50vw]"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card-${index} flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[70vh] relative group`}
            >
              <div className="premium-card h-full flex flex-col overflow-hidden">
                {/* Image */}
                <div className="relative h-1/2 overflow-hidden">
                  <img
                    src={projectImages[project.image]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Overlay content */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <p className="text-primary text-xs uppercase tracking-wider mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <ul className="flex-1 space-y-2 mb-6 overflow-hidden">
                    {project.description.slice(0, 3).map((desc, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
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

          {/* End card */}
          <div className="flex-shrink-0 w-[40vw] h-[70vh] flex items-center justify-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 text-2xl font-display text-muted-foreground hover:text-primary transition-colors"
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
