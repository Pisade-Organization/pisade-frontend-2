import PastSegment from "./PastSegment";
import FutureSegment from "./FutureSegment";

interface TimelineIndicatorI {
  todayIndex: number;
}

export default function TimelineIndicator({
  todayIndex
}: TimelineIndicatorI) {
  const segments = Array.from({ length: 7 }, (_, index) => {
    return index < todayIndex ? (
      <PastSegment key={index} />
    ) : (
      <FutureSegment key={index} />
    )
  })

  return (
    <div className="w-full flex items-center gap-1">
      {segments}
    </div>
  )
}