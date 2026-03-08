"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"

interface TransactionHistoryRow {
  id: string
  transaction: string
  amount: string
  paymentMethod: string
  date: string
  status: "Completed" | "Processing" | "Cancel"
}

interface TransactionHistorySectionProps {
  isMobileDetailView?: boolean
  onRequestMobileViewAll?: () => void
}

function getStatusColor(status: TransactionHistoryRow["status"]) {
  if (status === "Completed") return "green-normal"
  if (status === "Processing") return "orange-normal"
  return "neutral-300"
}

const MOCK_ROWS: TransactionHistoryRow[] = [
  {
    id: "TXN-10291",
    transaction: "English TEFL Lesson - Sep 2025",
    amount: "฿3000",
    paymentMethod: "Mastercard ****3761",
    date: "24 Sep 2025, 10:00",
    status: "Completed",
  },
  {
    id: "TXN-10292",
    transaction: "Deposit",
    amount: "฿1200",
    paymentMethod: "PromptPay",
    date: "25 Sep 2025, 11:30",
    status: "Completed",
  },
  {
    id: "TXN-10293",
    transaction: "English TEFL Lesson - Sep 2025",
    amount: "฿3000",
    paymentMethod: "Wallet",
    date: "26 Sep 2025, 09:00",
    status: "Processing",
  },
  {
    id: "TXN-10294",
    transaction: "Withdrawal",
    amount: "฿2000",
    paymentMethod: "Bank transfer",
    date: "27 Sep 2025, 14:15",
    status: "Cancel",
  },
  {
    id: "TXN-10295",
    transaction: "Deposit",
    amount: "฿1500",
    paymentMethod: "Mastercard ****3761",
    date: "28 Sep 2025, 16:45",
    status: "Completed",
  },
  {
    id: "TXN-10296",
    transaction: "English TEFL Lesson - Sep 2025",
    amount: "฿3000",
    paymentMethod: "Wallet",
    date: "29 Sep 2025, 08:30",
    status: "Processing",
  },
  {
    id: "TXN-10297",
    transaction: "Withdrawal",
    amount: "฿1800",
    paymentMethod: "Bank transfer",
    date: "30 Sep 2025, 12:00",
    status: "Cancel",
  },
]

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

export default function TransactionHistorySection({
  isMobileDetailView = false,
  onRequestMobileViewAll,
}: TransactionHistorySectionProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeekMonday(new Date()))
  const [showAllRows, setShowAllRows] = useState(false)

  const weekRangeLabel = useMemo(() => {
    const weekEnd = addDays(currentWeekStart, 6)
    return formatWeekRange(currentWeekStart, weekEnd)
  }, [currentWeekStart])

  const isMobileDetailMode = !isDesktop && isMobileDetailView
  const visibleRows = isMobileDetailMode ? MOCK_ROWS : showAllRows ? MOCK_ROWS : MOCK_ROWS.slice(0, 5)
  const hasMoreRows = !isMobileDetailMode && MOCK_ROWS.length > 5
  const tableGridClass = "grid grid-cols-[1fr_3fr_1fr_1.8fr_1.2fr_1fr] items-center gap-6"

  return (
    <section className="flex flex-col gap-4">
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Typography variant="headline-4" color="neutral-800">
              Transaction history
            </Typography>
            <Typography variant="body-2" color="neutral-400">
              Track your deposits, payments, and amounts reserved for your upcoming classes.
            </Typography>
          </div>

          <div className="flex items-center gap-2 rounded-[12px] border border-neutral-50 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentWeekStart((prev) => addDays(prev, -7))}
                aria-label="Previous week"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-300" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentWeekStart((prev) => addDays(prev, 7))}
                aria-label="Next week"
              >
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
                Transaction history
              </Typography>
              <Typography variant="body-3" color="neutral-400">
                Track your deposits, payments, and amounts reserved for your upcoming classes.
              </Typography>
            </div>
          ) : null}

          <div className="flex justify-between rounded-[12px] border border-neutral-50 bg-white px-4 py-3">
            <Typography variant="label-3" color="neutral-700">
              {weekRangeLabel}
            </Typography>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentWeekStart((prev) => addDays(prev, -7))}
                aria-label="Previous week"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-300" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentWeekStart((prev) => addDays(prev, 7))}
                aria-label="Next week"
              >
                <ChevronRight className="h-6 w-6 text-neutral-300" />
              </button>
            </div>
          </div>
        </>
      )}

      {isDesktop ? (
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[920px]">
            <div className={`${tableGridClass} rounded-t-[4px] border-b border-neutral-50 bg-electric-violet-25 px-4 py-2 lg:px-5 lg:py-3`}>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  ID
                </Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Transaction
                </Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Amount
                </Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Payment method
                </Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Date
                </Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="title-3" color="neutral-800">
                  Status
                </Typography>
              </div>
            </div>

            {visibleRows.map((row) => (
              <div
                key={row.id}
                className={`${tableGridClass} border-b border-neutral-50 bg-white px-4 py-2 lg:px-5 lg:py-3`}
              >
                <Typography variant="label-3" color="neutral-500">
                  {row.id}
                </Typography>
                <Typography variant="label-3" color="neutral-900">
                  {row.transaction}
                </Typography>
                <Typography variant="label-3" color="neutral-500">
                  {row.amount}
                </Typography>
                <Typography variant="label-3" color="neutral-500">
                  {row.paymentMethod}
                </Typography>
                <Typography variant="label-3" color="neutral-500">
                  {row.date}
                </Typography>
                <Typography variant="label-3" color={getStatusColor(row.status)}>
                  {row.status}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visibleRows.map((row) => (
            <article
              key={row.id}
              className="flex flex-col gap-6 rounded-[12px] border border-neutral-50 bg-white p-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  <Typography variant="label-3" color="neutral-500">
                    {row.id}
                  </Typography>
                  <Typography variant="label-3" color="neutral-500">
                    {row.date}
                  </Typography>
                </div>

                <div className="border-b border-[#F1F1F1]" />

                <Typography variant="title-3" color="neutral-900">
                  {row.transaction}
                </Typography>

                <div className="flex justify-between gap-4">
                  <Typography variant="body-3" color="neutral-300">
                    Amount
                  </Typography>
                  <Typography variant="label-3" color="neutral-900">
                    {row.amount}
                  </Typography>
                </div>

                <div className="flex justify-between gap-4">
                  <Typography variant="body-3" color="neutral-300">
                    Payment method
                  </Typography>
                  <Typography variant="body-3" color="neutral-900">
                    {row.paymentMethod}
                  </Typography>
                </div>

                <div className="flex justify-between gap-4">
                  <Typography variant="body-3" color="neutral-300">
                    Status
                  </Typography>
                  <Typography variant="body-3" color={getStatusColor(row.status)}>
                    {row.status}
                  </Typography>
                </div>
              </div>
            </article>
          ))}
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
