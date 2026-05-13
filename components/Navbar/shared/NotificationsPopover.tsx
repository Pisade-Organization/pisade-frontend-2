"use client"

import { useState } from "react"
import { Bell, CheckCheck, Settings2, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useMyNotifications } from "@/hooks/settings/queries"
import { useMarkAllNotificationsRead, useMarkNotificationRead } from "@/hooks/settings/mutations"
import type { NotificationItem as ApiNotificationItem } from "@/services/profile/types"
import NotificationCard from "./NotificationCard"

type NotificationTab = "all" | "unread"

interface NotificationItem {
  id: string
  createdAt: string
  read: boolean
  title: string
  description: string
  time: string
  status: string
}

const TYPE_META: Record<string, { title: string; status: string }> = {
  CLASS_REMINDER: { title: "Class starts soon!", status: "Upcoming class" },
  PAYMENT_CONFIRMATION: { title: "Payment confirmed", status: "Payment" },
  NEW_MESSAGE: { title: "New message received", status: "Message" },
  RESCHEDULE: { title: "Lesson rescheduled", status: "Reschedule" },
  CANCEL: { title: "Lesson cancelled", status: "Cancelled" },
}

function formatRelativeTime(createdAt: string): string {
  const diff = Date.now() - new Date(createdAt).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}

function adaptNotification(n: ApiNotificationItem): NotificationItem {
  const meta = TYPE_META[n.type] ?? { title: "Notification", status: n.type }
  return {
    id: n.id,
    createdAt: n.createdAt,
    read: n.read,
    title: meta.title,
    description: n.content,
    time: formatRelativeTime(n.createdAt),
    status: meta.status,
  }
}

function getPeriodLabel(createdAt: string): string {
  const date = new Date(createdAt)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return "Last week"
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

function groupByPeriod(items: NotificationItem[]): { label: string; items: NotificationItem[] }[] {
  const groups: Map<string, NotificationItem[]> = new Map()
  for (const item of items) {
    const label = getPeriodLabel(item.createdAt)
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label)!.push(item)
  }
  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }))
}

interface NotificationsPopoverProps {
  iconButtonClass: string
}

