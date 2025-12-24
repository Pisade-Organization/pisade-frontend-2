import EmptyStateIcon from "./EmptyStateIcon";
import EmptyStateTitle from "./EmptyStateTitle";
import EmptyStateDescription from "./EmptyStateDescription";
import EmptyStateCTA from "./EmptyStateCTA";

export default function NoScheduleClassesState() {
  return (
    <div className="flex flex-col justify-center items-center py-12 gap-4">
      <EmptyStateIcon />
      <EmptyStateTitle />
      <EmptyStateDescription />
      <EmptyStateCTA />
    </div>
  )
}