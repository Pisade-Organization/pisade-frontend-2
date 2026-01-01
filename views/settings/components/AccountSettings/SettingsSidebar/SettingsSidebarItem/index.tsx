import Link from "next/link"
import { SettingsSidebarItemI } from "./types"
import clsx from "clsx"
import Typography from "@/components/base/Typography"

export default function SettingsSidebarItem({
  label,
  href,
  icon,
  isActive = false,
  onClick,
  disabled = false,
}: SettingsSidebarItemI) {
  return (
    <Link
      href={disabled ? "#" : href}
      onClick={onClick}
      className={clsx(
        "w-full flex justify-start items-center gap-3 rounded-lg py-4 px-5 transition-colors",
        isActive
          ? "bg-electric-violet-25 border border-electric-violet-50"
          : "bg-white",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {icon && <span className={clsx("shrink-0",
        isActive ? "text-electric-violet-500" : "text-neutral-400"
      )}>{icon}</span>}

      <Typography variant="label-2" color={
        isActive ? "electric-violet-500" : "neutral-400"
      }>
        { label }
      </Typography>
    </Link>
  )
}
