import { PropsWithChildren, useEffect, useRef } from "react";
import { animate } from "animejs";

type FadeUpBlockProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function FadeUpBlock({ className = "", delay = 0, children }: FadeUpBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animate(element, {
            translateY: [48, 0],
            opacity: [0, 1],
            rotateX: ["-14deg", "0deg"],
            scale: [0.98, 1],
            filter: ["blur(18px)", "blur(0px)"],
            ease: "outExpo",
            duration: 1200,
            delay
          });

          observer.disconnect();
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`translate-y-12 opacity-0 [filter:blur(18px)] ${className}`}>
      {children}
    </div>
  );
}
