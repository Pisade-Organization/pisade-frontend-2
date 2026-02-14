"use client"

import type { ReactElement, ReactNode, Ref } from "react"
import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useMediaQuery from "@/hooks/useMediaQuery"

type TriggerRenderer = (args: {
  isMobile: boolean
  ref: Ref<HTMLButtonElement>
  open: boolean
}) => ReactElement

interface ResponsiveDropdownProps {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  dropdownHeight?: number
  sheetExtraHeight?: number
  sheetMaxHeight?: number
  trigger: TriggerRenderer
  desktopContentClassName?: string
  mobileContentClassName?: string
  titleClassName?: string
  children: ReactNode
}

export default function ResponsiveDropdown({
  title,
  open,
  onOpenChange,
  dropdownHeight = 260,
  sheetExtraHeight = 60,
  sheetMaxHeight,
  trigger,
  desktopContentClassName,
  mobileContentClassName,
  titleClassName,
  children,
}: ResponsiveDropdownProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMobile = !isDesktop

  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [triggerWidth, setTriggerWidth] = useState<number | null>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    if (!open) return
    if (!triggerRef.current) return
    setTriggerWidth(triggerRef.current.offsetWidth)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    if (!isMobile) return
    if (!contentRef.current) return
    setContentHeight(contentRef.current.scrollHeight)
  }, [open, isMobile])

  const effectiveSheetMaxHeight = sheetMaxHeight ?? dropdownHeight + 120
  const sheetHeight = useMemo(() => {
    return Math.min(contentHeight + sheetExtraHeight, effectiveSheetMaxHeight)
  }, [contentHeight, sheetExtraHeight, effectiveSheetMaxHeight])

  const TriggerButton = trigger({ isMobile, ref: triggerRef, open })

  if (isMobile) {
    return (
      <>
        {TriggerButton}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => onOpenChange(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 flex flex-col overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0, height: sheetHeight }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className={titleClassName ?? "text-neutral-900 text-title-1"}>{title}</h2>
                  <button onClick={() => onOpenChange(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div
                  ref={contentRef}
                  className={
                    mobileContentClassName ??
                    "flex flex-col overflow-y-auto dropdown-scroll"
                  }
                >
                  {children}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
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
                className={
                  desktopContentClassName ??
                  "bg-white rounded-[12px] border border-neutral-200 shadow-md overflow-y-auto dropdown-scroll"
                }
                style={{ maxHeight: `${dropdownHeight}px` }}
              >
                {children}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  )
}
