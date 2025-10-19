"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Card({
    label,
    value
}: {
    label: "Completed Lessons" | "Scheduled Lessons" | "Skipped Lessons" | "Goal",
    value: number
}) {

    const icons = {
        "Completed Lessons": {
            path: "/icons/student-dashboard/completed_lessons.svg",
            mobileSize: {
                width: 27.75,
                height: 30
            },
            desktopSize: {
                width: 56,
                height: 56,
            }
        },
        "Scheduled Lessons": {
            path: "/icons/student-dashboard/scheduled_lessons.svg",
            mobileSize: {
                width: 38,
                height: 38,
            },
            desktopSize: {
                width: 56,
                height: 56,
            }
        },
        "Skipped Lessons": {
            path: "/icons/student-dashboard/skipped_lessons.svg",
            mobileSize: {
                width: 31.04,
                height: 32,
            },
            desktopSize: {
                width: 56,
                height: 56,
            },
        },
        "Goal": {
            path: "/icons/student-dashboard/goal.svg",
            mobileSize: {
                width: 30.75,
                height: 33.82
            },
            desktopSize: {
                width: 56,
                height: 56,
            },
        }
    }
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 px-4 lg:px-5 py-3 lg:py-4">

            <div className="w-12 h-12 lg:w-[72px] lg:h-[72px] rounded-full bg-electric-violet-50
                flex justify-center items-center
            ">
                <Image 
                    src={icons[label].path}
                    alt={`${label} Logo`}
                    width={56}
                    height={56}
                    className={`
                        w-[${icons[label].mobileSize.width}]
                        h-[${icons[label].mobileSize.height}]
                        lg:w-[${icons[label].desktopSize.width}]
                        lg:h-[${icons[label].desktopSize.height}]
                    `}

                />
            </div>

            <div className="flex flex-col justify-between items-start">
                <h3 className="text-body-2 text-neutral-700">{label}</h3>

                <h2 className="text-headline-3 text-electric-violet-500">{value}</h2>
            </div>


        </div>
    )
}