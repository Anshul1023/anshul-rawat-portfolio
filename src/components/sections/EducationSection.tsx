import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, certifications } from '@/data/portfolio';
import { GraduationCap, Award, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.edu-title',
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

      // Cards reveal
      gsap.fromTo(
        '.edu-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.edu-grid',
            start: 'top 80%',
          },
        }
      );

      // Certification badge animation
      gsap.fromTo(
        '.cert-badge',
        { scale: 0, rotation: -10 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.cert-section',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-background to-card/30"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="edu-title text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Background
          </p>
          <h2 className="edu-title text-headline font-display">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education cards */}
          <div className="edu-grid lg:col-span-2 grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={edu.institution}
                className="edu-card premium-card relative overflow-hidden group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl mb-2">{edu.degree}</h3>
                <p className="text-muted-foreground mb-4">{edu.institution}</p>

                {/* Period */}
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period}</span>
                </div>

                {/* Decorative corner */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="cert-section">
            <div className="premium-card h-full relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl">Certifications</h3>
              </div>

              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="cert-badge p-4 rounded-xl border border-primary/20 bg-primary/5"
                  >
                    <h4 className="font-medium mb-1">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.type}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 border border-primary/10 rounded-full" />
              <div className="absolute -bottom-8 -right-8 w-16 h-16 border border-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
