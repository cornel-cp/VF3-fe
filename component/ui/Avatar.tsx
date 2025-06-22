import { ReactNode } from "react";

export const Avatar = ({ 
    src, 
    alt = "", 
    size = "md",
    fallback,
    className = "",
    online = false,
    ...props 
  }: {
    src?: string;
    alt?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    fallback?: string;
    className?: string;
    online?: boolean;
  }) => {
    const sizes = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
      "2xl": "w-20 h-20 text-2xl",
    };
    
    const sizeClasses = sizes[size];
    
    return (
      <div className={`relative inline-block ${className}`} {...props}>
        <div className={`${sizeClasses} rounded-full bg-surface-tertiary border-2 border-surface-elevated overflow-hidden flex items-center justify-center`}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <span className="font-medium text-text-secondary">
              {fallback || alt.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        {online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-accent-green border-2 border-background-primary"></span>
        )}
      </div>
    );
  };