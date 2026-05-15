import Typography from "@/components/base/Typography"
import { EmptyBoxIcon } from "@/components/icons"

type EmptyStateRole = "student" | "tutor"

interface EmptyStateProps {
  role?: EmptyStateRole
}

export default function EmptyState({ role = "student" }: EmptyStateProps) {
  const title = role === "tutor" ? "No Classes Yet" : "Don't Miss Out on Learning!"
  const description =
    role === "tutor"
      ? "When students book lessons with you, their classes will appear here."
      : "Your calendar shows no classes booked. Pick a time and subject that works for you and get started!"

  return (
    <div className="py-12 px-5 lg:px-0 flex flex-col items-center gap-4">
      <EmptyBoxIcon />      
      
      <div className="flex flex-col items-center gap-1">
        <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-700" className="text-center">
          {title}
        </Typography>

        <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400" className="text-center"> 
          {description}
        </Typography>
      </div>
    </div>
  )
}
