import { ReactNode } from "react";

export const Container = ({ 
    children, 
    size = "default",
    center = true,
    className = "",
    ...props 
  }: {
    children: ReactNode;
    size?: "sm" | "default" | "lg" | "xl" | "full";
    center?: boolean;
    className?: string;
  }) => {
    const sizes = {
      sm: "max-w-2xl",
      default: "max-w-6xl",
      lg: "max-w-7xl",
      xl: "max-w-screen-2xl",
      full: "max-w-full",
    };
    
    const centerStyles = center ? "mx-auto" : "";
    
    return (
      <div 
        className={`w-full ${sizes[size]} ${centerStyles} px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };