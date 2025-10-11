"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

interface BaseDropdownProps {
  label: string;
  placeholder: string;
  children: ReactNode;
  className?: string;
  dropdownHeight?: number;
  isSelected?: boolean;
  isDefault?: boolean;
  enableScrolling?: boolean;
}

export function BaseDropdown({
  label,
  placeholder,
  children,
  className,
  dropdownHeight,
  isSelected = false,
  isDefault = false,
  enableScrolling = true,
}: BaseDropdownProps) {
  // dynamically set dropdown width = trigger width
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const shouldFloatLabel = isSelected || open;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button
            ref={triggerRef}
            className={cn(
              "flex w-full items-center justify-between rounded-[12px] border px-4 py-2 text-left shadow-sm hover:border-neutral-300 transition-all focus:outline-none h-[60px]",
              isSelected 
                ? "border-electric-violet-200 bg-electric-violet-50" 
                : "border-electric-violet-50 bg-white",
              className
            )}
          >
            <div className="flex flex-col text-start">
              <AnimatePresence mode="wait">
                {placeholder.toLowerCase().includes('show all') ? (
                  // If placeholder contains "Show all", show just the label name
                  <motion.span
                    key="default"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[15px] text-neutral-800 font-normal"
                  >
                    {label}
                  </motion.span>
                ) : (
                  // Selected state: show label above and value below with staggered animation
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
                      {label}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.2 }}
                      className="text-[15px] text-neutral-800 font-normal truncate"
                    >
                      {placeholder}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400 ml-2" />
          </button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        <DropdownMenuContent
          align="start"
          sideOffset={3}
          alignOffset={-4}
          asChild
          style={{ 
            width: width || 'auto',
            minWidth: width || 'auto',
            maxWidth: width || 'auto',
            maxHeight: dropdownHeight ? `${dropdownHeight}px` : undefined,
            left: 0,
            right: 0
          }}
          className="border-none bg-transparent shadow-none"
        >
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div 
              className={`rounded-[12px] border border-neutral-200 shadow-md w-full 
                ${enableScrolling ? '' : 'dropdown-scroll'}
                `}
              style={{
                maxHeight: dropdownHeight ? `${dropdownHeight}px` : undefined,
                overflowY: enableScrolling && dropdownHeight ? 'auto' : 'hidden',
                scrollbarWidth: enableScrolling ? 'thin' : 'none',
                scrollbarColor: enableScrolling ? '#a855f7 transparent' : 'transparent transparent',
              }}
            >
              <style jsx>{`
                ${enableScrolling ? `
                  /* 🔮 Minimal purple scrollbar (WebKit browsers) */
                  div::-webkit-scrollbar {
                      width: 6px;
                  }

                  div::-webkit-scrollbar-track {
                      background: transparent;
                  }

                  ::-webkit-scrollbar-button {
                    display: none; /* 🚫 hides the top/bottom arrows */
                    width: 0;
                    height: 0;
                  }

                  div::-webkit-scrollbar-thumb {
                      background-color: #a855f7; /* electric-violet-500 */
                      border-radius: 9999px;
                  }

                  div::-webkit-scrollbar-thumb:hover {
                      background-color: #9333ea; /* electric-violet-600 */
                  }

                  /* 🔮 Firefox support */
                  * {
                      scrollbar-width: thin;
                      scrollbar-color: #a855f7 transparent;
                  }
                ` : `
                  /* Hide scrollbar completely when scrolling is disabled */
                  div::-webkit-scrollbar {
                      display: none;
                      width: 0;
                      height: 0;
                  }

                  div {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                  }
                `}
              `}</style>
              <div className="">
                {children}
              </div>
            </div>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
