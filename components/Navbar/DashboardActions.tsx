import { MessageCircle, Bell } from "lucide-react"

export default function DashboardActions() {
  return (
    <div className="flex items-center gap-3">
      <button className="w-11 h-11">
        <MessageCircle size={22} className="text-neutral-700" />
      </button>
      <button>
        <Bell size={22} className="text-neutral-700" />
      </button>
    </div>
  )
}


