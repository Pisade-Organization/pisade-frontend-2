"use client"

import { MessageCircle } from "lucide-react"
import type { DashboardNavbarVariant } from "./types"
import NotificationsPopover from "./shared/NotificationsPopover"

interface DashboardActionsProps {
  variant?: DashboardNavbarVariant
  onMessagesClick?: () => void
}

export default function DashboardActions({ variant, onMessagesClick }: DashboardActionsProps) {
  const iconButtonClass =
    variant === "student_dashboard" || variant === "tutor_dashboard"
      ? "w-11 h-11 flex cursor-pointer items-center justify-center"
      : "flex cursor-pointer items-center justify-center"

  return (
    <div className="flex items-center gap-3">
      <button className={iconButtonClass} onClick={onMessagesClick} aria-label="Messages">
        <MessageCircle size={22} className="text-neutral-700" />
      </button>
      <NotificationsPopover iconButtonClass={iconButtonClass} />
    </div>
  )
}
