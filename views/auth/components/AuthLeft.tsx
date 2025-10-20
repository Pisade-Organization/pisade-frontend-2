"use client"
import Image from "next/image"
import { BookIcon, StarIcon, PeopleIcon, ChartGrowthIcon, PisadeLogo } from "@/components/icons"

export default function AuthLeft() {
    return (
        <div className="flex relative justify-center items-center h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/signin/auth-bg.png')" }}

        >       

            {/* ICONS */}

            {/* BOOK */}
            <div className="absolute top-0 right-0">
                <BookIcon
                    width={150}
                    height={150}
                    alt="book"
                />
            </div>

            {/* STAR */}
            <div className="absolute top-24 right-48">
                <StarIcon
                    width={40}
                    height={40}
                    alt="star"
                />
            </div>

            {/* PEOPLE */}
            <div className="absolute bottom-32 left-[4.1rem]">
                <PeopleIcon
                    width={120}
                    height={120}
                    alt="people"
                />
            </div>

            {/* CHART */}
            <div className="absolute -bottom-8 -left-8 blur-sm">
                <ChartGrowthIcon
                    width={120}
                    height={111.18}
                    alt="chart-growth"
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-y-8 mb-12">
                {/* LOGO */}
                <PisadeLogo width={109} height={36} alt="Pisade Logo" />

                {/* TITLE */}
                <div className="text-center text-4xl xl:text-5xl font-bold flex flex-col gap-y-4">
                    <div className="text-white">Find the perfect</div>
                    <div className="bg-gradient-to-r from-[#E0C9FD] to-[#CCA3FF] bg-clip-text text-transparent">
                        online tutor in seconds
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="text-white text-center text-body-2">
                    <div>Stop searching. Start speaking.</div>
                    <div>Your first lesson is waiting.</div>

                </div>

            </div>
        </div>
    )
}