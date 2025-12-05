import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/data/portfolio';
import { 
  Code2, 
  Database, 
  Server, 
  GitBranch, 
  Palette, 
  Cloud,
  Cpu,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  DevOps: <Cloud className="w-5 h-5" />,
  Tools: <GitBranch className="w-5 h-5" />,
  Design: <Palette className="w-5 h-5" />,
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.skills-title',
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

      // Category cards reveal
      gsap.fromTo(
        '.skill-category',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll for skills marquee
      if (scrollContainerRef.current) {
        gsap.to('.skills-marquee-inner', {
          x: '-50%',
          ease: 'none',
          duration: 30,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding overflow-hidden"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="skills-title text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Expertise
          </p>
          <h2 className="skills-title text-headline font-display">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        {/* Skills grid by category */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div
              key={category}
              className="skill-category premium-card group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {categoryIcons[category] || <Layers className="w-5 h-5" />}
                </div>
                <h3 className="font-display text-lg">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite scroll marquee */}
        <div
          ref={scrollContainerRef}
          className="relative overflow-hidden py-8 border-y border-border/50"
        >
          <div className="skills-marquee-inner flex gap-8 whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={`${skill.name}-${index}`}
                className="text-2xl md:text-3xl font-display text-muted-foreground/30 hover:text-primary transition-colors cursor-default"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
