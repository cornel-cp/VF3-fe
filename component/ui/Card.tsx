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
      default: "bg-surface-primary border-surface-tertiary shadow-card",
      elevated: "bg-surface-secondary border-surface-elevated shadow-card-hover",
      glass: "bg-surface-primary/80 border-surface-tertiary/50 backdrop-blur-lg",
      gradient: "bg-gradient-to-br from-surface-primary to-surface-secondary border-accent-purple/20",
    };
    
    const hoverStyles = hover ? "hover:shadow-card-hover hover:-translate-y-1" : "";
    const glowStyles = glow ? "shadow-glow hover:shadow-glow-lg" : "";
    
    return (
      <div 
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${glowStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };