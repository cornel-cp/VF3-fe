export const ProgressBar = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "primary",
  showValue = true,
  className = "",
  animated = true,
  ...props
}: {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "primary"
    | "gradient"
    | "success"
    | "warning"
    | "danger"
    | "cyber"
    | "neon";
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
    primary: "bg-primary shadow-glow",
    gradient:
      "bg-gradient-to-r from-primary via-highlight to-primary shadow-glow-lg",
    success: "bg-highlight shadow-glow-teal",
    warning: "bg-gradient-to-r from-primary to-primary/60 shadow-glow",
    danger: "bg-accent-red shadow-glow",
    cyber:
      "bg-gradient-to-r from-highlight via-primary to-highlight shadow-glow-xl animate-gradient",
    neon: "bg-primary shadow-glow-2xl animate-pulse-glow",
  };

  const animatedStyles = animated ? "transition-all duration-500 ease-out" : "";

  return (
    <div
      className={`w-full bg-background rounded-full border border-surface-elevated overflow-hidden ${sizes[size]} ${className}`}
      {...props}
    >
      <div
        className={`${sizes[size]} ${variants[variant]} ${animatedStyles} rounded-full relative overflow-hidden`}
        style={{ width: `${percentage}%` }}
      >
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full"></div>
        )}
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent rounded-full"></div>
        {/* Pulse overlay for neon effect */}
        {variant === "neon" && (
          <div className="absolute inset-0 bg-primary/30 animate-pulse rounded-full"></div>
        )}
      </div>
      {showValue && (
        <div className="text-xs text-primary mt-2 text-center font-mono font-bold drop-shadow-glow">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
