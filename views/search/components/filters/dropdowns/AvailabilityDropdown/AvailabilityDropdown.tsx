"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ShowResultsBtn from "../ShowResultsBtn";
import useMediaQuery from "@/hooks/useMediaQuery";

const DAYS = [
  { short: "Mon", value: "Monday" },
  { short: "Tue", value: "Tuesday" },
  { short: "Wed", value: "Wednesday" },
  { short: "Thu", value: "Thursday" },
  { short: "Fri", value: "Friday" },
  { short: "Sat", value: "Saturday" },
  { short: "Sun", value: "Sunday" },
] as const;

const TIME_SLOTS = [
  { label: "00:00 - 03:00", start: "00:00" },
  { label: "03:00 - 06:00", start: "03:00" },
  { label: "06:00 - 09:00", start: "06:00" },
  { label: "09:00 - 12:00", start: "09:00" },
  { label: "13:00 - 15:00", start: "13:00" },
  { label: "15:00 - 18:00", start: "15:00" },
  { label: "18:00 - 21:00", start: "18:00" },
  { label: "21:00 - 24:00", start: "21:00" },
] as const;

export type AvailabilityFilterValue = {
  day: string;
  start: string;
} | null;

interface AvailabilityDropdownProps {
  value: AvailabilityFilterValue;
  onChange: (value: AvailabilityFilterValue) => void;
}

export function AvailabilityDropdown({ value, onChange }: AvailabilityDropdownProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMobile = !isDesktop

  const selectedLabel = value
    ? `${DAYS.find((day) => day.value === value.day)?.short ?? value.day} ${TIME_SLOTS.find((slot) => slot.start === value.start)?.label ?? value.start}`
    : "Any availability";

  const toggleDay = (day: string) => {
    if (value?.day === day) {
      onChange(null);
      return;
    }

    onChange({
      day,
      start: value?.start ?? TIME_SLOTS[2].start,
    });
  };

  const toggleTime = (start: string) => {
    if (value?.start === start) {
      onChange(null);
      return;
    }

    onChange({
      day: value?.day ?? DAYS[0].value,
      start,
    });
  };

  const Content = (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <div className="text-neutral-900 text-label-2">Days</div>
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-7">
          {DAYS.map((day) => (
            <button
              key={day.value}
              onClick={() => toggleDay(day.value)}
              className={cn(
                "rounded-[12px] border px-3 py-2 text-label-3 transition",
                value?.day === day.value
                  ? "border-electric-violet-500 bg-electric-violet-50 text-electric-violet-600"
                  : "border-neutral-100 text-neutral-500 hover:border-neutral-300",
              )}
            >
              {day.short}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-neutral-900 text-label-2">Times</div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.start}
              onClick={() => toggleTime(slot.start)}
              className={cn(
                "rounded-[12px] border px-3 py-2 text-left text-label-3 transition",
                value?.start === slot.start
                  ? "border-electric-violet-500 bg-electric-violet-50 text-electric-violet-600"
                  : "border-neutral-100 text-neutral-500 hover:border-neutral-300",
              )}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const TriggerButton = (
    <button
      onClick={() => isMobile && setOpen(true)}
      className={cn(
        "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[44px] lg:h-[56px]",
        value
          ? "border-electric-violet-200 bg-electric-violet-50"
          : "border-electric-violet-50 bg-white"
      )}
    >
      <div className="flex flex-col text-start w-full">
        {isMobile ? (
          <span className="text-[15px] text-neutral-800 font-normal truncate">
            {value ? selectedLabel : "Availability"}
          </span>
        ) : !value ? (
          <span className="text-[15px] text-neutral-800 font-normal">
            Availability
          </span>
        ) : (
          <div className="flex flex-col">
            <span className="text-[13px] text-[#7A5AF8] font-medium">
              Availability
            </span>
            <span className="text-[15px] text-neutral-800 font-normal truncate">
              {selectedLabel}
            </span>
          </div>
        )}
      </div>
      <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
    </button>
  );

  if (isMobile) {
    return (
      <>
        {TriggerButton}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="fixed inset-0 bg-white z-50 flex flex-col h-screen"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className="text-neutral-900 text-title-1">Availability</h2>
                  <button onClick={() => setOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 dropdown-scroll">
                  {Content}
                  <ShowResultsBtn onClick={() => setOpen(false)} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{TriggerButton}</DropdownMenuTrigger>
      <AnimatePresence>
        {open && (
          <DropdownMenuContent
            forceMount
            align="start"
            sideOffset={3}
            alignOffset={-4}
            className="border-none bg-transparent shadow-none p-0"
          >
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <div className="border border-neutral-50 rounded-[12px] bg-white shadow-md overflow-hidden max-w-[520px]">
                {Content}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
