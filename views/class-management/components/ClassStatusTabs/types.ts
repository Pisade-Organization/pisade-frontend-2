export enum ClassStatus {
  UPCOMING = "UPCOMING",
  COMPLETED = "COMPLETED"
}

export interface ClassStatusTabsI {
  currentStatus: ClassStatus
  setCurrentStatus: (status: ClassStatus) => void
  labels?: {
    upcoming: string
    completed: string
  }
}

export interface StatusTabI {
  label: string
  isActive: boolean
  onClick: () => void
}
