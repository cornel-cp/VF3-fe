import { ReactNode } from "react";

export const Container = ({
  children,
  size = "default",
  center = true,
  variant = "default",
  className = "",
  ...props
}: {
  children: ReactNode;
  size?: "sm" | "default" | "lg" | "xl" | "full";
  center?: boolean;
  variant?: "default" | "cyber" | "matrix";
  className?: string;
}) => {
  const sizes = {
    sm: "max-w-2xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    xl: "max-w-screen-2xl",
    full: "max-w-full",
  };

  const variants = {
    default: "",
    cyber: "border-l border-r border-primary/20 shadow-glow",
    matrix: "relative overflow-hidden",
  };

  const centerStyles = center ? "mx-auto" : "";

  return (
    <div
      className={`w-full ${sizes[size]} ${centerStyles} px-4 sm:px-6 lg:px-8 ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "matrix" && (
        <div className="absolute inset-0 bg-gradient-cyber opacity-5 animate-gradient"></div>
      )}
      {children}
    </div>
  );
};
