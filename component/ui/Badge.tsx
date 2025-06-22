import { ReactNode } from "react";

export const Badge = ({ 
    children, 
    variant = "default",
    size = "md",
    className = "",
    ...props 
  }: {
    children: ReactNode;
    variant?: "default" | "primary" | "success" | "warning" | "danger" | "gradient";
    size?: "sm" | "md" | "lg";
    className?: string;
  }) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";
    
    const variants = {
      default: "bg-surface-tertiary text-text-primary",
      primary: "bg-primary-600/20 text-primary-400 border border-primary-600/30",
      success: "bg-accent-green/20 text-accent-green border border-accent-green/30",
      warning: "bg-accent-orange/20 text-accent-orange border border-accent-orange/30",
      danger: "bg-accent-red/20 text-accent-red border border-accent-red/30",
      gradient: "bg-gradient-to-r from-primary-600/20 to-accent-pink/20 text-primary-300 border border-primary-600/30",
    };
    
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };
    
    return (
      <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </span>
    );
  };