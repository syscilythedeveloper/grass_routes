"use client";
import React from "react";

// A simple utility to conditionally join class names, similar to the 'clsx' library.
const clsx = (...args: (string | boolean | undefined | null)[]): string =>
  args.filter(Boolean).join(" ");

// The MagicContainer component creates a container with a glowing border effect that follows the mouse.
interface MagicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MagicContainer: React.FC<MagicContainerProps> = ({
  children,
  className,
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative rounded-3xl p-[1px] transition-all duration-300 w-60 max-w-xs  ",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #b7c9a3, #a3b18a, #6b8e6b, #dbead3, transparent 80%)`
          : "rgba(183, 201, 163, 0.08)", // Faint sage border for non-hovered state
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default MagicContainer;
