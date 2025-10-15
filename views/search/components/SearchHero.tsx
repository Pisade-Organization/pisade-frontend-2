"use client"

import SearchNavbar from "../../../components/Navbar"
import SearchInput from "./SearchInput"
import Image from "next/image"
import { motion } from "framer-motion"


export default function SearchHero() {

    const firstText = "Find the perfect";
    const secondText = "online tutor in seconds";

    const container = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.05,
        delayChildren: delay, // delay before letters start animating
        },
    },
    });

    const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    };


    return (
        <div className="w-full h-[350px] lg:h-[632px] relative overflow-hidden wallpaper-hero">
            <SearchNavbar />

            <div
                className="absolute w-full md:h-[100px] lg:h-[180px] bottom-0"
                style={{
                    background: "linear-gradient(360deg, #FFFFFF 0%, rgba(41, 6, 34, 0) 100%)"
                }}
            >

            </div>


            {/* ALL THE ICONS */}
            
            {/* lEFT */}

            {/* PEOPLE */}
            <div className="hidden lg:absolute left-14 top-[43%]">
                <Image
                    src="/icons/common/people.svg"
                    alt="people"
                    width={80}
                    height={80}
                />
            </div>

            {/* CHART */}
            <div className="hidden lg:absolute -left-[50px] -bottom-8">
                <Image
                    className="blur-sm"
                    src="/icons/common/chart-growth.svg"
                    alt="star"
                    width={140}
                    height={140}
                />
            </div>

           {/* ELLIPSE */}
            <div className="absolute -left-[20rem] -bottom-20 lg:-left-[45rem] lg:-bottom-28">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <Image
                    src="/icons/common/eclipse.svg"
                    alt="ellipse"
                    width={1007}
                    height={381}
                    className="w-[460px] h-[174px] lg:w-[1007px] lg:h-[381px]"
                    />

                    {/* Folder relative to ellipse */}
                    <div className="absolute -right-4 top-2">
                    <Image
                        src="/icons/common/folder.svg"
                        alt="folder"
                        width={164}
                        height={164}
                        className="w-[85px] h-[85px] lg:w-[164px] lg:h-[164px]"
                    />
                    </div>
                </div>
            </div>

            {/* RIGHT */}

            {/* ECLIPSE */}
            <div className="absolute top-20 lg:top-28 -right-[20rem] lg:-right-[50rem]">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <Image
                    src="/icons/common/eclipse-2.svg"
                    alt="ellipse"
                    width={1007}
                    height={229}
                    className="w-[443px] h-[101px] lg:w-[1007px] lg:h-[229px]"
                    />

                    <div className="absolute -left-8 -top-2 lg:-left-14 lg:top-2">
                        <Image
                        src="/icons/common/book.svg"
                        alt="book"
                        width={150}
                        height={150}
                        className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]"

                        />
                    </div>

                    <div className="absolute -bottom-1 left-12 lg:left-28">
                        <Image
                        src="/icons/common/target.svg"
                        alt="target"
                        width={80}
                        height={80}
                        className="w-10 h-10 lg:w-20 lg:h-20"
                        />
                    </div>
                </div>
            </div>

            {/* STAR */}
            <div className="absolute -bottom-8 right-5 lg:right-24 lg:-bottom-9">
                <Image
                    src="/icons/common/star.svg"
                    alt="star"
                    width={212}
                    height={212}
                    className="w-[112.36px] h-[112.36px] lg:w-[212px] lg:h-[212px] blur-[8px] rotate-[15deg]"
                />
            </div>

            {/* MOBILE STAR 1 */}
            <div className="lg:hidden absolute top-32 left-1/2 translate-x-1/4">
                <Image
                    src="/icons/common/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                />
            </div>

            {/* MOBILE STAR 2 */}
            <div className="lg:hidden absolute top-24 left-1/3">
                <Image
                    src="/icons/common/star.svg"
                    alt="star"
                    width={15}
                    height={15}
                />
            </div>


            <div className="w-full flex flex-col justify-center items-center py-20 lg:py-14 gap-y-8">

                {/* TITLE */}
                <div className="w-full flex justify-center items-center flex-col leading-[1.4] text-headline-2 lg:text-headline-1">

                    <div className="relative text-white text-center font-bold">
                        <motion.span
                        variants={container(0)} // no delay
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                        >
                        {firstText.split("").map((char, i) => (
                            <motion.span key={i} variants={letter} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                        </motion.span>

                        {/* DESKTOP STAR */}
                        <div className="hidden lg:block absolute -right-16 top-1">
                            <Image
                                src="/icons/common/star.svg"
                                alt="star"
                                width={40}
                                height={40}
                            />
                        </div>
                        
                        {/* MOBILE PEOPLE */}
                        <div className="lg:hidden absolute -left-14 -top-8">
                            <Image
                                src="/icons/common/people.svg"
                                alt="people"
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>
                    
                    <div className="relative block font-bold text-center bg-gradient-to-r from-[#E0C9FD] to-[#CCA3FF] bg-clip-text text-transparent">
                        <motion.span
                        variants={container(1.2)} // add delay so it starts after first finishes
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                        >
                        {secondText.split("").map((char, i) => (
                            <motion.span key={i} variants={letter} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                        </motion.span>

                        <div className="hidden lg:block absolute -bottom-8 -left-80">
                        <Image
                            src="/icons/common/star.svg"
                            alt="star"
                            width={20}
                            height={20}
                        />
                        </div>
                    </div>
                </div>

                {/* SEARCH BAR */}
                <SearchInput />



            </div>
        </div>
    )
}