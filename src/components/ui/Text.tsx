import { ReactNode } from "react";

export const Text = ({ 
    children, 
    variant = "default",
    size = "base",
    className = "",
    ...props 
  }: {
    children: ReactNode;
    variant?: "default" | "secondary" | "muted" | "accent" | "success" | "warning" | "danger" | "gradient" | "cyber" | "neon" | "matrix";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
    className?: string;
  }) => {
    const variants = {
      default: "text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      accent: "text-primary",
      success: "text-highlight",
      warning: "text-primary/80",
      danger: "text-accent-red",
      cyber: "text-highlight font-mono",
      neon: "text-primary drop-shadow-glow",
      matrix: "text-highlight font-mono text-xs tracking-wider animate-flicker",
      gradient: "text-gradient-cyber animate-gradient"
    };
    
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    };
    
    return (
      <p className={`${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </p>
    );
  };