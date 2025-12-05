import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from '@/components/three/ParticleField';
import { personalInfo } from '@/data/portfolio';
import { ArrowDown, Mail, Linkedin, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic text animation for name
      const nameChars = titleRef.current?.querySelectorAll('.char');
      if (nameChars) {
        gsap.fromTo(
          nameChars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle reveal
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // Contact items stagger
      gsap.fromTo(
        '.hero-contact-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1.2,
        }
      );

      // Scroll indicator
      gsap.fromTo(
        '.scroll-indicator-container',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.6 }
      );

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: 200,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-6 md:px-12">
        {/* Pre-title */}
        <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mb-6 hero-contact-item">
          Full Stack Developer
        </p>

        {/* Main name */}
        <h1
          ref={titleRef}
          className="text-huge font-display font-medium mb-6 perspective-1000"
        >
          {splitText(personalInfo.name)}
        </h1>

        {/* Title */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto"
        >
          Building{' '}
          <span className="text-gradient font-medium">scalable</span>,{' '}
          high-performance web applications
        </p>

        {/* Contact info */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          <a
            href={`mailto:${personalInfo.email}`}
            className="hero-contact-item flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">{personalInfo.email}</span>
            <span className="sm:hidden">Email</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-contact-item flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <span className="hero-contact-item flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Faridabad, India</span>
            <span className="sm:hidden">India</span>
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator-container absolute bottom-12 left-1/2 -translate-x-1/2">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full animate-rotate-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-primary/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
    </section>
  );
};

export default HeroSection;
