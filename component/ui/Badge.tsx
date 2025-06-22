import { ReactNode } from "react";

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border";

  const variants = {
    default: "bg-surface-tertiary text-text-primary border-surface-elevated",
    primary: "bg-primary/20 text-primary border-primary/50 shadow-glow",
    success:
      "bg-highlight/20 text-highlight border-highlight/50 shadow-glow-teal",
    warning: "bg-primary/30 text-primary border-primary/60 animate-flicker",
    danger: "bg-accent-red/20 text-accent-red border-accent-red/50",
    gradient:
      "bg-gradient-cyber text-primary border-primary/30 shadow-glow animate-gradient",
    cyber:
      "bg-highlight/10 text-highlight border-highlight/40 shadow-glow-teal font-mono",
    neon: "bg-transparent text-primary border-primary shadow-glow animate-pulse-glow",
    matrix:
      "bg-background/80 text-highlight border-highlight/30 font-mono text-xs tracking-wider animate-flicker",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
