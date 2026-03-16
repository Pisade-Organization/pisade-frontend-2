import { Bell, MessageCircle } from "lucide-react"

import MobileMenu from "../../MobileMenu/MobileMenu"
import type { DashboardNavbarVariant } from "../types"

interface DashboardMobileActionsProps {
  variant: DashboardNavbarVariant
  onMessagesClick: () => void
}

export default function DashboardMobileActions({ variant, onMessagesClick }: DashboardMobileActionsProps) {
  return (
    <div className="lg:hidden flex items-center gap-2">
      <button
        className="w-11 h-11 flex items-center justify-center"
        aria-label="Messages"
        onClick={onMessagesClick}
      >
        <MessageCircle size={20} className="text-neutral-700" />
      </button>

      <button className="w-11 h-11 flex items-center justify-center" aria-label="Notifications">
        <Bell size={20} className="text-neutral-700" />
      </button>

      <MobileMenu variant={variant} />
    </div>
  )
}
