"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PriceRangeSlider from "./PriceRangeSlider";
import ShowResultsBtn from "./dropdowns/ShowResultsBtn";

export default function PriceRangeFilter({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  minPrice: number;
  setMinPrice: (minPrice: number) => void;
  maxPrice: number;
  setMaxPrice: (maxPrice: number) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // measure content (for mobile sheet height)
  useLayoutEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  const ABS_MIN = 3;
  const ABS_MAX = 50;

  // Trigger button (mobile)
  const TriggerButton = (
    <button
      onClick={() => isMobile && setOpen(true)}
      className={cn(
        "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[44px] lg:h-[56px]",
        minPrice !== ABS_MIN || maxPrice !== ABS_MAX
          ? "border-electric-violet-200 bg-electric-violet-50"
          : "border-electric-violet-50 bg-white"
      )}
    >
      <span className="text-[15px] text-neutral-800 font-normal truncate">
        {minPrice === ABS_MIN && maxPrice === ABS_MAX
          ? "Price range"
          : `$${minPrice} – $${maxPrice}`}
      </span>
      <ChevronDown className="w-4 h-4 text-neutral-400 ml-2 flex-shrink-0" />
    </button>
  );

  // ✅ MOBILE → bottom sheet
  if (isMobile) {
    const sheetHeight = Math.min(contentHeight + 100, 360);

    return (
      <>
        {TriggerButton}
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
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
                  <h2 className="text-neutral-900 text-title-1">Price range</h2>
                  <button onClick={() => setOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div ref={contentRef} className="px-6 py-6 flex flex-col gap-6">
                  <PriceRangeSlider
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                  />
                  <ShowResultsBtn onClick={() => setOpen(false)} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // 💻 DESKTOP → inline filter
  return (
    <div className="col-span-2 w-full flex items-center border border-[#F1F1F1] py-2 px-5 gap-x-4 rounded-[12px] h-[44px] lg:h-[60px]">
      <div className="text-neutral-700 text-body-2">Price range</div>

      <div className="flex-1 min-w-0">
        <PriceRangeSlider
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
    </div>
  );
}
