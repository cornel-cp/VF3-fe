import { ReactNode } from "react";

export const Avatar = ({
  src,
  alt = "",
  size = "md",
  fallback,
  className = "",
  online = false,
  glow = false,
  ...props
}: {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  fallback?: string;
  className?: string;
  online?: boolean;
  glow?: boolean;
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
  const glowStyles = glow ? "shadow-glow" : "";

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      <div
        className={`${sizeClasses} rounded-full bg-surface-tertiary border-2 border-primary/30 overflow-hidden flex items-center justify-center ${glowStyles} transition-all duration-300`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="font-medium text-primary font-mono">
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-highlight border-2 border-background-primary shadow-glow-teal animate-pulse"></span>
      )}
    </div>
  );
};
