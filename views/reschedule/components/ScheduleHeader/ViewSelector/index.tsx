import Typography from "@/components/base/Typography";
import { cn } from "@/lib/utils"
import { motion } from "framer-motion";
import type { CalendarView } from "@/views/schedule/components/ScheduleContent/calendar.utils";

interface ViewSelectorProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  className?: string;
}

const views: CalendarView[] = ["day", "week", "month"];

export default function ViewSelector({ view, onViewChange, className }: ViewSelectorProps) {
  return (
    <div className={cn("inline-flex rounded-md border-[2px] border-white bg-white p-0.5", className)}>
      {views.map((item) => {
        const isActive = item === view;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onViewChange(item)}
            className="relative rounded-md px-5 py-2"
          >
            {isActive ? (
              <motion.div
                layoutId="schedule-view-selector-pill"
                className="absolute inset-0 rounded-md bg-electric-violet-25"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            ) : null}

            <Typography
              className="relative z-10"
              variant={{ base: isActive ? "title-3" : "body-3" }}
              color={isActive ? "electric-violet-400" : "neutral-500"}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Typography>
          </button>
        );
      })}
    </div>
  )
}
