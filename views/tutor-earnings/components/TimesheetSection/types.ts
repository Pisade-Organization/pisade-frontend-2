import type { TimesheetEntry, WeekRange } from "@/views/tutor-earnings/types"

export interface WeekSelectorProps {
  week?: WeekRange
}

export interface WeeklyTotalCardProps {
  totalAmount?: number
}

export interface TimesheetTableMobileProps {
  rows?: TimesheetEntry[]
}

export interface TimesheetRowMobileProps {
  row: TimesheetEntry
}
