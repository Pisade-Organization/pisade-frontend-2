import type { TimesheetEntry } from "@/views/tutor-earnings/types"
import TimesheetRowMobile from "./TimesheetRowMobile"
import type { TimesheetTableMobileProps } from "./types"

const DEFAULT_ROWS: TimesheetEntry[] = [
  {
    id: "timesheet-sample-1",
    title: "Sample timesheet row",
    totalAmount: 0,
  },
]

export default function TimesheetTableMobile({ rows = DEFAULT_ROWS }: TimesheetTableMobileProps) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <TimesheetRowMobile key={row.id} row={row} />
      ))}
    </div>
  )
}
