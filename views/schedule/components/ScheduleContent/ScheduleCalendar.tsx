import Typography from "@/components/base/Typography"
import { useEffect, useMemo, useState } from "react"

const START_HOUR = 7
const END_HOUR = 13
const SLOT_INTERVAL_MINUTES = 15

function formatHourLabel(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`
}

function formatMinutesAsTime(minutes: number) {
  const clamped = Math.max(0, Math.min(24 * 60 - 1, minutes))
  const hours = Math.floor(clamped / 60)
  const mins = clamped % 60
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}

export default function ScheduleCalendar() {
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date())
  const [isCreateSlotOpen, setIsCreateSlotOpen] = useState(false)
  const [slotTime, setSlotTime] = useState("")

  const startMinutes = START_HOUR * 60
  const endMinutes = END_HOUR * 60
  const nowMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes()
  const totalRangeMinutes = endMinutes - startMinutes
  const isWithinWorkingHours = nowMinutes >= startMinutes && nowMinutes <= endMinutes

  const currentLineTopPercentage =
    ((nowMinutes - startMinutes) / totalRangeMinutes) * 100

  const timelineHours = useMemo(
    () => Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, index) => START_HOUR + index),
    [],
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleOpenCreateSlot = () => {
    const nearestQuarterHour = Math.round(nowMinutes / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES
    const boundedMinutes = Math.max(startMinutes, Math.min(endMinutes, nearestQuarterHour))
    setSlotTime(formatMinutesAsTime(boundedMinutes))
    setIsCreateSlotOpen(true)
  }

  return (
    <section className="rounded-xl border border-neutral-50 bg-white">
      <div className="grid grid-cols-[92px_minmax(0,1fr)]">
        <div className="relative h-[760px] border-r border-neutral-50">
          {timelineHours.map((hour, index) => {
            const isFirst = index === 0
            const isLast = index === timelineHours.length - 1
            const topPercentage = (index / (timelineHours.length - 1)) * 100

            return (
              <div
                key={hour}
                className={`absolute left-0 right-0 px-8 ${isFirst ? "translate-y-0" : isLast ? "-translate-y-full" : "-translate-y-1/2"}`}
                style={{ top: `${topPercentage}%` }}
              >
                <Typography variant="title-3" color="neutral-300" className={isFirst ? "pt-5" : ""}>
                  {formatHourLabel(hour)}
                </Typography>
              </div>
            )
          })}
        </div>

        <div className="relative h-[760px]">
          {timelineHours.map((hour, index) => {
            const topPercentage = (index / (timelineHours.length - 1)) * 100

            return (
              <div
                key={hour}
                className="absolute inset-x-0 border-t border-neutral-50"
                style={{ top: `${topPercentage}%` }}
              />
            )
          })}

          {isWithinWorkingHours ? (
            <div
              className="absolute inset-x-0"
              style={{ top: `${Math.max(0, Math.min(100, currentLineTopPercentage))}%` }}
            >
              <div className="relative h-0">
                <div className="absolute inset-x-0 h-[2px] -translate-y-1/2 bg-electric-violet-400" />
                <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-violet-400" />
                <button
                  type="button"
                  onClick={handleOpenCreateSlot}
                  className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-electric-violet-400 text-title-2 text-white"
                  aria-label="Create slot"
                >
                  +
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isCreateSlotOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-xl border border-neutral-50 bg-white p-5 shadow-xl">
            <Typography variant="title-2" color="neutral-900">
              Create Slot
            </Typography>
            <Typography variant="body-3" color="neutral-300" className="mt-2">
              Prefilled with your current local time (nearest 15 minutes).
            </Typography>

            <div className="mt-4 flex flex-col gap-2">
              <Typography variant="label-3" color="neutral-700">
                Start time
              </Typography>
              <input
                type="time"
                step={SLOT_INTERVAL_MINUTES * 60}
                min={formatHourLabel(START_HOUR)}
                max={formatHourLabel(END_HOUR)}
                value={slotTime}
                onChange={(event) => setSlotTime(event.target.value)}
                className="h-11 rounded-lg border border-neutral-100 px-3 text-body-3 text-neutral-900 outline-none focus:border-electric-violet-400"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateSlotOpen(false)}
                className="h-10 rounded-lg border border-neutral-100 px-4 text-label-3 text-neutral-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsCreateSlotOpen(false)}
                className="h-10 rounded-lg bg-electric-violet-400 px-4 text-label-3 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
