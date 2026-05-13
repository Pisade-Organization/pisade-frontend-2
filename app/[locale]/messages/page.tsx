import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import MessagesView from "@/views/chat/MessagesView"

export default function MessagesPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="hidden lg:block">
        <Navbar variant="student_dashboard" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Suspense>
          <MessagesView />
        </Suspense>
      </div>
    </div>
  )
}
