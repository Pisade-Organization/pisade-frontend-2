import type { WeekSelectorProps } from "./types"

export default function WeekSelector({ week }: WeekSelectorProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-3 py-2">
      <button type="button" className="rounded-md border border-neutral-200 px-2 py-1 text-sm text-neutral-700">
        Prev
      </button>

      <p className="text-sm font-medium text-neutral-800">{week?.label ?? "Oct 6 - 12"}</p>

      <button type="button" className="rounded-md border border-neutral-200 px-2 py-1 text-sm text-neutral-700">
        Next
      </button>
    </div>
  )
}
