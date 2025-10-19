"use client"
import { useState } from "react"
import MyScheduleBtn from "./MyScheduleBtn"
import Controls from "./Controls"
import CardList from "./CardList"
import studentDashboardData from "@/public/mockup_data/student_dashboard/student_dashboard.json"

export default function TodayLessons() {
    const [currentLesson, setCurrentLesson] = useState(0)
    const [direction, setDirection] = useState(1)

    return (
        <div className="flex flex-col justify-center items-start
        gap-4 px-4 py-5 lg:gap-7 lg:px-20 lg:py-12 bg-electric-violet-25
        ">
            
            <div className="flex justify-between items-center w-full">
                <h1 className="text-title-1 lg:text-headline-4 text-neutral-900 ">
                    Today's Lessons
                </h1>

                <MyScheduleBtn />
            </div>

            <div className="w-full">
                <CardList 
                    cards={studentDashboardData.todayLessons}
                    currentLesson={currentLesson}
                    direction={direction}
                />
            </div>

            <Controls
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                setDirection={setDirection}
                total={studentDashboardData.todayLessons.length}
            />
            
        </div>
    )
}