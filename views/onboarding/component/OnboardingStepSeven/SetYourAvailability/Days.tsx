import Typography from "@/components/base/Typography"

export default function Days({
  activeDays
}: {
  activeDays: string[]
}) {
  return (
    <div className="w-full grid grid-cols-7 gap-2">

      {/* STATUS ACTIVE BAR */}
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
        <div
          key={day}
          className="w-full flex flex-col gap-3"
        >
          <div className={`w-full h-[2px] rounded-full transition-all ${
            activeDays.includes(day) ? "bg-electric-violet-500" : "bg-neutral-100"
          }`} />
          <div className="text-center">
            <Typography variant="label-1" color="neutral-900">
              {day}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}