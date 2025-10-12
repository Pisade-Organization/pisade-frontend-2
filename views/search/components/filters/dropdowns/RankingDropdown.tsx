"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // measure content for sheet auto height
  useLayoutEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  const isShowAll = selected === "Show all in this ranking";
  const dropdownWidth = 311;
  const dropdownHeight = 400;

  const TriggerButton = (
    <button
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
            // 📱 MOBILE — no floating label
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
            // 💻 DESKTOP — default
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
            // 💻 DESKTOP — floating label + selected
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
  );

  // ✅ MOBILE MODE
  if (isMobile) {
    const sheetHeight = Math.min(contentHeight + 60, dropdownHeight);
    return (
      <>
        {TriggerButton}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Sheet */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 flex flex-col overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0, height: sheetHeight }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className="font-semibold text-base">Tutor Ranking</h2>
                  <button onClick={() => setOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div ref={contentRef} className="flex flex-col overflow-y-auto dropdown-scroll">
                  {RANKINGS.map((ranking) => (
                    <button
                      key={ranking.id}
                      onClick={() => {
                        setSelected(ranking.name);
                        setOpen(false);
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
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // 💻 DESKTOP MODE
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
              style={{
                width: `${dropdownWidth}px`,
                maxHeight: `${dropdownHeight}px`,
              }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="bg-white rounded-[12px] border border-neutral-200 shadow-md overflow-y-auto dropdown-scroll"
                style={{ maxHeight: `${dropdownHeight}px` }}
              >
                {RANKINGS.map((ranking) => (
                  <button
                    key={ranking.id}
                    onClick={() => {
                      setSelected(ranking.name);
                      setOpen(false);
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
              </div>

              {/* ✅ Purple scrollbar */}
              <style jsx>{`
                .dropdown-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .dropdown-scroll::-webkit-scrollbar-thumb {
                  background-color: #a855f7;
                  border-radius: 9999px;
                }
                .dropdown-scroll::-webkit-scrollbar-thumb:hover {
                  background-color: #9333ea;
                }
                .dropdown-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #a855f7 transparent;
                }
              `}</style>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
