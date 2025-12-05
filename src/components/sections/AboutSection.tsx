import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { summary } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        '.about-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Line animation
      gsap.fromTo(
        '.about-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Word by word reveal for summary
      if (textRef.current) {
        const words = summary.split(' ');
        textRef.current.innerHTML = words
          .map((word) => `<span class="about-word inline-block mr-2">${word}</span>`)
          .join('');

        gsap.fromTo(
          '.about-word',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stats counter animation
      gsap.fromTo(
        '.about-stat',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-background to-card/30"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 about-title">
            About Me
          </p>
          <h2 className="text-headline font-display about-title">
            Crafting Digital
            <br />
            <span className="text-gradient">Experiences</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Summary text */}
          <div>
            <p
              ref={textRef}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {summary}
            </p>
          </div>

          {/* Stats */}
          <div className="about-stats grid grid-cols-2 gap-8">
            <div className="about-stat premium-card text-center">
              <span className="text-4xl md:text-5xl font-display text-gradient">5+</span>
              <p className="text-muted-foreground mt-2">Months Experience</p>
            </div>
            <div className="about-stat premium-card text-center">
              <span className="text-4xl md:text-5xl font-display text-gradient">10+</span>
              <p className="text-muted-foreground mt-2">Projects Delivered</p>
            </div>
            <div className="about-stat premium-card text-center">
              <span className="text-4xl md:text-5xl font-display text-gradient">20+</span>
              <p className="text-muted-foreground mt-2">Technologies</p>
            </div>
            <div className="about-stat premium-card text-center">
              <span className="text-4xl md:text-5xl font-display text-gradient">∞</span>
              <p className="text-muted-foreground mt-2">Learning Mindset</p>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="about-line h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-24 origin-left" />
      </div>
    </section>
  );
};

export default AboutSection;
