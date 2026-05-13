"use client"

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Typography from "@/components/base/Typography"
import { X } from "lucide-react"
import Image from "next/image"
import BaseButton from "@/components/base/BaseButton"
import { cn } from "@/lib/utils"
const DEFAULT_AVATAR_URL = "/images/avatars/default-avatar.svg"

export type EventCardClickPopoverData = {
  lessonTitle: string
  date: string
  time: string
  status: string
  timezone: string
  studentProfilePicture: string | null
  studentName: string
  tutorProfilePicture: string | null
  tutorName: string
}

type EventCardClickPopoverProps = {
  children: ReactNode
  data: EventCardClickPopoverData
  content?: ReactNode
  canJoinClass?: boolean
  canReschedule?: boolean
  canCancel?: boolean
  canRequestRefund?: boolean
  canComplete?: boolean
  onJoinClass?: () => void
  onReschedule?: () => void
  onCancel?: () => void
  onRequestRefund?: () => void
  onComplete?: () => void
}

export default function EventCardClickPopover({
  children,
  data,
  content,
  canJoinClass = false,
  canReschedule = false,
  canCancel = false,
  canRequestRefund = false,
  canComplete = false,
  onJoinClass,
  onReschedule,
  onCancel,
  onRequestRefund,
  onComplete,
}: EventCardClickPopoverProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [mobileMounted, setMobileMounted] = useState(false)
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const syncIsMobile = () => setIsMobile(mediaQuery.matches)

    syncIsMobile()
    mediaQuery.addEventListener("change", syncIsMobile)

    return () => mediaQuery.removeEventListener("change", syncIsMobile)
  }, [])

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  useEffect(() => {
    if (!isMobile) {
      setMobileMounted(false)
      return
    }

    if (open) {
      setMobileMounted(true)
    }
  }, [isMobile, open])

  const handleTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const normalizedStatus = data.status.trim().toLowerCase()
  const displayStatus = normalizedStatus === "confirmed" ? "Booked" : data.status
  const statusBadgeClassName =
    displayStatus === "Booked"
      ? "bg-[#EFF4FF]"
      : normalizedStatus === "upcoming"
        ? "bg-electric-violet-25"
        : normalizedStatus === "in-progress"
          ? "bg-green-light"
        : normalizedStatus === "processing"
          ? "bg-orange-light"
        : normalizedStatus === "cancelled" || normalizedStatus === "cancel"
          ? "bg-[#FFF1F2]"
          : ""
  const statusTextColor =
    normalizedStatus === "upcoming"
      ? "electric-violet-400"
      : normalizedStatus === "in-progress"
        ? "green-normal"
      : normalizedStatus === "processing"
        ? "orange-normal"
      : normalizedStatus === "cancelled" || normalizedStatus === "cancel"
        ? "red-normal"
        : "blue-normal"
  const isCancelled = normalizedStatus === "cancelled" || normalizedStatus === "cancel"
  const leftActionLabel = isCancelled ? "Request Refund" : "Cancel"
  const leftActionTextColor = isCancelled ? "deep-royal-indigo-700" : "red-normal"
  const isInProgress = normalizedStatus === "in-progress"
  const showJoinClass = normalizedStatus === "upcoming" || isInProgress
  const isProcessing = normalizedStatus === "processing"
  const studentAvatarSrc = data.studentProfilePicture || DEFAULT_AVATAR_URL
  const tutorAvatarSrc = data.tutorProfilePicture || DEFAULT_AVATAR_URL
  const formatTimezoneLabel = (timezone: string) => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        timeZoneName: "shortOffset",
      }).formatToParts(new Date())
      const rawOffset = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+0"
      const normalizedOffset = rawOffset.replace(/^GMT/, "ETC/GMT")
      return `${timezone} (${normalizedOffset})`
    } catch {
      return timezone
    }
  }
  const timezoneLabel = formatTimezoneLabel(data.timezone)
  const handleAction = (callback?: () => void, enabled = true) => {
    if (!callback || !enabled) {
      return
    }

    setOpen(false)
    callback()
  }

  const defaultContent = (
    <>
      {/* Section 1 - Class Info */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Typography variant={{ base: 'headline-5' }} color='neutral-900'> 
            {data.lessonTitle}
          </Typography>

          <button type="button" aria-label="Close popover" onClick={() => setOpen(false)} className="cursor-pointer">
            <X className="w-6 h-6 text-neutral-200" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <Typography variant={{ base: 'body-2' }} color='neutral-400'>{data.date}, {data.time}</Typography>
            <div className={`py-0.5 px-2 rounded-[4px] ${statusBadgeClassName}`}>
              <Typography variant="label-4" color={statusTextColor}>{displayStatus}</Typography>
            </div>
          </div>

          <Typography variant="body-2" color="neutral-400">{timezoneLabel}</Typography>
          <Typography variant="body-2" color="neutral-400">50-min lessons</Typography>
        </div>          

        {showJoinClass ? (
          <BaseButton
            variant="primary"
            typeStyle="default"
            className="w-full"
            onClick={() => handleAction(onJoinClass, canJoinClass)}
            disabled={!canJoinClass}
          >
            Join Class
          </BaseButton>
        ) : null}

        {isProcessing ? (
          <BaseButton
            variant="secondary"
            typeStyle="outline"
            className="w-full"
            onClick={() => handleAction(onReschedule, canReschedule)}
            disabled={!canReschedule}
          >
            <Typography variant="label-3" color="deep-royal-indigo-700" className="group-hover:!text-white">
              Reschedule
            </Typography>
          </BaseButton>
        ) : null}
      </div>

      <div className="w-full border-t border-[#CECECE] border-opacity-50" />

      <div className="flex flex-col gap-2">
        <Typography variant="title-2" color="neutral-900">Guests</Typography>
        <div className="flex gap-2.5">
          <Image 
            src={studentAvatarSrc}
            alt="Student Profile Picture"
            width={28}
            height={28}
            className="rounded-full"
          />
          <Typography variant="body-2" color="neutral-500">
            {data.studentName}
          </Typography>
        </div>

        <div className="flex gap-2.5">
          <Image 
            src={tutorAvatarSrc}
            alt="Tutor Profile Picture"
            width={28}
            height={28}
            className="rounded-full"
          />
          <Typography variant="body-2" color="neutral-500">
            {data.tutorName}
          </Typography>
          <div className="py-0.5 px-2 rounded-[4px] bg-electric-violet-25">
            <Typography variant="label-3" color="electric-violet-400">Tutor</Typography>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[#CECECE] border-opacity-50" />

      <div className="flex justify-between items-center">
        {!isInProgress ? (
          <BaseButton
            variant="secondary"
            typeStyle="borderless"
            onClick={() => handleAction(isCancelled ? onRequestRefund : onCancel, isCancelled ? canRequestRefund : canCancel)}
            disabled={isCancelled ? !canRequestRefund : !canCancel}
          >
            <Typography variant="label-3" color={leftActionTextColor}>{leftActionLabel}</Typography>
          </BaseButton>
        ) : (
          <div />
        )}

        {isInProgress ? (
          <BaseButton
            variant="secondary"
            typeStyle="outline"
            onClick={() => handleAction(onComplete, canComplete)}
            disabled={!canComplete}
          >
            <Typography variant="label-3" color="deep-royal-indigo-700" className="group-hover:!text-white">
              Completed
            </Typography>
          </BaseButton>
        ) : (
          <BaseButton
            variant="secondary"
            typeStyle="outline"
            onClick={() => handleAction(onReschedule, canReschedule)}
            disabled={!canReschedule}
          >
            <Typography variant="label-3" color="deep-royal-indigo-700" className="group-hover:!text-white">
              Reschedule
            </Typography>
          </BaseButton>
        )}
      </div>
    </>
  )

  const popoverContent = content ?? defaultContent

  if (isMobile) {
    return (
      <Dialog open={mobileMounted} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div ref={triggerRef} className="flex h-full flex-1 cursor-pointer" onClick={handleTriggerClick}>
            {children}
          </div>
        </DialogTrigger>
        <DialogPortal>
          <AnimatePresence>
            {mobileMounted ? (
              <>
                <DialogOverlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: open ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </DialogOverlay>
                <DialogPrimitive.Content asChild forceMount>
                  <motion.div
                    className={cn(
                      "fixed inset-x-0 bottom-0 z-50 w-full rounded-t-[20px] border border-neutral-50 bg-white p-5 shadow-lg outline-none",
                    )}
                    initial={{ y: "100%" }}
                    animate={{ y: open ? 0 : "100%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={() => {
                      if (!open) {
                        setMobileMounted(false)
                      }
                    }}
                  >
                    <DialogTitle className="sr-only">{data.lessonTitle}</DialogTitle>
                    <div className="flex flex-col gap-4">
                      {popoverContent}
                    </div>
                  </motion.div>
                </DialogPrimitive.Content>
              </>
            ) : null}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    )
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className="flex h-full flex-1" onClick={handleTriggerClick}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverAnchor asChild>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed h-0 w-0"
          style={{ left: anchorPosition.x, top: anchorPosition.y }}
        />
      </PopoverAnchor>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={12}
        className="w-95 p-5 flex flex-col gap-4 bg-white rounded-[15px]"
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  )
}
