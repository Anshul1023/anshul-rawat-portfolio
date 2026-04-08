import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useStoryAnimations = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const el = rootRef.current;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-text-line", el).forEach((line) => {
        gsap.fromTo(
          line,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
            },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".story-mask-title .mask-text", el)
        .forEach((text) => {
          gsap.fromTo(
            text,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
              },
            }
          );
        });

      gsap.utils.toArray<HTMLElement>(".story-stagger-rise", el).forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
            },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".story-project-reveal", el)
        .forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".story-parallax-layer", el)
        .forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth || "0.1");

          gsap.to(layer, {
            y: 100 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
    }, el);

    return () => ctx.revert();
  }, []);

  return rootRef;
};
