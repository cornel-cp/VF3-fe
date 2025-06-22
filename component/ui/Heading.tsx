import { ReactNode, createElement } from "react";

export const Heading = ({
  level = 1,
  children,
  variant = "default",
  className = "",
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  variant?: "default" | "gradient" | "glow";
  className?: string;
}) => {
  const Tag = `h${level}`;

  const baseStyles = "font-bold text-text-primary";
  const variants = {
    default: "text-primary",
    gradient: "text-gradient-cyber",
    glow: "text-primary drop-shadow-glow animate-flicker",
    cyber: "text-gradient-teal",
    neon: "text-primary shadow-glow animate-pulse-glow",
    matrix: "text-highlight drop-shadow-glow-teal font-mono",
  };

  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl",
    5: "text-lg md:text-xl lg:text-2xl",
    6: "text-base md:text-lg lg:text-xl",
  };

  return createElement(
    Tag,
    {
      className: `${baseStyles} ${variants[variant]} ${sizes[level]} ${className}`,
      ...props,
    },
    children
  );
};
