import Typography from "@/components/base/Typography"
import clsx from "clsx"
import type { StatusTabI } from "./types"

export default function StatusTab({
  label,
  isActive,
  onClick
}: StatusTabI) {
  return (
    <button 
      onClick={onClick}
      className="relative flex-1 cursor-pointer pt-3 lg:max-w-[145px]"
    >
      <div className="flex flex-col items-center gap-3">
        <Typography variant={{ base: "body-3", lg: "body-2" }} color={isActive ? "electric-violet-500" : "neutral-700"}>
          {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
        </Typography>
        <div
          className={clsx(
            "h-[2px] w-full rounded-full",
            isActive ? "bg-electric-violet-500" : "bg-neutral-50 lg:bg-transparent"
          )}
        />
      </div>
    </button>
  )
}
