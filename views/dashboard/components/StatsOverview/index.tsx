"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Card from "./Card"

export default function StatsOverview({
    stats
}: {
    stats: {
        label: "Completed Lessons" | "Scheduled Lessons" | "Skipped Lessons" | "Goal"
        value: number
    }[]
}) {
    return (
        <div className="w-full py-5 px-4 md:px-20 md:py-[60px]">
            {/* Mobile/Tablet: Swiper */}
            <div className="md:hidden">
                <Swiper
                    spaceBetween={20}
                    slidesPerView="auto"
                    className="!pb-0"
                >
                    {stats.map((value, index) => (
                        <SwiperSlide key={index} className="!w-[132px] !h-[148px]">
                            <Card 
                                label={value.label}
                                value={value.value}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop: Full size flex layout */}
            <div className="hidden md:flex w-full justify-center items-center gap-5">
                {stats.map((value, index) => (
                    <div key={index} className="flex-1">
                        <Card 
                            label={value.label}
                            value={value.value}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}