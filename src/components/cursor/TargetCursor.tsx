import { useEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import "../../style/TargetCursor.css";

interface Props {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.25,
  parallaxOn = true,
}: Props) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement>>();
  const dotRef = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const moveXRef = useRef<((value: number) => void) | null>(null);
  const moveYRef = useRef<((value: number) => void) | null>(null);

  const activeStrengthRef = useRef(0);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(
    null
  );
  const tickerFnRef = useRef<() => void>(() => {});

  const isMobile = useMemo(() => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768
    );
  }, []);

  const constants = {
    borderWidth: 3,
    cornerSize: 12,
  };

  const moveCursor = useCallback((x: number, y: number) => {
    moveXRef.current?.(x);
    moveYRef.current?.(y);
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current =
      cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner");

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    moveXRef.current = gsap.quickTo(cursor, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    moveYRef.current = gsap.quickTo(cursor, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    // Start spin
    spinTl.current = gsap
      .timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move follow
    const moveHandler = (e: MouseEvent) =>
      moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    // PARALLAX TICKER
    const tickerFn = () => {
      if (
        !targetCornerPositionsRef.current ||
        !cornersRef.current ||
        !cursorRef.current
      )
        return;

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, "x") as number;
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number;

      cornersRef.current.forEach((corner, i) => {
        const target = targetCornerPositionsRef.current![i];
        gsap.set(corner, {
          x: target.x - cursorX,
          y: target.y - cursorY,
        });
      });
    };

    tickerFnRef.current = tickerFn;

    // ON HOVER ENTER
    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        targetSelector
      ) as HTMLElement | null;

      if (!target || !cursorRef.current || !cornersRef.current) return;

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        {
          x: rect.right - cornerSize + borderWidth,
          y: rect.top - borderWidth,
        },
        {
          x: rect.right - cornerSize + borderWidth,
          y: rect.bottom - cornerSize + borderWidth,
        },
        {
          x: rect.left - borderWidth,
          y: rect.bottom - cornerSize + borderWidth,
        },
      ];

      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      activeStrengthRef.current = 1;
      gsap.ticker.add(tickerFnRef.current);

      gsap.to(cursorRef.current, { scale: 1.05, duration: 0.25 });
      gsap.to(dotRef.current, { scale: 0.8, duration: 0.2 });
    };

    // ON HOVER LEAVE
    const leaveHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(targetSelector);
      if (!target) return;

      gsap.ticker.remove(tickerFnRef.current);
      activeStrengthRef.current = 0;

      targetCornerPositionsRef.current = null;

      // Reset positions
      const { cornerSize } = constants;
      const resetPos = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
      ];

      cornersRef.current?.forEach((corner, i) => {
        gsap.to(corner, {
          x: resetPos[i].x,
          y: resetPos[i].y,
          duration: 0.3,
          ease: "power3.out",
        });
      });

      gsap.to(cursorRef.current, { scale: 1, duration: 0.25 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.25 });

      spinTl.current?.restart();
    };

    window.addEventListener("mouseover", enterHandler);
    window.addEventListener("mouseout", leaveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("mouseout", leaveHandler);
      spinTl.current?.kill();
      gsap.ticker.remove(tickerFnRef.current);
      document.body.style.cursor = "auto";
    };
  }, [isMobile, moveCursor, targetSelector]);

  if (isMobile) return null;

  return (
    <div className="target-cursor-wrapper" ref={cursorRef}>
      <div className="target-cursor-dot" ref={dotRef} />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
