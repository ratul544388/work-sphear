import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Dropdown = ({
  items = [],
  children,
  showArrowIcon = true,
  className = "",
  variant = "outline",
  size = "default",
}) => {
  const [open, setOpen] = useState(false);
  const showChecked = items.some((item) => item.checked !== undefined);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children}
          {showArrowIcon && (
            <ChevronDown
              className={cn(
                "transition ease-in",
                open && "rotate-180"
              )}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-2 flex flex-col w-fit">
        {items.map(({ label, icon: Icon, checked, onClick }) => (
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            key={label}
            className={cn(
              "relative justify-start px-6 rounded-none",
              showChecked && "pl-7!"
            )}
            variant="ghost"
          >
            {showChecked && (
              <Check
                className={cn(
                  "size-4 absolute left-1.5 text-muted-foreground opacity-0 transition-opacity",
                  checked && "opacity-100"
                )}
              />
            )}
            {Icon && <Icon className="size-4" />}
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
