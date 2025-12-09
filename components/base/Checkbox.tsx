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
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  BaseCheckboxProps
>(({ defaultChecked = false, checked: controlledChecked, onChange, className, ...props }, ref) => {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
  
  // Use controlled checked if provided, otherwise use uncontrolled state
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleChange = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledChecked(value);
    }
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
