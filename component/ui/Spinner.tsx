// Loading Spinner Component (Bonus)
export const Spinner = ({ 
    size = "md",
    variant = "primary",
    className = "",
    ...props 
  }: {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "cyber" | "neon";
    className?: string;
  }) => {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };
    
    const variants = {
      primary: "border-primary/30 border-t-primary shadow-glow",
      cyber: "border-highlight/30 border-t-highlight shadow-glow-teal",
      neon: "border-primary/20 border-t-primary shadow-glow-xl",
    };
    
    return (
      <div 
        className={`${sizes[size]} border-2 rounded-full animate-spin-glow ${variants[variant]} ${className}`}
        {...props}
      ></div>
    );
  };