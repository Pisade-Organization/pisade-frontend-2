import MyScheduleBtn from "./MyScheduleBtn"
import CardList from "./CardList"
import studentDashboardData from "@/public/mockup_data/student_dashboard/student_dashboard.json"
import Typography from "@/components/base/Typography"

export default function TodayLessons() {
    return (
        <div className="w-full flex flex-col justify-center items-start
        gap-4 px-4 py-5 lg:gap-7 lg:px-20 lg:py-12 bg-electric-violet-25
        ">
            
            <div className="flex justify-between items-center w-full">
                <Typography variant={{ base: "title-1", lg: "headline-4" }} color="neutral-900">
                    Today's Lessons
                </Typography>

                <MyScheduleBtn />
            </div>

            <div className="w-full">
                {studentDashboardData.todayLessons.length > 0 && (
                    <CardList 
                        cards={studentDashboardData.todayLessons}
                    />
                )}
            </div>
            
        </div>
    )
}