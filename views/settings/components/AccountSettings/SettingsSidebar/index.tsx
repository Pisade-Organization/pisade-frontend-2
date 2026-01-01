import SettingsSidebarItem from "./SettingsSidebarItem"
import { SettingsSidebarProps } from "./types"

export default function SettingsSidebar({
  items,
  currentPath,
}: SettingsSidebarProps) {
  return (
    <nav className="w-[334px] rounded-2xl p-4 flex flex-col gap-[2px] border border-neutral-50 bg-white">
      {items.map((item) => (
        <SettingsSidebarItem
          key={item.href}
          {...item}
          isActive={currentPath === item.href}
        />
      ))}
    </nav>
  )
}
