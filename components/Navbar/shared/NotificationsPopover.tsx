"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
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

type TranslateFn = ReturnType<typeof useTranslations>

function formatRelativeTime(createdAt: string, t: TranslateFn): string {
  const diff = Date.now() - new Date(createdAt).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return t("time.justNow")
  if (mins < 60) return t("time.minuteAgo", { count: mins })
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours === 1 ? t("time.hourAgo", { count: hours }) : t("time.hoursAgo", { count: hours })
  const days = Math.floor(hours / 24)
  if (days === 1) return t("time.yesterday")
  return t("time.daysAgo", { count: days })
}

function adaptNotification(n: ApiNotificationItem, t: TranslateFn): NotificationItem {
  const typeKey = n.type as keyof { CLASS_REMINDER: unknown; PAYMENT_CONFIRMATION: unknown; NEW_MESSAGE: unknown; RESCHEDULE: unknown; CANCEL: unknown }
  const knownTypes = ["CLASS_REMINDER", "PAYMENT_CONFIRMATION", "NEW_MESSAGE", "RESCHEDULE", "CANCEL"]
  const title = knownTypes.includes(n.type) ? t(`types.${typeKey}.title`) : "Notification"
  const status = knownTypes.includes(n.type) ? t(`types.${typeKey}.status`) : n.type
  return {
    id: n.id,
    createdAt: n.createdAt,
    read: n.read,
    title,
    description: n.content,
    time: formatRelativeTime(n.createdAt, t),
    status,
  }
}

function getPeriodLabel(createdAt: string, t: TranslateFn): string {
  const date = new Date(createdAt)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return t("period.today")
  if (diffDays === 1) return t("period.yesterday")
  if (diffDays < 7) return t("period.daysAgo", { count: diffDays })
  if (diffDays < 14) return t("period.lastWeek")
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

function groupByPeriod(items: NotificationItem[], t: TranslateFn): { label: string; items: NotificationItem[] }[] {
  const groups: Map<string, NotificationItem[]> = new Map()
  for (const item of items) {
    const label = getPeriodLabel(item.createdAt, t)
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
  const t = useTranslations("notifications")

  const handleNotificationInteract = (item: NotificationItem) => {
    if (!item.read) onMarkRead(item.id)
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-1 px-4 pt-3">
        {/* Row 1 */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography variant={isMobile ? "headline-5" : "label-1"} color="neutral-900">
              {t("title")}
            </Typography>
            {isMobile ? (
              <Typography variant="body-3" color="neutral-700">
                {t("unreadMessages", { count: unreadCount })}
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
                  {t("all")}
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
                  {t("unread")}
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
          <p className="py-4 text-center text-body-3 text-neutral-300">{t("noNotifications")}</p>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <Typography
                variant="label-3"
                color={group.label === t("period.today") ? "neutral-900" : "neutral-300"}
              >
                {group.label}
              </Typography>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationInteract(item)}
                  onMouseEnter={() => {
                    if (!isMobile) handleNotificationInteract(item)
                  }}
                >
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
          {t("markAllRead")}
        </span>
      </div>
    </>
  )
}

export default function NotificationsPopover({ iconButtonClass }: NotificationsPopoverProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<NotificationTab>("all")
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const t = useTranslations("notifications")

  const { data } = useMyNotifications()
  const { mutate: markRead } = useMarkNotificationRead()
  const { mutate: markAllRead } = useMarkAllNotificationsRead()

  const allItems = (data?.notifications ?? []).map((n) => adaptNotification(n, t))
  const unreadCount = data?.unreadCount ?? 0
  const filtered = activeTab === "unread" ? allItems.filter((n) => !n.read) : allItems
  const groups = groupByPeriod(filtered, t)

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
