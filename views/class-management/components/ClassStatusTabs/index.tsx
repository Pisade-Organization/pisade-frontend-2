import StatusTab from "./StatusTab"
import { ClassStatus, ClassStatusTabsI } from "./types"

export default function ClassStatusTabs({
  currentStatus,
  setCurrentStatus,
  labels,
}: ClassStatusTabsI) {
  const upcomingLabel = labels?.upcoming ?? "Upcoming"
  const completedLabel = labels?.completed ?? "Completed"

  return (
    <div className="flex w-full lg:px-[60px] lg:border-b lg:border-neutral-50">
      <StatusTab 
        label={upcomingLabel}
        isActive={currentStatus === ClassStatus.UPCOMING}
        onClick={() => setCurrentStatus(ClassStatus.UPCOMING)}
      />
      <StatusTab
        label={completedLabel}
        isActive={currentStatus === ClassStatus.COMPLETED}
        onClick={() => setCurrentStatus(ClassStatus.COMPLETED)}
      />
    </div>
  )
}
