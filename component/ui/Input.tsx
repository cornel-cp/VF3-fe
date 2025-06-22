import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  glow?: boolean;
}

export const Input = ({
  type = "text",
  variant = "default",
  inputSize = "md",
  className = "",
  error = false,
  glow = false,
  ...props
}: InputProps) => {
  const baseStyles =
    "w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary placeholder-text-muted font-mono";

  const variants = {
    default:
      "bg-surface-secondary border-surface-elevated text-primary focus:border-primary focus:ring-primary/50 focus:shadow-glow",
    filled:
      "bg-surface-tertiary border-transparent text-primary focus:bg-surface-secondary focus:border-primary focus:ring-primary/50 focus:shadow-glow",
    neon: "bg-transparent border-primary text-primary focus:border-primary focus:ring-primary focus:shadow-glow-lg placeholder-primary/50",
    cyber:
      "bg-surface-primary border-highlight/50 text-highlight focus:border-highlight focus:ring-highlight/50 focus:shadow-glow-teal placeholder-highlight/50",
    matrix:
      "bg-background border-primary/30 text-primary focus:border-primary focus:ring-primary/30 focus:shadow-glow font-mono text-sm tracking-wide",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  const errorStyles = error
    ? "border-accent-red focus:border-accent-red focus:ring-accent-red"
    : "";
  const glowStyles = glow ? "shadow-glow focus:shadow-glow-lg" : "";

  return (
    <input
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${errorStyles} ${glowStyles} ${className}`}
      {...props}
    />
  );
};
