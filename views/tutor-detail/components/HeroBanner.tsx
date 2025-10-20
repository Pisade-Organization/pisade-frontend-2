"use client"
import Image from "next/image"
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
            <Image 
                src="/icons/common/folder.svg"
                alt="Folder Icon"
                width={80}
                height={80}
                className="lg:hidden absolute top-0 left-0 blur-sm -rotate-[25deg]"
            />

            <Image
                src="/icons/common/eclipse.svg"
                alt="Eclise Icon"
                width={801}
                height={182}
                className="lg:hidden w-[801px] h-[182px] absolute top-0 -right-96"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={20}
                height={20}
                className="lg:hidden w-5 h-5 absolute top-8 right-5 blur-[2px] -rotate-[15deg]"
            />

            {/* DESKTOP */}
            <Image 
                src="/icons/common/eclipse.svg"
                alt="Eclipse Icon"
                width={1007}
                height={225.25}
                className=" hidden lg:block absolute w-[1007px] h-[225.25px] -bottom-20 -left-80 -rotate-[9.07deg]"
            />

            <Image 
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 top-10 left-44 -rotate-[15deg] blur-[2px]"
            />

            <Image 
                src="/icons/common/folder.svg"
                alt="Folder Icon"
                width={90}
                height={90}
                className="hidden lg:block absolute w-[90px] h-[90px] left-[22rem] top-0 -rotate-[24.35deg] blur-sm"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={40}
                height={40}
                className="hidden lg:block absolute w-10 h-10 top-20 left-[30rem] -rotate-[0.66deg]"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 top-36 left-[28rem] blur-[2px]"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 right-[27rem] bottom-10 -rotate-[15deg] blur-[2px]"
            />

            <Image
                src="/icons/common/target.svg"
                alt="Target Icon"
                width={105.37}
                height={105.37}
                className="hidden lg:block absolute top-10 right-72 w-[105.37px] h-[105.37px]"
            />

            <Image 
                src="/icons/common/eclipse.svg"
                alt="Eclipse Icon"
                width={1007}
                height={209}
                className="hidden lg:block absolute top-5 -right-[35rem] w-[1007px] h-[209px]"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={40}
                height={40}
                className="hidden lg:block absolute w-10 h-10 top-20 right-32"
            />

            <Image
                src="/icons/common/star.svg"
                alt="Star Icon"
                width={20}
                height={20}
                className="hidden lg:block absolute w-5 h-5 bottom-10 right-48 -rotate-[15deg] blur-[2px]"
            />

            <Image 
                src="/icons/common/rocket.svg"
                alt="Rocket Icon"
                width={126}
                height={126}
                className="hidden lg:block absolute w-[126px] h-[126px] bottom-0 right-0 blur-sm"
            />

        </div>
    )
}