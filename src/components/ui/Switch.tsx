export const Switch = ({ 
    checked = false,
    onChange,
    size = "md",
    className = "",
    disabled = false,
    ...props 
  }: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: "sm" | "md" | "lg";
    className?: string;
    disabled?: boolean;
  }) => {
    const sizes = {
      sm: "w-8 h-4",
      md: "w-11 h-6",
      lg: "w-14 h-8",
    };
    
    const thumbSizes = {
      sm: "w-3 h-3",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };
    
    const translateX = {
      sm: checked ? "translate-x-4" : "translate-x-0",
      md: checked ? "translate-x-5" : "translate-x-0",
      lg: checked ? "translate-x-6" : "translate-x-0",
    };
    
    return (
      <button
        type="button"
        className={`${sizes[size]} relative inline-flex items-center rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-primary ${
          checked 
            ? "border-primary shadow-glow" 
            : "border-surface-elevated"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        {...props}
      >
        <span
          className={`${thumbSizes[size]} inline-block rounded-full transition-transform duration-200 ease-in-out ${
            checked 
              ? `${translateX[size]} bg-primary shadow-glow` 
              : "translate-x-0 bg-text-muted"
          }`}
        />
      </button>
    );
  };