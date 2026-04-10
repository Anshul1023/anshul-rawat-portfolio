import { useEffect, useMemo, useRef } from "react";
import { animate, stagger } from "animejs";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  once?: boolean;
};

export function SplitReveal({
  text,
  as: Tag = "span",
  className = "",
  once = true
}: SplitRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const element = rootRef.current;

    if (!element) {
      return;
    }

    const wordElements = element.querySelectorAll("[data-split-word]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animate(wordElements, {
            translateY: ["120%", "0%"],
            opacity: [0, 1],
            rotateX: ["-82deg", "0deg"],
            rotateZ: [2, 0],
            filter: ["blur(12px)", "blur(0px)"],
            ease: "outExpo",
            duration: 1100,
            delay: stagger(55)
          });

          if (once) {
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag ref={rootRef as never} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden [perspective:1200px]">
          <span data-split-word className="inline-block translate-y-[120%] opacity-0 will-change-transform [transform-origin:50%_100%]">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
