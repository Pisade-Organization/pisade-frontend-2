"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface BaseSwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    "onCheckedChange" | "onChange"
  > {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const BaseSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  BaseSwitchProps
>(({ defaultChecked = false, onChange, className, ...props }, ref) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange?.(value);
  };

  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={handleChange}
      className={cn(
        "relative inline-flex items-center w-8 h-5 shrink-0 cursor-pointer rounded-full border border-neutral-200 transition-colors",
        !checked && "bg-neutral-200",
        checked && "bg-electric-violet-500 border-electric-violet-500",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[13px]" : "translate-x-[1px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
});

BaseSwitch.displayName = "BaseSwitch";
