import StatusTab from "./StatusTab"
import { ClassStatus, ClassStatusTabsI } from "./types"

export default function ClassStatusTabs({
  currentStatus,
  setCurrentStatus
}: ClassStatusTabsI) {
  return (
    <div className="flex w-full lg:px-[60px] lg:border-b lg:border-neutral-50">
      <StatusTab 
        label={ClassStatus.UPCOMING}
        isActive={currentStatus === ClassStatus.UPCOMING}
        onClick={() => setCurrentStatus(ClassStatus.UPCOMING)}
      />
      <StatusTab
        label={ClassStatus.COMPLETED}
        isActive={currentStatus === ClassStatus.COMPLETED}
        onClick={() => setCurrentStatus(ClassStatus.COMPLETED)}
      />
    </div>
  )
}
