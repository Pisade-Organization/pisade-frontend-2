import Navbar from "@/components/Navbar"
import Hero from "../components/Hero"
import TodayLessons from "../components/TodayLessons"
export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar variant="student_dashboard" />
      <Hero />
    </div>
  )
}