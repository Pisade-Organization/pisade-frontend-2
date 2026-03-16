"use client"

import Navbar from "@/components/Navbar"
import SidebarLayout from "../components/SidebarLayout"
import MobileBackground from "../components/MobileBackground"
import StudentInfoCard from "../components/StudentInfoCard"
import ScheduleContent from "../components/ScheduleContent"

type SchedulePageProps = {
  navbarVariant?: "student_dashboard" | "tutor_dashboard"
}

export default function SchedulePage({ navbarVariant = "student_dashboard" }: SchedulePageProps) {
  return (
    <div className="w-full min-h-screen bg-[#efeff3]">
      <Navbar variant={navbarVariant} />

      <main className="w-full lg:px-4 lg:py-4">
        <section className="relative lg:hidden">
          <div className="w-full overflow-hidden">
            <MobileBackground />
          </div>

          <div className="absolute inset-x-4 top-full z-10 -translate-y-[32%]">
            <StudentInfoCard />
          </div>
        </section>

        <section className="mt-24 hidden w-full lg:mt-0 lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:gap-4">
          <SidebarLayout />

          <ScheduleContent />
        </section>
      </main>
    </div>
  )
}
