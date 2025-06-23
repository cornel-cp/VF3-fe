import { ReactNode, ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  glow = false,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed btn-hover";

  const variants = {
    primary:
      "bg-primary hover:bg-primary/90 text-background focus:ring-primary shadow-glow hover:shadow-glow-lg",
    secondary:
      "bg-surface-secondary hover:bg-surface-tertiary text-primary border border-surface-elevated hover:border-primary/50",
    ghost:
      "text-text-secondary hover:text-primary hover:bg-surface-secondary hover:shadow-glow",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-background hover:shadow-glow",
    gradient:
      "bg-gradient-cyber text-primary hover:shadow-glow-lg animate-gradient",
    cyber:
      "bg-highlight hover:bg-highlight/90 text-background focus:ring-highlight shadow-glow-teal hover:shadow-glow-teal-lg",
    neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background shadow-glow hover:shadow-glow-xl animate-flicker",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const glowStyles = glow
    ? "shadow-glow hover:shadow-glow-xl animate-pulse-glow"
    : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin-glow -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
