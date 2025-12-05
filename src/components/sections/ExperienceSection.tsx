import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '@/data/portfolio';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.exp-title',
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

      // Timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );

      // Experience cards - pinned scroll effect
      experience.forEach((_, index) => {
        gsap.fromTo(
          `.exp-card-${index}`,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.exp-card-${index}`,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Achievement items stagger
        gsap.fromTo(
          `.exp-card-${index} .achievement-item`,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.exp-card-${index}`,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-card/30 to-background"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="exp-title text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Career Journey
          </p>
          <h2 className="exp-title text-headline font-display">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top hidden md:block" />

          {/* Experience cards */}
          <div className="space-y-12 md:space-y-24">
            {experience.map((exp, index) => (
              <div
                key={exp.company}
                className={`exp-card-${index} relative grid md:grid-cols-2 gap-8 md:gap-16`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary gold-glow z-10" />

                {/* Date - alternating sides */}
                <div
                  className={`${
                    index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className="flex items-center gap-2 text-primary mb-2 md:justify-end">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2">{exp.role}</h3>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div
                  className={`premium-card ${
                    index % 2 === 0 ? 'md:pl-16' : 'md:order-1 md:pr-16'
                  }`}
                >
                  <h4 className="text-sm uppercase tracking-wider text-primary mb-4">
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="achievement-item flex items-start gap-3 text-muted-foreground text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
