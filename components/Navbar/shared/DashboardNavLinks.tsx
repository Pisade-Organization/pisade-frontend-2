import type { DashboardNavItem } from "../types"

interface DashboardNavLinksProps {
  items: DashboardNavItem[]
  pathname?: string | null
  onNavigate: (path: string) => void
}

export default function DashboardNavLinks({ items, pathname, onNavigate }: DashboardNavLinksProps) {
  return (
    <div className="hidden lg:flex gap-7">
      {items.map((item) => (
        <button
          key={item.path}
          className={item.isActive(pathname) ? "text-electric-violet-600" : "text-neutral-900"}
          onClick={() => onNavigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
