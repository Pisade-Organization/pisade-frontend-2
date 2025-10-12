"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Show All",
  "Thai",
  "Maths",
  "English",
  "Biology",
  "Science",
  "Geology",
  "Medicine",
  "Chemistry",
  "Physics",
];

export function SubjectDropdown() {
  const [selected, setSelected] = useState("Show All");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

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

  // measure content (mobile)
  useLayoutEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  const isShowAll = selected === "Show All";
  const dropdownHeight = 260;

  const TriggerButton = (
    <button
      ref={triggerRef}
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
            // 📱 MOBILE — no floating label
            <motion.span
              key="mobile"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[15px] text-neutral-800 font-normal truncate"
            >
              {isShowAll ? "Subject" : selected}
            </motion.span>
          ) : isShowAll ? (
            // 💻 DESKTOP — default state
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[15px] text-neutral-800 font-normal"
            >
              Subject
            </motion.span>
          ) : (
            // 💻 DESKTOP — floating label state
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
                Subject
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
      <ChevronDown className="w-4 h-4 text-neutral-400 ml-2 flex-shrink-0" />
    </button>
  );

  // ✅ MOBILE MODE → bottom sheet
  if (isMobile) {
    const sheetHeight = Math.min(contentHeight + 60, dropdownHeight + 100);

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
              {/* Bottom sheet */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 flex flex-col overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0, height: sheetHeight }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className="font-semibold text-base">Subject</h2>
                  <button onClick={() => setOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div
                  ref={contentRef}
                  className="flex flex-col overflow-y-auto dropdown-scroll"
                >
                  {SUBJECTS.map((subject, index) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelected(subject);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex items-center w-full border-b px-4 py-2 text-[15px] text-left transition",
                        selected === subject
                          ? "bg-electric-violet-50 text-electric-violet-600 font-medium"
                          : "text-neutral-700 hover:bg-neutral-50"
                      )}
                    >
                      {subject}
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
                width: triggerWidth ? `${triggerWidth}px` : "auto",
                maxHeight: `${dropdownHeight}px`,
              }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="bg-white rounded-[12px] border border-neutral-200 shadow-md flex flex-col overflow-y-auto dropdown-scroll"
                style={{ maxHeight: `${dropdownHeight}px` }}
              >
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => {
                      setSelected(subject);
                      setOpen(false);
                    }}
                    className={cn(
                      "h-full flex items-center w-full border-b px-4 py-2 text-[15px] text-left transition",
                      selected === subject
                        ? "bg-electric-violet-50 text-electric-violet-600 font-medium"
                        : "text-neutral-700 hover:bg-neutral-50"
                    )}
                  >
                    {subject}
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
