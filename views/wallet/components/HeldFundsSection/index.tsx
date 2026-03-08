"use client"

import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import useMediaQuery from "@/hooks/useMediaQuery"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"

interface HeldFundRow {
  id: string
  dailyAmounts: number[]
  hours: string
  classPrice: number
}

interface HeldFundsSectionProps {
  title?: string
  description?: string
  isMobileDetailView?: boolean
  onRequestMobileViewAll?: () => void
}

interface HeldFundColumn {
  key: string
  label: string
  getValue: (row: HeldFundRow) => string
}

function getColumnWidthClass(columnKey: string, isDesktop: boolean) {
  if (columnKey.startsWith("day-")) {
    return isDesktop ? "w-[74px]" : "w-[60px]"
  }

  return isDesktop ? "w-[96px]" : "w-[82px]"
}

function DayHeaderLabel({
  label,
  isDesktop,
  isCurrentDate,
}: {
  label: string
  isDesktop: boolean
  isCurrentDate?: boolean
}) {
  const [weekday, day] = label.split(" ")
  const textColor = isCurrentDate ? "electric-violet-700" : "neutral-400"

  return (
    <div className="flex flex-col items-center text-center">
      <Typography
        variant={isDesktop ? "label-3" : "body-4"}
        color={textColor}
        className="text-center"
      >
        {weekday}
      </Typography>
      <Typography
        variant={isDesktop ? "label-1" : "title-2"}
        color={textColor}
        className="text-center"
      >
        {day}
      </Typography>
    </div>
  )
}

const MOCK_ROWS: HeldFundRow[] = [
  {
    id: "1",
    dailyAmounts: [0, 400, 0, 400, 0, 400, 0],
    hours: "1:30",
    classPrice: 400,
  },
  {
    id: "2",
    dailyAmounts: [400, 0, 400, 0, 400, 0, 0],
    hours: "1:30",
    classPrice: 400,
  },
  {
    id: "3",
    dailyAmounts: [0, 400, 0, 400, 0, 400, 0],
    hours: "1:30",
    classPrice: 400,
  },
  {
    id: "4",
    dailyAmounts: [0, 0, 400, 0, 400, 0, 400],
    hours: "1:30",
    classPrice: 400,
  },
  {
    id: "5",
    dailyAmounts: [400, 0, 400, 0, 400, 0, 0],
    hours: "1:30",
    classPrice: 400,
  },
  {
    id: "6",
    dailyAmounts: [0, 400, 0, 400, 0, 400, 0],
    hours: "1:00",
    classPrice: 400,
  },
  {
    id: "7",
    dailyAmounts: [400, 0, 0, 400, 0, 400, 0],
    hours: "2:00",
    classPrice: 400,
  },
  {
    id: "8",
    dailyAmounts: [0, 0, 400, 0, 400, 0, 400],
    hours: "1:00",
    classPrice: 400,
  },
]

function formatBaht(value: number) {
  return `฿${value.toLocaleString("en-US")}`
}

function calculateTotalAmount(row: HeldFundRow) {
  return row.dailyAmounts.reduce((sum, amount) => sum + amount, 0)
}

