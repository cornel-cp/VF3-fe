import { ReactNode } from "react";

export const ProgressBar = ({ 
    value = 0, 
    max = 100, 
    size = "md",
    variant = "primary",
    showValue = false,
    className = "",
    animated = true,
    ...props 
  }: {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "gradient" | "success" | "warning" | "danger";
    showValue?: boolean;
    className?: string;
    animated?: boolean;
  }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
      xl: "h-6",
    };
    
    const variants = {
      primary: "bg-primary-600",
      gradient: "bg-gradient-to-r from-primary-600 to-accent-pink",
      success: "bg-accent-green",
      warning: "bg-accent-orange",
      danger: "bg-accent-red",
    };
    
    const animatedStyles = animated ? "transition-all duration-500 ease-out" : "";
    
    return (
      <div className={`w-full bg-surface-tertiary rounded-full overflow-hidden ${sizes[size]} ${className}`} {...props}>
        <div 
          className={`${sizes[size]} ${variants[variant]} ${animatedStyles} rounded-full relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          )}
        </div>
        {showValue && (
          <div className="text-xs text-text-secondary mt-1 text-center">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  };