import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

export const LoadingButton = ({
  isLoading,
  size,
  variant,
  disabled,
  className,
  onClick,
  children,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isLoading || disabled}
      className={cn("relative overflow-hidden font-semibold w-fit", className)}
      onClick={onClick}
    >
      <span className={cn('flex items-center gap-2', isLoading && "opacity-0")}>{children}</span>
      <span
        className={cn(
          "absolute items-center justify-center inset-0 hidden",
          isLoading && "flex"
        )}
      >
        <Loader className="size-4 animate-spin" />
      </span>
    </Button>
  );
};
