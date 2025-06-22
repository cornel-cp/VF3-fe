import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Input = ({ 
    type = "text", 
    variant = "default",
    inputSize = "md",
    className = "",
    error = false,
    ...props 
  }: InputProps) => {
    const baseStyles = "w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary placeholder-text-muted";
    
    const variants = {
      default: "bg-surface-secondary border-surface-elevated text-text-primary focus:ring-primary-600/50 focus:border-primary-600",
      filled: "bg-surface-tertiary border-transparent text-text-primary focus:bg-surface-secondary focus:ring-primary-600/50 focus:border-primary-600",
    };
    
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };
    
    const errorStyles = error ? "border-accent-red focus:ring-accent-red/50 focus:border-accent-red" : "";
    
    return (
      <input 
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${errorStyles} ${className}`}
        {...props}
      />
    );
  }; 