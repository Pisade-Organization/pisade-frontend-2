"use client"
import Image from "next/image"

export default function FooterLogo() {
    return (
        <div className="flex flex-col justify-center items-start gap-y-2">

            <Image 
                src="/logos/pisade.svg" 
                width={109}
                height={36}
                alt="Pisade logo"
                className="w-[97px] h-[32px] lg:w-[109px] lg:h-[36px]"
            />

            <div className="text-white text-body-3 lg:text-body-2  ">
                Find the perfect online tutor in seconds
            </div>

        </div>
    )
}