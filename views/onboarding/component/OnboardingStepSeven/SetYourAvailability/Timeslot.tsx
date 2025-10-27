"use client"
import { cn } from "@/lib/utils"

export default function Timeslot({
  time,
  isSelected,
  onClick
}: {
  time: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button 
      className={cn("text-body-2 rounded-[5px] border-[1.5px] p-2 flex justify-center items-center h-10",
        isSelected ? "border-electric-violet-50 bg-electric-violet-25 text-electric-violet-500" : "border-neutral-50 bg-white text-neutral-900"
      )}
      onClick={onClick}
    >
      { time }
    </button>
  )
}