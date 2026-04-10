import { CSSProperties, PropsWithChildren, useState } from "react";

type TiltCardProps = PropsWithChildren<{
  className?: string;
  glare?: boolean;
}>;

export function TiltCard({ children, className = "", glare = true }: TiltCardProps) {
  const [style, setStyle] = useState<CSSProperties>({});

  const reset = () => {
    setStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    });
  };

  const handleMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX / bounds.width) - 0.5) * 10;
    const rotateX = ((offsetY / bounds.height) - 0.5) * -10;
    const highlightX = (offsetX / bounds.width) * 100;
    const highlightY = (offsetY / bounds.height) * 100;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`,
      backgroundImage: glare
        ? `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(103,232,249,0.16), transparent 38%)`
        : undefined
    });
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={style}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

