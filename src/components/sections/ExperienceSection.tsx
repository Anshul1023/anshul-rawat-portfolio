import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '@/data/portfolio';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { useStoryAnimations } from "@/hooks/useStoryAnimations";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useStoryAnimations();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            scrub: true,
          },
        }
      );

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

        gsap.fromTo(
          `.exp-card-${index} .achievement-item`,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
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
      ref={(el) => {
        sectionRef.current = el;
        storyRef.current = el;
      }}
      className="section-padding bg-gradient-to-b from-card/30 to-background story-root"
    >
      {/* ⬆⬆ WIDTH INCREASED HERE */}
      <div className="container-wide max-w-[1700px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20 md:mb-28">
          <p className="exp-title text-primary text-lg uppercase tracking-[0.35em] mb-6 story-text-line">
            Career Journey
          </p>

          <h2 className="exp-title text-6xl md:text-7xl font-display story-mask-title">
            <span className="mask-text">
              Work <span className="text-gradient">Experience</span>
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative story-timeline-pin">

          <div
            className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 
                       w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent 
                       origin-top hidden md:block"
          />

          {/* Cards */}
          <div className="space-y-16 md:space-y-32">
            {experience.map((exp, index) => (
              <div
                key={exp.company}
                className={`exp-card-${index} relative grid md:grid-cols-2 gap-12 md:gap-24 story-stagger-rise`}
              >

                {/* Timeline Dot */}
                <div
                  className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 
                             w-6 h-6 rounded-full bg-primary gold-glow z-10 story-parallax-layer"
                />

                {/* LEFT TEXT SIDE */}
                <div className={`${index % 2 === 0 ? 'md:text-right md:pr-24' : 'md:order-2 md:pl-24'}`}
                >
                  <div className={`${index % 2 === 1 ? 'md:text-right' : ''}`}>

                    <div className="flex items-center gap-3 text-primary mb-3 md:justify-end text-xl story-text-line">
                      <Calendar className="w-6 h-6" />
                      <span className="font-semibold">{exp.period}</span>
                    </div>

                    <h3 className="font-display text-4xl md:text-5xl mb-4 story-text-line">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-6 text-muted-foreground text-xl story-text-line">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6" />
                        <span>{exp.company}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ACHIEVEMENTS CARD — wider */}
                <div
                  className={`premium-card ${
                    index % 2 === 0 ? 'md:pl-24' : 'md:order-1 md:pr-24'
                  } p-12 md:p-16 max-w-[900px]`}
                >
                  <h4 className="text-2xl uppercase tracking-wider text-primary mb-8 story-text-line">
                    Key Achievements
                  </h4>

                  <ul className="space-y-5 text-[20px] leading-relaxed">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="achievement-item flex items-start gap-4 text-muted-foreground"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
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
