export enum ClassStatus {
  UPCOMING = "UPCOMING",
  COMPLETED = "COMPLETED"
}

export interface ClassStatusTabsI {
  currentStatus: ClassStatus
  setCurrentStatus: (status: ClassStatus) => void
}

export interface StatusTabI {
  label: ClassStatus
  isActive: boolean
  onClick: () => void
}