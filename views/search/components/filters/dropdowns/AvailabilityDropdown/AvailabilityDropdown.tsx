"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ShowResultsBtn from "../ShowResultsBtn";

import Times from "./Times";
import Days from "./Days";
import Calendar from "./Calendar";

export function AvailabilityDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Any availability");
  const [isMobile, setIsMobile] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // measure trigger width (desktop)
  useLayoutEffect(() => {
    if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth);
  }, [open]);

  const dropdownHeight = 280;

  const TriggerButton = (
    <button
      ref={triggerRef}
      onClick={() => isMobile && setOpen(true)}
      className={cn(
        "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[44px] lg:h-[56px]",
        selected !== "Any availability"
          ? "border-electric-violet-200 bg-electric-violet-50"
          : "border-electric-violet-50 bg-white"
      )}
    >
      <div className="flex flex-col text-start w-full">
        {isMobile ? (
          <span className="text-[15px] text-neutral-800 font-normal truncate">
            {selected === "Any availability" ? "Availability" : selected}
          </span>
        ) : selected === "Any availability" ? (
          <span className="text-[15px] text-neutral-800 font-normal">
            Availability
          </span>
        ) : (
          <div className="flex flex-col">
            <span className="text-[13px] text-[#7A5AF8] font-medium">
              Availability
            </span>
            <span className="text-[15px] text-neutral-800 font-normal truncate">
              {selected}
            </span>
          </div>
        )}
      </div>
      <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
    </button>
  );

  // ✅ MOBILE MODE → full-screen sheet
  if (isMobile) {
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

              {/* Fullscreen Sheet */}
              <motion.div
                className="fixed inset-0 bg-white z-50 flex flex-col h-screen"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
    
              >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className="text-neutral-900 text-title-1">Availability</h2>
                  <button onClick={() => setOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-4 dropdown-scroll">
                  <Times />
                  <Days />
                  <Calendar />
                  <ShowResultsBtn onClick={() => setOpen(false)}/>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // 💻 DESKTOP MODE
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
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="border border-neutral-50 rounded-[12px] bg-white shadow-md overflow-hidden inline-flex"
              >
                {/* Left Column */}
                <div className="flex flex-col border-r border-neutral-50 p-4">
                  <Times />
                  <Days />
                </div>
  
                {/* Right Column (Calendar) */}
                  <Calendar />
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
  
}
