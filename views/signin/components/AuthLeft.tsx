"use client"
import Image from "next/image"

export default function AuthLeft() {
    return (
        <div className="flex relative justify-center items-center h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/signin/auth-bg.png')" }}

        >       

            {/* ICONS */}

            {/* BOOK */}
            <div className="absolute top-0 right-0">
                <Image
                    src="/icons/common/book.svg"
                    alt="book"
                    width={150}
                    height={150}
                />
            </div>

            {/* STAR */}
            <div className="absolute top-24 right-48">
                <Image
                    src="/icons/common/star.svg"
                    alt="star"
                    width={40}
                    height={40}
                />
            </div>

            {/* PEOPLE */}
            <div className="absolute bottom-32 left-[4.1rem]">
                <Image
                    src="/icons/common/people.svg"
                    alt="poeple"
                    width={120}
                    height={120}
                />
            </div>

            {/* CHART */}
            <div className="absolute -bottom-8 -left-8 blur-sm">
                <Image
                    src="/icons/common/chart-growth.svg"
                    alt="chart-growth"
                    width={120}
                    height={111.18}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-y-8 mb-12">
                {/* LOGO */}
                <Image src="/logos/pisade.svg" alt="Pisade Logo" width={109} height={36} />

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