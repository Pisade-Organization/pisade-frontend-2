"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Typography from "./Typography";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, X } from "lucide-react";

// Props
interface BaseSelectProps {
  title?: string;
  titleColor?: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  inputBackground?: string;
}

export default function BaseSelect({
  title,
  titleColor,
  placeholder,
  required,
  errorMessage,
  options,
  value,
  onChange,
  inputBackground
}: BaseSelectProps) {
  const [openMobile, setOpenMobile] = useState(false);

  // current label
  const current = options.find((o) => o.value === value);
  return (
    // TODO: Parent div is still using mb-1, remove mb-1 and fix the problem that this not aligns with @BaseInput
    <div className="mb-1 w-full flex flex-col gap-1"> 
      {/* Label */}
      <div className="flex justify-start items-start gap-1">
        <Typography
          variant={{ base: "label-3", lg: "label-2" }}
          color={
            titleColor ? titleColor : "neutral-800"
          }
        >
          {title}
        </Typography>
        {required && (
          <Typography
            variant={{ base: "label-3", lg: "label-2" }}
            color="[#D9534F]"
          >
            *
          </Typography>
        )}
      </div>

      {/* DESKTOP: Shadcn dropdown */}
      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              inputBackground && `bg-${inputBackground}`,
              "w-full border border-neutral-50 rounded-[12px] py-3 px-4 flex justify-between items-center"
            )}
          >
            <Typography
              variant="body-3"
              color={value ? "neutral-700" : "neutral-300"}
            >
              {current?.label || placeholder}
            </Typography>
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
            align="start"
          >
            {options.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value); // ✅ update parent state
                }}
                className={cn(
                  "cursor-pointer",
                  value === opt.value && "bg-neutral-100" // highlight selected
                )}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>



      {/* MOBILE: Fullscreen overlay */}
      <div className="block lg:hidden">
        <button
          type="button"
          onClick={() => setOpenMobile(true)}
          className={cn(
            "w-full flex justify-between items-center py-3 px-4 gap-[10px] border border-neutral-50 rounded-[12px]"
          )}
        >
          <Typography
              variant="body-3"
              color={value ? "neutral-700" : "neutral-300"}
            >
            {current ? current.label : placeholder}
          </Typography>
          <ChevronDown className="h-4 w-4 text-neutral-400" />
        </button>

        <AnimatePresence>
          {openMobile && (
            <motion.div
              className="fixed inset-0 z-50 bg-white flex flex-col"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <Typography variant="title-2">Choose a country</Typography>
                <button type="button" onClick={() => setOpenMobile(false)}>
                  <X className="h-5 w-5 text-neutral-600" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.value);
                      setOpenMobile(false);
                    }}
                    className="w-full text-left px-4 py-3 border-b text-neutral-700 text-body-2"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error */}
      {errorMessage && (
        <Typography variant="body-4" className="text-[#D9534F]">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}
