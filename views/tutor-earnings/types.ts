export interface EarningsTransaction {
  id: string
  transaction: string
  amount: number
  paymentMethod: string
  dateLabel: string
  status: string
}

export interface TimesheetEntry {
  id: string
  title: string
  totalAmount: number
}

export interface WeekRange {
  label: string
  isCurrentWeek?: boolean
}
