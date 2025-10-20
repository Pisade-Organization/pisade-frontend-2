"use client"
import Image from "next/image"
import { FolderIcon, EclipseIcon, StarIcon, TargetIcon, RocketIcon } from "@/components/icons"
export default function HeroBanner() {
    return (
        <div className="relative w-full overflow-hidden 2xl:rounded-2xl">
            <div className="hidden lg:block absolute w-full h-[252px] inset-0 -z-10 wallpaper-hero"></div>
            <Image 
                src="/images/tutor-detail/mobile-banner.png"
                alt="mobile-banner"
                width={376}
                height={154}
                className="w-full h-[154px] lg:hidden"
            />
            <div
                className="
                absolute bottom-0 w-full h-[100px] lg:h-[215px]    
                bg-gradient-to-t from-white to-[rgba(41,6,34,0)]
                "
            />

            {/* MOBILE */}
            <FolderIcon 
                width={80}
                height={80}
                className="lg:hidden absolute top-0 left-0 blur-sm -rotate-[25deg]"
                alt="Folder Icon"
            />

            <EclipseIcon
                width={801}
                height={182}
                className="lg:hidden w-[801px] h-[182px] absolute top-0 -right-96"
                alt="Eclipse Icon"
            />

            <StarIcon
                width={20}
                height={20}
                className="lg:hidden w-5 h-5 absolute top-8 right-5 blur-[2px] -rotate-[15deg]"
                alt="Star Icon"
            />

            {/* DESKTOP */}
            <EclipseIcon
                width={1007}
                height={225.25}
                className=" hidden lg:block absolute w-[1007px] h-[225.25px] -bottom-20 -left-80 -rotate-[9.07deg]"
                alt="Eclipse Icon"
            />

            <StarIcon
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 top-10 left-44 -rotate-[15deg] blur-[2px]"
                alt="Star Icon"
            />

            <FolderIcon
                width={90}
                height={90}
                className="hidden lg:block absolute w-[90px] h-[90px] left-[22rem] top-0 -rotate-[24.35deg] blur-sm"
                alt="Folder Icon"
            />

            <StarIcon
                width={40}
                height={40}
                className="hidden lg:block absolute w-10 h-10 top-20 left-[30rem] -rotate-[0.66deg]"
                alt="Star Icon"
            />

            <StarIcon
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 top-36 left-[28rem] blur-[2px]"
                alt="Star Icon"
            />

            <StarIcon
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 right-[27rem] bottom-10 -rotate-[15deg] blur-[2px]"
                alt="Star Icon"
            />

            <TargetIcon
                width={105.37}
                height={105.37}
                className="hidden lg:block absolute top-10 right-72 w-[105.37px] h-[105.37px]"
                alt="Target Icon"
            />

            <EclipseIcon
                width={1007}
                height={209}
                className="hidden lg:block absolute top-5 -right-[35rem] w-[1007px] h-[209px]"
                alt="Eclipse Icon"
            />

            <StarIcon
                width={40}
                height={40}
                className="hidden lg:block absolute w-10 h-10 top-20 right-32"
                alt="Star Icon"
            />

            <StarIcon
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 bottom-10 right-48 -rotate-[15deg] blur-[2px]"
                alt="Star Icon"
            />

            <RocketIcon
                width={126}
                height={126}
                className="hidden lg:block absolute w-[126px] h-[126px] bottom-0 right-0 blur-sm"
                alt="Rocket Icon"
            />

        </div>
    )
}