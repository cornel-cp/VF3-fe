import { ReactNode } from "react";

export const Card = ({
  children,
  className = "",
  variant = "default",
  hover = true,
  glow = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "gradient";
  hover?: boolean;
  glow?: boolean;
}) => {
  const baseStyles = "rounded-2xl border transition-all duration-300 ease-out";
  const variants = {
    default: "bg-background border-surface-tertiary shadow-card",
    elevated: "bg-background-secondary border-surface-elevated shadow-card-hover",
    glass: "bg-background-primary/80 border-primary/20 backdrop-blur-lg glass",
    gradient: "bg-gradient-cyber border-primary/30 shadow-glow",
    neon: "bg-background-primary border-primary shadow-glow animate-pulse-glow",
    cyber:"bg-gradient-to-br from-surface-primary to-surface-secondary border-highlight/30 glass-teal",
  };

  const hoverStyles = hover
    ? "hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/40"
    : "";
  const glowStyles = glow
    ? "shadow-glow hover:shadow-glow-lg border-primary/50"
    : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
