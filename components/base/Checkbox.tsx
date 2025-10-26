"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseCheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "onCheckedChange" | "onChange"
  > {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  BaseCheckboxProps
>(({ defaultChecked = false, onChange, className, ...props }, ref) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange?.(value);
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={handleChange}
      className={cn(
        "flex items-center justify-center rounded-md transition-colors",
        // sizes
        "h-5 w-5 lg:h-6 lg:w-6",
        // false state
        !checked && "border border-neutral-100 bg-transparent",
        // true state
        checked && "border border-electric-violet-500 bg-electric-violet-500",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

BaseCheckbox.displayName = "BaseCheckbox";
