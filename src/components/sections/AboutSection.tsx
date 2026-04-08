import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardSwap, { Card } from "@/components/CardSwap";
import ScrollFloat from "@/components/ScrollFloat";
import { useEnhancedMotion } from "@/hooks/useEnhancedMotion";
import { summary } from "@/data/portfolio";

import expImg from "../../assets/exp.webp";
import mindImg from "../../assets/mind.webp";
import proImg from "../../assets/pro.webp";
import techImg from "../../assets/tech.webp";

gsap.registerPlugin(ScrollTrigger);

const highlightCards = [
  { value: "5+", label: "Months Experience", image: expImg },
  { value: "10+", label: "Projects", image: proImg },
  { value: "20+", label: "Technologies", image: techImg },
  { value: "Infinite", label: "Learning Mindset", image: mindImg },
];

const StatsGrid = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    {highlightCards.map((card) => (
      <article
        key={card.label}
        className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
      >
        <div className="relative aspect-[4/3]">
          <img
            src={card.image}
            alt={card.label}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="text-4xl font-semibold text-white">{card.value}</span>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/70">
              {card.label}
            </p>
          </div>
        </div>
      </article>
    ))}
  </div>
);

const CardSwapShowcase = () => (
  <CardSwap delay={2600} pauseOnHover={true}>
    {highlightCards.map((card) => (
      <Card key={card.label}>
        <div className="card-img-wrap relative h-full w-full">
          <img
            src={card.image}
            alt={card.label}
            loading="lazy"
            decoding="async"
            className="card-img"
          />
          <div className="card-overlay">
            <span className="text-7xl text-gradient">{card.value}</span>
            <p className="mt-4 text-2xl text-muted-foreground">{card.label}</p>
          </div>
        </div>
      </Card>
    ))}
  </CardSwap>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const enhancedMotion = useEnhancedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) {
        return;
      }

      const words = summary.split(" ");

      textRef.current.innerHTML = words
        .map((word) => `<span class="about-word inline-block mr-2">${word}</span>`)
        .join("");

      gsap.fromTo(
        ".about-word",
        {
          opacity: 0,
          x: enhancedMotion ? -120 : -30,
          skewX: enhancedMotion ? -8 : 0,
          filter: enhancedMotion ? "blur(4px)" : "none",
        },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          filter: "blur(0)",
          duration: enhancedMotion ? 0.45 : 0.3,
          stagger: enhancedMotion ? 0.016 : 0.01,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [enhancedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-[50] bg-gradient-to-b from-background to-card/30 section-padding"
    >
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6">
        <div className="mb-16 text-center md:mb-24">
          <ScrollFloat textClassName="about-title mb-6 text-lg font-bold tracking-[0.35em] text-primary md:text-2xl">
            ABOUT ME
          </ScrollFloat>

          <ScrollFloat textClassName="about-title font-display text-headline text-muted-foreground">
            High-Performance Web Engineer
          </ScrollFloat>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p
              ref={textRef}
              className="
                max-w-[900px] text-[26px] leading-[1.55] tracking-wide
                text-muted-foreground/90 md:text-[28px]
              "
            >
              {summary}
            </p>
          </div>

          <div className="flex items-center justify-end">
            <div className="w-full max-w-[900px]">
              {enhancedMotion ? <CardSwapShowcase /> : <StatsGrid />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
