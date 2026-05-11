import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import MessagesView from "@/views/chat/MessagesView"

export default function MessagesPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar variant="student_dashboard" />
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-4 lg:px-20 lg:pb-6 lg:pt-4">
        <Suspense>
          <MessagesView />
        </Suspense>
      </div>
    </div>
  )
}
