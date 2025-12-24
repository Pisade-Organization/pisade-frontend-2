import Navbar from "@/components/Navbar"
import Hero from "../components/Hero"
import TodayLessons from "../components/TodayLessons"
import StatsOverview from "../components/StatsOverview"
import WeeklyStudyPlan from "../components/WeeklyStudyPlan"
import FavoriteTutors from "../components/FavoriteTutors"
import TransactionHistory  from "../components/TransactionHistory"
import Footer from "@/components/footer/Footer"

export default function StudentDashboardPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar variant="student_dashboard" />
      <Hero 
        studentName="Alex Kim"
        todayLessonCounts={3}
        lessonTitle="Algebra II: Quadratic Equations"
        tutorName="Sophia Lee"
        avatarUrl="https://randomuser.me/api/portraits/women/65.jpg"
        lessonTime={new Date(Date.now() + 60 * 60 * 1000)}
      />

      <div className="w-full order-2 lg:order-1">
        <TodayLessons />
      </div>
      <div className="w-full order-1 lg:order-2">
        <StatsOverview 
          stats={[
            { label: "Completed Lessons", value: 15 },
            { label: "Scheduled Lessons", value: 4 },
            { label: "Skipped Lessons", value: 1 },
            { label: "Goal", value: 20 }
          ]}
        />
      </div>

      <WeeklyStudyPlan />
      <FavoriteTutors />
      <TransactionHistory />

      <div className="w-full order-last">
        <Footer />
      </div>

    </div>
  )
}