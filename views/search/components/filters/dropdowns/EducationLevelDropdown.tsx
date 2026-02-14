"use client";

import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveDropdown from "./ResponsiveDropdown";

const LEVELS = [
  "Show all educational levels",
  "Master’s Degree",
  "Teaching Certificate",
  "Doctorate (Ph.D. or Ed.D.)",
  "Bachelor’s Degree",
  "Senior / Master Teacher",
  "Experienced Teacher",
  "Teacher Leader",
];

export function EducationLevelDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Show all educational levels"]);

  const dropdownHeight = 280;
  const isShowAll =
    selected.length === 1 && selected[0] === "Show all educational levels";

  const toggleSelection = (item: string) => {
    if (item === "Show all educational levels") {
      setSelected(["Show all educational levels"]);
      return;
    }

    setSelected((prev) => {
      const filtered = prev.filter((s) => s !== "Show all educational levels");
      if (filtered.includes(item)) {
        const next = filtered.filter((s) => s !== item);
        return next.length === 0 ? ["Show all educational levels"] : next;
      } else {
        return [...filtered, item];
      }
    });
  };


  return (
    <ResponsiveDropdown
      title="Educational level"
      open={open}
      onOpenChange={setOpen}
      dropdownHeight={dropdownHeight}
      sheetMaxHeight={dropdownHeight + 120}
      trigger={({ isMobile, ref }) => (
        <button
          ref={ref}
          onClick={() => isMobile && setOpen(true)}
          className={cn(
            "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[44px] lg:h-[56px]",
            !isShowAll
              ? "border-electric-violet-200 bg-electric-violet-50"
              : "border-electric-violet-50 bg-white"
          )}
        >
          <div className="flex flex-col text-start w-full">
            <AnimatePresence mode="wait">
              {isMobile ? (
                <motion.span
                  key="mobile"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[15px] text-neutral-800 font-normal truncate"
                >
                  {isShowAll ? "Educational level" : selected.join(", ")}
                </motion.span>
              ) : isShowAll ? (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[15px] text-neutral-800 font-normal"
                >
                  Educational level
                </motion.span>
              ) : (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="text-[13px] text-[#7A5AF8] font-medium"
                  >
                    Educational level
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="text-[15px] text-neutral-800 font-normal truncate"
                  >
                    {selected.join(", ")}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
        </button>
      )}
    >
      {LEVELS.map((item) => (
        <button
          key={item}
          onClick={() => toggleSelection(item)}
          className={cn(
            "flex justify-between items-center w-full px-4 py-2 border-b text-[15px] text-left transition hover:bg-neutral-50",
            selected.includes(item)
              ? "bg-electric-violet-50 text-electric-violet-600 font-medium"
              : "text-neutral-700"
          )}
        >
          {item}
          <span
            className={cn(
              "w-4 h-4 rounded-[4px] border flex items-center justify-center transition",
              selected.includes(item)
                ? "bg-[#7A5AF8] border-[#7A5AF8]"
                : "border-neutral-300"
            )}
          >
            {selected.includes(item) && <Check className="w-3 h-3 text-white" />}
          </span>
        </button>
      ))}
    </ResponsiveDropdown>
  )
}
