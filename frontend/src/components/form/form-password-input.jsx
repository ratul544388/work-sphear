"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function FormPasswordInput({
  control,
  name,
  label,
  placeholder,
  disabled,
}) {
  const [type, setType] = useState("password");

  const EyeIcon = type === "password" ? Eye : EyeOff;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label || name}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                disabled={disabled}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
              <div
                role="button"
                onClick={() =>
                  setType((prev) => (prev === "password" ? "text" : "password"))
                }
                className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 rounded-full hover:bg-accent transition-colors cursor-pointer"
              >
                <EyeIcon className="size-4" />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
