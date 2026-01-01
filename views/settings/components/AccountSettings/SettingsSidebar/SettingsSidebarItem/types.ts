import { ReactNode } from "react"

export interface SettingsSidebarItemI {
  /** Label shown in the sidebar */
  label: string

  /** Target route */
  href: string

  /** Icon component */
  icon?: ReactNode

  /** Is this item currently active */
  isActive?: boolean

  /** Optional click override (analytics, etc.) */
  onClick?: () => void

  /** Disable interaction (future-proof) */
  disabled?: boolean
}
