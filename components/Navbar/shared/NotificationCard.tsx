import Image from "next/image"
import { Clock } from "lucide-react"
import Typography from "@/components/base/Typography"

interface NotificationCardProps {
  avatarUrl?: string
  name: string
  title: string
  description: string
  time: string
  status: string
  read: boolean
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
}

export default function NotificationCard({
  avatarUrl,
  name,
  title,
  description,
  time,
  status,
  read,
}: NotificationCardProps) {
  return (
    <div className="flex gap-3 border-b border-neutral-50 pb-3">
      {/* Column 1: Avatar */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-100">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} width={40} height={40} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-700">
            {getInitials(name)}
          </div>
        )}
      </div>

      {/* Column 2: Content */}
      <div className="flex flex-1 flex-col gap-1">
        <Typography variant="label-3" color="neutral-800">
          {title}
        </Typography>
        <Typography variant="body-3" color="neutral-500">
          {description}
        </Typography>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-neutral-300" />
          <Typography variant="body-4" color="neutral-300">
            {time}
          </Typography>
          <div className="flex h-4 w-4 items-center justify-center">
            <span className="h-[6.25px] w-[6.25px] rounded-full bg-neutral-300" />
          </div>
          <Typography variant="body-4" color="neutral-300">
            {status}
          </Typography>
        </div>
      </div>

      {/* Column 3: Unread indicator */}
      <div className="flex shrink-0 items-start pt-1">
        {!read ? <span className="h-2 w-2 rounded-full bg-electric-violet-500" /> : <span className="h-2 w-2" />}
      </div>
    </div>
  )
}
