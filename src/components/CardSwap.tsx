// src/components/CardSwap.tsx
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style/CardSwap.css";

gsap.registerPlugin(ScrollTrigger);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ""} ${className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

// ------------------------- SLOT POSITIONS -------------------------
const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

// ------------------------- PROPS -------------------------
interface CardSwapProps {
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  children: React.ReactNode;
}

// ------------------------- MAIN COMPONENT -------------------------
const CardSwap = ({
  cardDistance = 70,
  verticalDistance = 80,
  delay = 3000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6, 0.9)",
          durDrop: 1.5,
          durMove: 1.6,
          durReturn: 1.6,
          promoteOverlap: 0.85,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);

  // Stable refs
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  if (refs.current.length !== childArr.length) {
    refs.current = childArr.map(() => React.createRef<HTMLDivElement>());
  }

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(false);

  // Clear interval helper
  const clearSwapInterval = () => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const total = refs.current.length;

    // initial placement
    refs.current.forEach((r, i) => {
      const el = r.current;
      if (!el) return;

      placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      el.style.willChange = "transform, opacity";
      el.style.backfaceVisibility = "hidden";
    });

    // SWAP FUNCTION
    const swap = () => {
      if (!isVisibleRef.current) return;
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs.current[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=600",
        duration: config.durDrop,
        ease: config.ease,
        force3D: true,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs.current[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.current.length);

        tl.set(el, { zIndex: slot.zIndex }, "promote");

        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
            force3D: true,
          },
          `promote+=${i * 0.1}`
        );
      });

      const backSlot = makeSlot(
        refs.current.length - 1,
        cardDistance,
        verticalDistance,
        refs.current.length
      );

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

      tl.set(elFront, { zIndex: backSlot.zIndex }, "return");

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
          force3D: true,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // ------------------------------
    // ⭐ NO MORE LAG FIX
    // WAIT UNTIL SECTION IS VISIBLE BEFORE STARTING THE HEAVY ANIMATION
    // ------------------------------
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        isVisibleRef.current = true;
        swap(); // first swap
        intervalRef.current = window.setInterval(swap, delay);
      },
    });

    // Pause on hover
    let cleanupHover = () => {};
    if (pauseOnHover && container.current) {
      const node = container.current;

      const pause = () => {
        tlRef.current?.pause();
        clearSwapInterval();
      };

      const resume = () => {
        tlRef.current?.play();
        if (!intervalRef.current && isVisibleRef.current)
          intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      cleanupHover = () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
      };
    }

    return () => {
      cleanupHover();
      clearSwapInterval();
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    skewAmount,
    easing,
    refs.current.length,
  ]);

  // ------------------------- RENDER -------------------------
  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as any, {
          key: i,
          ref: refs.current[i],
          style: {
            ...(child.props?.style ?? {}),
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          },
          onClick: (e: any) => {
            child.props?.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container">
      {rendered}
    </div>
  );
};

export default CardSwap;
