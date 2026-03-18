import type { TimesheetRowMobileProps } from "./types"

export default function TimesheetRowMobile({ row }: TimesheetRowMobileProps) {
  return (
    <article className="rounded-lg border border-neutral-100 bg-white p-3">
      <p className="text-sm font-medium text-neutral-900">{row.title}</p>
      <p className="mt-1 text-xs text-neutral-500">#{row.id}</p>
      <p className="mt-2 text-sm font-semibold text-neutral-800">฿{row.totalAmount}</p>
    </article>
  )
}
