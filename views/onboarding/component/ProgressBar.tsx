import { cn } from "@/lib/utils"

export default function ProgressBar({
  step
}: {
  step: number
}) {
  // Ensure step is clamped between 0 and 9
  const totalSteps = 9
  const progressPercent = Math.max(0, Math.min(step, totalSteps)) / totalSteps * 100

  return (
    <div className="relative w-full h-1.5 bg-white rounded overflow-hidden">
      <div
        className={cn(
          "absolute left-0 top-0 h-1.5 bg-electric-violet-400 transition-all duration-300",
          step === totalSteps ? "rounded-none" : "rounded-r-full"
        )}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  )
}