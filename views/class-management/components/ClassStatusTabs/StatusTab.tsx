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
      className="w-full flex flex-col gap-3 lg:pt-3 cursor-pointer"
    >
      <Typography variant={{ base: "body-3", lg: "body-2" }} color={isActive ? "electric-violet-500" : "neutral-700"}>
        {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
      </Typography>
      <div className={clsx("w-full h-[2px]", isActive ? "bg-electric-violet-500" : "bg-neutral-50")} />
    </button>
  )
}