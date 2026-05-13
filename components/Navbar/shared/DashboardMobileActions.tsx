import { MessageCircle } from "lucide-react"

import MobileMenu from "../../MobileMenu/MobileMenu"
import type { DashboardNavbarVariant } from "../types"
import NotificationsPopover from "./NotificationsPopover"

interface DashboardMobileActionsProps {
  variant: DashboardNavbarVariant
  onMessagesClick: () => void
}

export default function DashboardMobileActions({ variant, onMessagesClick }: DashboardMobileActionsProps) {
  return (
    <div className="lg:hidden flex items-center gap-2">
      <button
        className="flex h-11 w-11 cursor-pointer items-center justify-center"
        aria-label="Messages"
        onClick={onMessagesClick}
      >
        <MessageCircle size={20} className="text-neutral-700" />
      </button>

      <NotificationsPopover iconButtonClass="flex h-11 w-11 cursor-pointer items-center justify-center" />

      <MobileMenu variant={variant} />
    </div>
  )
}
