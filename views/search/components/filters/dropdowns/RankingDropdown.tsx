"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import ResponsiveDropdown from "./ResponsiveDropdown";

const RANKING_IDS = ["show_all", "starter", "pro", "master"] as const;
type RankingId = typeof RANKING_IDS[number];

const RANKING_VALUE: Record<RankingId, string> = {
  show_all: "Show all in this ranking",
  starter: "Starter",
  pro: "Pro",
  master: "Master",
};

const RANKING_ICONS: Record<RankingId, string> = {
  show_all: "",
  starter: "images/search/tutor-ranking/starter",
  pro: "images/search/tutor-ranking/pro",
  master: "images/search/tutor-ranking/master",
};

interface RankingDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function RankingDropdown({ value, onChange }: RankingDropdownProps) {
  const t = useTranslations("search.filters");
  const [open, setOpen] = useState(false);

  const isShowAll = value === RANKING_VALUE.show_all;
  const dropdownHeight = 400;

  const getDisplayName = (id: RankingId): string => {
    if (id === "show_all") return t("showAllRankings");
    return t(`${id}.name`);
  };

  const getDescription = (id: RankingId): string => {
    if (id === "show_all") return "";
    return t(`${id}.description`);
  };

  return (
    <ResponsiveDropdown
      title={t("tutorRanking")}
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
                  {isShowAll ? t("tutorRanking") : value}
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
                  {t("tutorRanking")}
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
                    {t("tutorRanking")}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="text-[15px] text-neutral-800 font-normal truncate"
                  >
                    {value}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
        </button>
      )}
    >
      {RANKING_IDS.map((id) => {
        const rankValue = RANKING_VALUE[id];
        const icon = RANKING_ICONS[id];
        const displayName = getDisplayName(id);
        const description = getDescription(id);
        return (
          <button
            key={id}
            onClick={() => {
              onChange(rankValue)
              setOpen(false)
            }}
            className={cn(
              "flex items-start w-full border-b px-4 py-3 text-left transition",
              value === rankValue
                ? "bg-electric-violet-50 text-electric-violet-600"
                : "text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <div className="flex items-start gap-3 w-full">
              {icon && (
                <div className="flex-shrink-0 mt-1">
                  <Image
                    src={`/${icon}.svg`}
                    alt={`${displayName} ranking icon`}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    "font-semibold text-sm",
                    value === rankValue
                      ? "text-electric-violet-600"
                      : "text-neutral-900"
                  )}
                >
                  {displayName}
                </span>
                {description && (
                  <span className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {description}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </ResponsiveDropdown>
  )
}
