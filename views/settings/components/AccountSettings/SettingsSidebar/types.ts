import type { SettingsSidebarItemI } from "./SettingsSidebarItem/types"

export interface SettingsSidebarProps {
  items: SettingsSidebarItemI[]
  currentPath: string
}
