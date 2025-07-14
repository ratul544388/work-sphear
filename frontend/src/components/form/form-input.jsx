import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function FormInput({
  control,
  name = "",
  label = "",
  placeholder = "",
  type = "text",
  disabled,
  autoFocus,
  description = "",
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label || name}</FormLabel>
          <FormControl>
            <Input
              type={type}
              disabled={disabled}
              value={field.value || ""}
              onChange={field.onChange}
              autoFocus={autoFocus}
              placeholder={placeholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
