import { ReactNode } from "react";

export const Text = ({ 
    children, 
    variant = "default",
    size = "base",
    className = "",
    ...props 
  }: {
    children: ReactNode;
    variant?: "default" | "secondary" | "muted" | "accent" | "success" | "warning" | "danger" | "gradient" | "warm" | "cozy" | "playful";
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
      danger: "text-accent-coral",
      warm: "text-highlight font-playful",
      cozy: "text-primary drop-shadow-warmth",
      playful: "text-highlight font-playful text-sm tracking-wide animate-twinkle",
      gradient: "text-gradient-warm animate-gradient font-bold"
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