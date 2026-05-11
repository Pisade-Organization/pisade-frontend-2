"use client"

import { formatTimeRange, getStatusTone } from "../calendar.utils"
import type { EventCardProps } from "./types"
import { Ellipsis, EllipsisVertical } from "lucide-react"
import Typography from "@/components/base/Typography"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter, useParams } from "next/navigation"

export default function EventCard({ event, compact = false, view }: EventCardProps) {
  const router = useRouter()
  const params = useParams()
  const locale = typeof params?.locale === "string" ? params.locale : "en"
  const tone = getStatusTone(event.status)
  const isUpcoming = tone.label === "Upcoming" || event.status === "UPCOMING"
  const normalizedStatusLabel = (isUpcoming ? "Upcoming" : tone.label).toLowerCase()
  const statusColorClassMap: Record<string, string> = {
    UPCOMING: "text-electric-violet-400",
    CONFIRMED: "text-blue-normal",
    PENDING_PAYMENT: "text-orange-normal",
    COMPLETED: "text-neutral-800",
    CANCELLED: "text-red-normal",
  }
  const statusColorClass = statusColorClassMap[event.status] ?? "text-neutral-500"
  const statusLabel = isUpcoming ? "Upcoming" : tone.label
  const popoverActionsByStatus: Record<string, string[]> = {
    upcoming: ["Join Class", "Reschedule", "Cancel"],
    booked: ["Reschedule", "Cancel"],
    confirmed: ["Reschedule", "Cancel"],
    cancel: ["Request Refund"],
    cancelled: ["Request Refund"],
    "in-progress": ["Join Class"],
    processing: ["Request Refund", "Cancel"],
    pending: ["Request Refund", "Cancel"],
  }
  const popoverActions = popoverActionsByStatus[normalizedStatusLabel] ?? []

  const actionEnabled: Record<string, boolean> = {
    "Join Class": Boolean(event.allowedActions.join && event.meetingUrl && event.canJoin),
    Reschedule: Boolean(event.allowedActions.reschedule),
    Cancel: Boolean(event.allowedActions.cancel),
    "Request Refund": true,
  }

  const handleActionClick = (action: string) => {
    if (!actionEnabled[action]) {
      return
    }

    if (action === "Join Class") {
      if (event.meetingUrl) {
        window.open(event.meetingUrl, "_blank", "noopener,noreferrer")
      }
      return
    }

    if (action === "Reschedule") {
      router.push(`/${locale}/bookings/reschedule/${event.id}`)
      return
    }

    if (action === "Cancel") {
      router.push(`/${locale}/bookings/cancel/${event.id}`)
      return
    }

    if (action === "Request Refund") {
      const subject = encodeURIComponent(`Refund request for booking ${event.id}`)
      const body = encodeURIComponent(
        `Booking ID: ${event.id}\nStatus: ${event.status}\nClass time: ${formatTimeRange(event.start, event.end)}\nReason: `,
      )
      window.location.href = `mailto:support@pisade.com?subject=${subject}&body=${body}`
    }
  }
  const initials = event.participantName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const isMobileWeekView = view === "week"
  const isWeekView = view === "week"

  const statusNode = isUpcoming ? (
    <div className="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5C6.71442 1.5 5.45771 1.88122 4.38879 2.59545C3.31987 3.30968 2.48675 4.32484 1.99478 5.51256C1.50281 6.70028 1.37409 8.00721 1.62489 9.26809C1.8757 10.529 2.49476 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73191 14.3751C7.99279 14.6259 9.29972 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM10.5344 8.41125L7.28437 10.6613C7.20934 10.7131 7.12155 10.7435 7.0305 10.7491C6.93945 10.7546 6.84861 10.7352 6.76782 10.6928C6.68704 10.6505 6.61937 10.5868 6.57216 10.5088C6.52496 10.4307 6.5 10.3412 6.5 10.25V5.75C6.5 5.65878 6.52496 5.5693 6.57216 5.49124C6.61937 5.41319 6.68704 5.34954 6.76782 5.30718C6.84861 5.26482 6.93945 5.24537 7.0305 5.25094C7.12155 5.2565 7.20934 5.28687 7.28437 5.33875L10.5344 7.58875C10.6009 7.63475 10.6553 7.6962 10.6928 7.76783C10.7304 7.83946 10.75 7.91912 10.75 8C10.75 8.08088 10.7304 8.16054 10.6928 8.23217C10.6553 8.3038 10.6009 8.36525 10.5344 8.41125Z" fill="#8A39ED"/>
      </svg>
      <li className={`list-none overflow-hidden text-ellipsis whitespace-nowrap font-rethink text-label-4 [font-feature-settings:'liga'_off] ${statusColorClass}`}>
        {statusLabel}
      </li>
    </div>
  ) : (
    <ul className="list-disc list-inside">
      <li className={`overflow-hidden text-ellipsis whitespace-nowrap font-rethink text-label-4 [font-feature-settings:'liga'_off] ${statusColorClass}`}>
        {statusLabel}
      </li>
    </ul>
  )

  return (
    <div className="flex h-full w-full">
      {/* LEFT SIDE BAR */}
      <div className={`h-full w-[3px] shrink-0 ${isUpcoming ? "bg-electric-violet-100" : "bg-[#FFF1F2]"}`}></div>

      {/* CONTENT */}
      <div className={`flex h-full flex-1 items-center gap-3 ${isMobileWeekView ? "p-0 md:p-4" : "p-4"} ${isUpcoming ? "bg-electric-violet-25" : "bg-white"}`}>
        {isMobileWeekView ? (
          <div className="flex w-full flex-col gap-1 pl-0 pr-[6px] py-2 md:hidden">
            <Typography
              variant="body-4"
              color="electric-violet-700"
              className="font-rethink [font-feature-settings:'liga'_off]"
            >
              {formatTimeRange(event.start, event.end)}
            </Typography>
            {event.avatarUrl ? (
              <img
                src={event.avatarUrl}
                alt={event.participantName}
                className="h-[18px] w-[18px] rounded-full border border-white"
              />
            ) : (
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white">
                <Typography variant="body-4" color="neutral-500">
                  {initials}
                </Typography>
              </div>
            )}
          </div>
        ) : null}

        <div className={`w-full flex-col gap-2 md:hidden ${isMobileWeekView ? "hidden" : "flex"}`}>
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Typography
                variant="body-4"
                color={isUpcoming ? "electric-violet-700" : "neutral-800"}
                className="shrink-0 whitespace-nowrap font-rethink [font-feature-settings:'liga'_off]"
              >
                {formatTimeRange(event.start, event.end)}
              </Typography>
              {statusNode}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" aria-label="More options">
                  <EllipsisVertical className="h-4 w-4 text-neutral-100" />
                </button>
              </PopoverTrigger>
              {popoverActions.length > 0 ? (
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="w-[170px] rounded-xl border border-neutral-50 bg-white p-1"
                >
                  {popoverActions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => handleActionClick(action)}
                      disabled={!actionEnabled[action]}
                      className="w-full rounded-lg px-3 py-2 text-left hover:bg-neutral-25 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Typography variant="body-3" color={action === "Cancel" ? "red-normal" : "neutral-700"}>
                        {action}
                      </Typography>
                    </button>
                  ))}
                </PopoverContent>
              ) : null}
            </Popover>
          </div>
          <Typography
            variant="label-3"
            color="neutral-900"
            className="min-w-0 truncate"
            title={event.title}
          >
            {event.title}
          </Typography>
          <div className="flex items-center gap-2">
            {event.avatarUrl ? (
              <img
                src={event.avatarUrl}
                alt={event.participantName}
                className="h-6 w-6 rounded-full border border-white"
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
                <Typography variant="body-4" color="neutral-500">
                  {initials}
                </Typography>
              </div>
            )}
            <Typography variant="body-3" color="neutral-500" className="[font-feature-settings:'liga'_off]">
              {event.participantName}
            </Typography>
          </div>
        </div>

        {!isWeekView ? (
          <>
            <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
              <Typography
                variant="body-4"
                color={isUpcoming ? "electric-violet-700" : "neutral-800"}
                className="shrink-0 whitespace-nowrap font-rethink [font-feature-settings:'liga'_off]"
              >
                {formatTimeRange(event.start, event.end)}
              </Typography>
              <Typography
                variant="label-3"
                color="neutral-900"
                className="min-w-0 flex-1 truncate"
                title={event.title}
              >
                {event.title}
              </Typography>
            </div>

            <div className="hidden items-center gap-2 pr-3 md:flex">
              {event.avatarUrl ? (
                <img
                  src={event.avatarUrl}
                  alt={event.participantName}
                  className="h-6 w-6 rounded-full border border-white"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
                  <Typography variant="body-4" color="neutral-500">
                    {initials}
                  </Typography>
                </div>
              )}

              <Typography variant="body-3" color="neutral-500" className="[font-feature-settings:'liga'_off]">
                {event.participantName}
              </Typography>
            </div>

            <div className="hidden md:block">
              {statusNode}
            </div>
          </>
        ) : null}

        {isWeekView ? (
          <div className="hidden w-full flex-col gap-1 pl-0 pr-[9px] py-2 md:flex">
            <div className="flex items-start justify-between gap-2">
              <Typography
                variant="body-4"
                color={isUpcoming ? "electric-violet-700" : "neutral-800"}
                className="min-w-0 font-rethink [font-feature-settings:'liga'_off]"
              >
                {formatTimeRange(event.start, event.end)}
              </Typography>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" aria-label="More options" className="inline-flex shrink-0">
                    <Ellipsis className="h-4 w-4 text-neutral-100" />
                  </button>
                </PopoverTrigger>
                {popoverActions.length > 0 ? (
                  <PopoverContent
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="w-[170px] rounded-xl border border-neutral-50 bg-white p-1"
                  >
                    {popoverActions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => handleActionClick(action)}
                        disabled={!actionEnabled[action]}
                        className="w-full rounded-lg px-3 py-2 text-left hover:bg-neutral-25 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Typography variant="body-3" color={action === "Cancel" ? "red-normal" : "neutral-700"}>
                          {action}
                        </Typography>
                      </button>
                    ))}
                  </PopoverContent>
                ) : null}
              </Popover>
            </div>
            <Typography
              variant="label-3"
              color="neutral-900"
              className="truncate"
              title={event.title}
            >
              {event.title}
            </Typography>
            <div className="flex items-center gap-1">
              <div className="min-w-0">
                {statusNode}
              </div>
              {event.avatarUrl ? (
                <img
                  src={event.avatarUrl}
                  alt={event.participantName}
                  className="h-[18px] w-[18px] rounded-full border border-white"
                />
              ) : (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white">
                  <Typography variant="body-4" color="neutral-500">
                    {initials}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" aria-label="More options" className="hidden md:inline-flex">
                <Ellipsis className="w-4 h-4 text-neutral-100" />
              </button>
            </PopoverTrigger>
            {popoverActions.length > 0 ? (
              <PopoverContent
                side="bottom"
                align="end"
                sideOffset={8}
                className="w-[170px] rounded-xl border border-neutral-50 bg-white p-1"
              >
                {popoverActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleActionClick(action)}
                    disabled={!actionEnabled[action]}
                    className="w-full rounded-lg px-3 py-2 text-left hover:bg-neutral-25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Typography variant="body-3" color={action === "Cancel" ? "red-normal" : "neutral-700"}>
                      {action}
                    </Typography>
                  </button>
                ))}
              </PopoverContent>
            ) : null}
          </Popover>
        )}
      </div>
    </div>
  )
}
