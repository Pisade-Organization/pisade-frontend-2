import type { WeeklyTotalCardProps } from "./types"

export default function WeeklyTotalCard({ totalAmount = 0 }: WeeklyTotalCardProps) {
  return (
    <article className="rounded-xl border border-neutral-100 bg-white p-4">
      <p className="text-sm text-neutral-500">Total money</p>
      <p className="mt-1 text-2xl font-semibold text-neutral-900">฿{totalAmount}</p>
    </article>
  )
}
