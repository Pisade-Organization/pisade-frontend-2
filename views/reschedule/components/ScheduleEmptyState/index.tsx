import EmptyIllustration from "./EmptyIllustration"
import EmptyTitle from "./EmptyTitle"
import EmptyDescription from "./EmptyDescription"
import PrimaryActionButton from "./PrimaryActionButton"

export default function ScheduleEmptyState() {
  return (
    <section className="py-12 w-full flex flex-col gap-3">
      <EmptyIllustration />
      
      <div className="flex flex-col gap-2">
        <EmptyTitle />
        <EmptyDescription />
      </div>

      <PrimaryActionButton />

    </section>
  )
}