function NotificationsContent({
  activeTab,
  setActiveTab,
  allItems,
  groups,
  unreadCount,
  onClose,
  isMobile,
  onMarkRead,
  onMarkAllRead,
}: {
  activeTab: NotificationTab
  setActiveTab: (tab: NotificationTab) => void
  allItems: NotificationItem[]
  groups: { label: string; items: NotificationItem[] }[]
  unreadCount: number
  onClose: () => void
  isMobile: boolean
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
}) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-1 px-4 pt-3">
        {/* Row 1 */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography variant={isMobile ? "headline-5" : "label-1"} color="neutral-900">
              Notifications
            </Typography>
            {isMobile ? (
              <Typography variant="body-3" color="neutral-700">
                You have {unreadCount} unread messages
              </Typography>
            ) : null}
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer" aria-label="Close">
            <X className="h-5 w-5 text-neutral-300" />
          </button>
        </div>

        {/* Row 2 */}
        <div className={`flex items-center justify-between ${isMobile ? "border-b border-neutral-50" : ""}`}>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`cursor-pointer transition-colors ${
                isMobile
                  ? `px-4 py-4 ${activeTab === "all" ? "border-b-2 border-electric-violet-500" : ""}`
                  : `rounded-full px-4 py-2 ${activeTab === "all" ? "bg-electric-violet-25" : "hover:bg-neutral-25"}`
              }`}
            >
              <span className="flex items-center gap-1">
                <Typography variant="label-3" color={activeTab === "all" ? "electric-violet-500" : "neutral-500"}>
                  All
                </Typography>
                {isMobile ? (
                  <span className="rounded-[8px] bg-electric-violet-50 px-2 py-[2px]">
                    <Typography variant="label-4" color="electric-violet-400">
                      {allItems.length}
                    </Typography>
                  </span>
                ) : null}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("unread")}
              className={`cursor-pointer transition-colors ${
                isMobile
                  ? `px-4 py-4 ${activeTab === "unread" ? "border-b-2 border-electric-violet-500" : ""}`
                  : `rounded-full px-4 py-2 ${activeTab === "unread" ? "bg-electric-violet-25" : "hover:bg-neutral-25"}`
              }`}
            >
              <span className="flex items-center gap-1">
                <Typography variant="label-3" color={activeTab === "unread" ? "electric-violet-500" : "neutral-500"}>
                  Unread
                </Typography>
                {isMobile ? (
                  <span className="rounded-[8px] bg-neutral-25 px-2 py-[2px]">
                    <Typography variant="label-4" color="neutral-300">
                      {unreadCount}
                    </Typography>
                  </span>
                ) : null}
              </span>
            </button>
          </div>
          <button type="button" className={`cursor-pointer rounded-[8px] p-1 ${isMobile ? "border border-neutral-50" : ""}`}>
            <Settings2 className={`h-5 w-5 ${isMobile ? "text-neutral-700" : "text-neutral-400"}`} />
          </button>
        </div>
      </div>

      {/* Notification groups */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-3">
        {groups.length === 0 ? (
          <p className="py-4 text-center text-body-3 text-neutral-300">No notifications</p>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <Typography
                variant="label-3"
                color={group.label === "Today" ? "neutral-900" : "neutral-300"}
              >
                {group.label}
              </Typography>
              {group.items.map((item) => (
                <div key={item.id} onClick={() => { if (!item.read) onMarkRead(item.id) }}>
                  <NotificationCard
                    name=""
                    title={item.title}
                    description={item.description}
                    time={item.time}
                    status={item.status}
                    read={item.read}
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        className="group flex cursor-pointer items-center justify-center gap-2 border-t border-neutral-50 bg-white px-4 pt-3 pb-4 transition-colors hover:bg-neutral-25"
        onClick={onMarkAllRead}
      >
        <CheckCheck className="h-5 w-5 text-neutral-900 transition-colors group-hover:text-electric-violet-500" />
        <span className="text-label-2 text-neutral-900 transition-colors group-hover:text-electric-violet-500">
          Mark all as read
        </span>
      </div>
    </>
  )
}

export default function NotificationsPopover({ iconButtonClass }: NotificationsPopoverProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<NotificationTab>("all")
  const isMobile = useMediaQuery("(max-width: 1023px)")

  const { data } = useMyNotifications()
  const { mutate: markRead } = useMarkNotificationRead()
  const { mutate: markAllRead } = useMarkAllNotificationsRead()

  const allItems = (data?.notifications ?? []).map(adaptNotification)
  const unreadCount = data?.unreadCount ?? 0
  const filtered = activeTab === "unread" ? allItems.filter((n) => !n.read) : allItems
  const groups = groupByPeriod(filtered)

  const handleMarkAllRead = () => {
    const unreadIds = allItems.filter((n) => !n.read).map((n) => n.id)
    if (unreadIds.length > 0) markAllRead(unreadIds)
  }

  const bellIcon = (
    <Bell size={22} className={open ? "text-electric-violet-600" : "text-neutral-700"} />
  )

  const contentProps = {
    activeTab,
    setActiveTab,
    allItems,
    groups,
    unreadCount,
    onClose: () => setOpen(false),
    isMobile,
    onMarkRead: (id: string) => markRead(id),
    onMarkAllRead: handleMarkAllRead,
  }

  if (isMobile) {
    return (
      <>
        <button className={iconButtonClass} aria-label="Notifications" onClick={() => setOpen(true)}>
          {bellIcon}
        </button>
        {open ? (
          <div className="fixed inset-0 z-50 flex flex-col gap-4 bg-white px-4">
            <NotificationsContent {...contentProps} />
          </div>
        ) : null}
      </>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={iconButtonClass} aria-label="Notifications">
          {bellIcon}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[360px] flex-col gap-3 overflow-hidden rounded-[12px] border border-neutral-50 bg-white p-0 shadow-lg"
      >
        <NotificationsContent {...contentProps} />
      </PopoverContent>
    </Popover>
  )
}
