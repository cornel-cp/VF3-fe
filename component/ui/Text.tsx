import { ReactNode } from "react";

export const Text = ({ 
    children, 
    variant = "default",
    size = "base",
    className = "",
    ...props 
  }: {
    children: ReactNode;
    variant?: "default" | "secondary" | "muted" | "accent" | "success" | "warning" | "danger";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
    className?: string;
  }) => {
    const variants = {
      default: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      accent: "text-primary-400",
      success: "text-accent-green",
      warning: "text-accent-orange",
      danger: "text-accent-red",
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