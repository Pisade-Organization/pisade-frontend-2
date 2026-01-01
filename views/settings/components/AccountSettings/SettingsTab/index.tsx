import SettingsTabItem from "./SettingsTabItem"
import { SettingsTabProps } from "./types"

export default function SettingsTab({
  items,
  currentPath,
}: SettingsTabProps) {
  return (
    <div className="w-full flex">
      {items.map((item: typeof items[number]) => (
        <SettingsTabItem
          key={item.href}
          {...item}
          // Use isActive from item if provided, otherwise calculate from currentPath
          isActive={item.isActive !== undefined ? item.isActive : currentPath === item.href}
        />
      ))}
    </div>
  )
}
