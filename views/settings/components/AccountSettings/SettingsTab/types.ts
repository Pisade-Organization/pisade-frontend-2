import type { SettingsTabItemI } from "./SettingsTabItem"

export interface SettingsTabProps {
  items: SettingsTabItemI[]
  currentPath: string
}
