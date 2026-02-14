"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ResponsiveDropdown from "./ResponsiveDropdown";

const RANKINGS = [
  {
    id: "show_all",
    name: "Show all in this ranking",
    description: "",
    icon: "",
  },
  {
    id: "starter",
    name: "Starter",
    description: "Building hours and getting initial ratings.",
    icon: "images/search/tutor-ranking/starter",
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "High ratings, reliable. Lower commission and better visibility.",
    icon: "images/search/tutor-ranking/pro",
  },
  {
    id: "master",
    name: "Master",
    description:
      "Top ratings, high volume. Lowest commission and maximum search boost.",
    icon: "images/search/tutor-ranking/master",
  },
];

export function RankingDropdown() {
  const [selected, setSelected] = useState("Show all in this ranking");
  const [open, setOpen] = useState(false);

  const isShowAll = selected === "Show all in this ranking";
  const dropdownHeight = 400;

  return (
    <ResponsiveDropdown
      title="Tutor Ranking"
      titleClassName="font-semibold text-base"
      open={open}
      onOpenChange={setOpen}
      dropdownHeight={dropdownHeight}
      sheetMaxHeight={dropdownHeight}
      trigger={({ isMobile, ref }) => (
        <button
          ref={ref}
          onClick={() => isMobile && setOpen(true)}
          className={cn(
            "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[44px] lg:h-[60px]",
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
                  {isShowAll ? "Tutor Ranking" : selected}
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
                  Tutor Ranking
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
                    Tutor Ranking
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="text-[15px] text-neutral-800 font-normal truncate"
                  >
                    {selected}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
        </button>
      )}
    >
      {RANKINGS.map((ranking) => (
        <button
          key={ranking.id}
          onClick={() => {
            setSelected(ranking.name)
            setOpen(false)
          }}
          className={cn(
            "flex items-start w-full border-b px-4 py-3 text-left transition",
            selected === ranking.name
              ? "bg-electric-violet-50 text-electric-violet-600"
              : "text-neutral-700 hover:bg-neutral-50"
          )}
        >
          <div className="flex items-start gap-3 w-full">
            {ranking.icon && (
              <div className="flex-shrink-0 mt-1">
                <Image
                  src={`/${ranking.icon}.svg`}
                  alt={`${ranking.name} ranking icon`}
                  width={40}
                  height={40}
                />
              </div>
            )}
            <div className="flex flex-col text-left">
              <span
                className={cn(
                  "font-semibold text-sm",
                  selected === ranking.name
                    ? "text-electric-violet-600"
                    : "text-neutral-900"
                )}
              >
                {ranking.name}
              </span>
              {ranking.description && (
                <span className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {ranking.description}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </ResponsiveDropdown>
  )
}
