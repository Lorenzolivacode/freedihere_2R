type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full animate-spin`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)",
        borderTopColor: "var(--color-primary)",
      }}
    />
  );
}