function startOfWeekMonday(date: Date) {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatWeekRange(start: Date, end: Date) {
  const startMonth = start.toLocaleString("en-US", { month: "short" })
  const endMonth = end.toLocaleString("en-US", { month: "short" })
  const startDay = start.getDate()
  const endDay = end.getDate()
  const year = end.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`
  }

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

function formatDayLabel(date: Date) {
  const day = date.toLocaleString("en-US", { weekday: "short" })
  return `${day} ${date.getDate()}`
}

export default function HeldFundsSection({
  title = "Held Funds",
  description = "A breakdown of amounts temporarily reserved for your upcoming scheduled classes",
  isMobileDetailView = false,
  onRequestMobileViewAll,
}: HeldFundsSectionProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeekMonday(new Date()))
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [showAllRows, setShowAllRows] = useState(false)

  const weekRangeLabel = useMemo(() => {
    const weekEnd = addDays(currentWeekStart, 6)
    return formatWeekRange(currentWeekStart, weekEnd)
  }, [currentWeekStart])

  const weekDayHeaders = useMemo(
    () => Array.from({ length: 7 }, (_, index) => formatDayLabel(addDays(currentWeekStart, index))),
    [currentWeekStart],
  )

  const currentDateColumnKey = useMemo(() => {
    const today = new Date()
    const todayStart = new Date(today)
    todayStart.setHours(0, 0, 0, 0)
    const diffMs = todayStart.getTime() - currentWeekStart.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0 || diffDays > 6) {
      return null
    }

    return `day-${diffDays}`
  }, [currentWeekStart])

  const allColumns = useMemo<HeldFundColumn[]>(
    () => [
      ...weekDayHeaders.map((dayLabel, index) => ({
        key: `day-${index}`,
        label: dayLabel,
        getValue: (row: HeldFundRow) => String(row.dailyAmounts[index] ?? 0),
      })),
      {
        key: "hours",
        label: "Hours",
        getValue: (row: HeldFundRow) => row.hours,
      },
      {
        key: "price-of-class",
        label: "Price of class",
        getValue: (row: HeldFundRow) => formatBaht(row.classPrice),
      },
      {
        key: "total-amount",
        label: "Total amount",
        getValue: (row: HeldFundRow) => formatBaht(calculateTotalAmount(row)),
      },
    ],
    [weekDayHeaders],
  )

  const dayColumns = useMemo(
    () => allColumns.filter((column) => column.key.startsWith("day-")),
    [allColumns],
  )

  const summaryColumns = useMemo(
    () => allColumns.filter((column) => !column.key.startsWith("day-")),
    [allColumns],
  )

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7))
  }

  const isMobileDetailMode = !isDesktop && isMobileDetailView
  const visibleRows = isMobileDetailMode ? MOCK_ROWS : showAllRows ? MOCK_ROWS : MOCK_ROWS.slice(0, 5)
  const hasMoreRows = !isMobileDetailMode && MOCK_ROWS.length > 5

  return (
    <section className="flex flex-col gap-4">
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Typography variant="headline-4" color="neutral-800">
              {title}
            </Typography>
            <Typography variant="body-2" color="neutral-400">
              {description}
            </Typography>
          </div>

          <div className="flex items-center gap-2 rounded-[12px] border border-neutral-50 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={handlePrevWeek} aria-label="Previous week">
                <ChevronLeft className="h-6 w-6 text-neutral-300" />
              </button>
              <button type="button" onClick={handleNextWeek} aria-label="Next week">
                <ChevronRight className="h-6 w-6 text-neutral-300" />
              </button>
            </div>

            <Typography variant="label-1" color="neutral-700">
              {weekRangeLabel}
            </Typography>
          </div>
        </div>
      ) : (
        <>
          {!isMobileDetailView ? (
            <div className="flex flex-col gap-1">
              <Typography variant="title-1" color="neutral-800">
                {title}
              </Typography>
              <Typography variant="body-3" color="neutral-400">
                {description}
              </Typography>
            </div>
          ) : null}

          <div className="flex justify-between rounded-[12px] border border-neutral-50 bg-white px-4 py-3">
            <Typography variant="label-3" color="neutral-700">
              {weekRangeLabel}
            </Typography>

            <div className="flex gap-2">
              <button type="button" onClick={handlePrevWeek} aria-label="Previous week">
                <ChevronLeft className="h-6 w-6 text-neutral-300" />
              </button>
              <button type="button" onClick={handleNextWeek} aria-label="Next week">
                <ChevronRight className="h-6 w-6 text-neutral-300" />
              </button>
            </div>
          </div>
        </>
      )}

      {isDesktop ? (
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="flex items-center rounded-t-[4px] border-b border-neutral-50 bg-electric-violet-25 px-5 py-3">
              <div className="flex w-[360px] shrink-0 items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Transaction
                </Typography>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex gap-6">
                  {dayColumns.map((column) => (
                    <div
                      key={column.key}
                      className={`${getColumnWidthClass(column.key, true)} shrink-0 text-center ${
                        column.key === currentDateColumnKey
                          ? "bg-electric-violet-100 -my-3 py-3"
                          : ""
                      }`}
                    >
                      <DayHeaderLabel
                        label={column.label}
                        isDesktop
                        isCurrentDate={column.key === currentDateColumnKey}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6">
                {summaryColumns.map((column) => (
                  <div
                    key={column.key}
                    className={`${getColumnWidthClass(column.key, true)} shrink-0 text-center`}
                  >
                    <div className="flex items-center justify-start">
                      <Typography variant="title-3" color="neutral-800">
                        {column.label}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {visibleRows.map((row: HeldFundRow) => (
              <div key={row.id} className="flex border-b border-neutral-50 bg-white px-5 py-3 last:rounded-b-[4px]">
                <div className="flex w-[360px] shrink-0 flex-col">
                  <Typography variant="label-3" color="neutral-900">
                    Alana Somchai Degrey
                  </Typography>
                  <Typography variant="body-3" color="neutral-500">
                    English TEFL Lesson - Sep 2025
                  </Typography>
                </div>

                <div className="flex flex-1 justify-center">
                  <div className="flex gap-6">
                    {dayColumns.map((column) => (
                      <div
                        key={`${row.id}-${column.key}`}
                        className={`${getColumnWidthClass(column.key, true)} shrink-0 text-center ${
                          column.key === currentDateColumnKey
                            ? "bg-electric-violet-25 -my-3 py-3"
                            : ""
                        } flex items-center justify-center`}
                      >
                        <Typography variant="label-4" color="neutral-700" className="text-center">
                          {column.getValue(row)}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  {summaryColumns.map((column) => (
                    <div
                      key={`${row.id}-${column.key}`}
                      className={`${getColumnWidthClass(column.key, true)} shrink-0 text-center flex items-center justify-start`}
                    >
                      <Typography variant="label-4" color="neutral-700" className="text-center">
                        {column.getValue(row)}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-max">
            <div className="flex items-center rounded-t-[4px] border-b border-neutral-50 bg-electric-violet-25 px-4 py-2">
              <div className="flex w-[200px] shrink-0 items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Transaction
                </Typography>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex gap-6">
                  {dayColumns.map((column) => (
                    <div
                      key={column.key}
                      className={`${getColumnWidthClass(column.key, false)} shrink-0 text-center ${
                        column.key === currentDateColumnKey
                          ? "bg-electric-violet-100 -my-2 py-2"
                          : ""
                      }`}
                    >
                      <DayHeaderLabel
                        label={column.label}
                        isDesktop={false}
                        isCurrentDate={column.key === currentDateColumnKey}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6">
                {summaryColumns.map((column) => (
                  <div
                    key={column.key}
                    className={`${getColumnWidthClass(column.key, false)} shrink-0 text-center`}
                  >
                    <div className="flex items-center justify-start">
                      <Typography variant="title-3" color="neutral-800">
                        {column.label}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {visibleRows.map((row: HeldFundRow) => (
              <div key={row.id} className="flex border-b border-neutral-50 bg-white px-4 py-2 last:rounded-b-[4px]">
                <div className="flex w-[200px] shrink-0 flex-col">
                  <Typography variant="label-3" color="neutral-900">
                    Alana Somchai Degrey
                  </Typography>
                  <Typography variant="body-4" color="neutral-500">
                    English TEFL Lesson - Sep 2025
                  </Typography>
                </div>

                <div className="flex flex-1 justify-center">
                  <div className="flex gap-6">
                    {dayColumns.map((column) => (
                      <div
                        key={`${row.id}-${column.key}`}
                        className={`${getColumnWidthClass(column.key, false)} shrink-0 text-center ${
                          column.key === currentDateColumnKey
                            ? "bg-electric-violet-25 -my-2 py-2"
                            : ""
                        } flex items-center justify-center`}
                      >
                        <Typography variant="label-4" color="neutral-700" className="text-center">
                          {column.getValue(row)}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  {summaryColumns.map((column) => (
                    <div
                      key={`${row.id}-${column.key}`}
                      className={`${getColumnWidthClass(column.key, false)} shrink-0 text-center flex items-center justify-start`}
                    >
                      <Typography variant="label-4" color="neutral-700" className="text-center">
                        {column.getValue(row)}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {hasMoreRows ? (
        <div className="flex justify-center">
          <BaseButton
            className={isDesktop ? "" : "w-full"}
            variant="secondary"
            typeStyle="outline"
            onClick={() => {
              if (!isDesktop && !isMobileDetailView) {
                onRequestMobileViewAll?.()
                return
              }

              setShowAllRows((prev) => !prev)
            }}
          >
            {!isDesktop && !isMobileDetailView
              ? "View all"
              : showAllRows
                ? "Show less"
                : "Show more"}
          </BaseButton>
        </div>
      ) : null}
    </section>
  )
}
