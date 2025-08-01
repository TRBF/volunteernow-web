import React from 'react';

interface DotProps {
  /**
   * Color of the dot
   */
  color?: string;

  /**
   * Size of the dot in pixels
   */
  size?: number;

  /**
   * Spacing between dots
   */
  spacing?: number;

  /**
   * Content of the component
   */
  children?: React.ReactNode;

  /**
   * Class name
   */
  className?: string;

  style?: React.CSSProperties;
}

export default function Dot({
  color = "#4f0c73",
  size = 1,
  spacing = 20,
  children,
  className,
  style = {
    backgroundColor: "transparent",
  },
}: DotProps) {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
      className={className}
    >
      {children}
    </div>
  );
} 