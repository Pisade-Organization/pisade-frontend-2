"use client"

import { MessageCircle, Bell } from "lucide-react"
import type { DashboardNavbarVariant } from "./types"

interface DashboardActionsProps {
  variant?: DashboardNavbarVariant
  onMessagesClick?: () => void
}

export default function DashboardActions({ variant, onMessagesClick }: DashboardActionsProps) {
  const iconButtonClass =
    variant === "student_dashboard"
      ? "w-11 h-11 flex items-center justify-center"
      : "flex items-center justify-center"

  return (
    <div className="flex items-center gap-3">
      <button className={iconButtonClass} onClick={onMessagesClick} aria-label="Messages">
        <MessageCircle size={22} className="text-neutral-700" />
      </button>
      <button className={iconButtonClass} aria-label="Notifications">
        <Bell size={22} className="text-neutral-700" />
      </button>
    </div>
  )
}
