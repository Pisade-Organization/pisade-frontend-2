"use client"

import SearchNavbar from "./Navbar"
import SearchInput from "./SearchInput"
import Image from "next/image"
import { motion } from "framer-motion"


export default function SearchHero() {

    const firstText = "Find the perfect";
    const secondText = "Thai tutor in seconds";

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
        <div className="w-full h-screen md:h-[632px] relative overflow-hidden wallpaper-hero">
            <SearchNavbar />

            <div
                className="absolute w-full h-[180px] bottom-0"
                style={{
                    background: "linear-gradient(360deg, #FFFFFF 0%, rgba(41, 6, 34, 0) 100%)"
                }}
            >

            </div>


            {/* ALL THE ICONS */}
            
            {/* lEFT */}

            {/* PEOPLE */}
            <div className="absolute left-14 top-[43%]">
                <Image
                    src="/icons/common/people.svg"
                    alt="people"
                    width={80}
                    height={80}
                />
            </div>

            {/* CHART */}
            <div className="absolute -left-[50px] -bottom-8">
                <Image
                    className="blur-sm"
                    src="/icons/common/chart-growth.svg"
                    alt="star"
                    width={140}
                    height={140}
                />
            </div>

           {/* ELLIPSE */}
            <div className="absolute -left-[45rem] -bottom-28">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <Image
                    src="/icons/common/eclipse.svg"
                    alt="ellipse"
                    width={1007}
                    height={381}
                    />

                    {/* Folder relative to ellipse */}
                    <div className="absolute -right-4 top-2">
                    <Image
                        src="/icons/common/folder.svg"
                        alt="folder"
                        width={164}
                        height={164}
                    />
                    </div>
                </div>
            </div>

            {/* RIGHT */}

            {/* ECLIPSE */}
            <div className="absolute top-24 -right-[50rem]">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <Image
                    src="/icons/common/eclipse-2.svg"
                    alt="ellipse"
                    width={1007}
                    height={229}
                    />

                    <div className="absolute -left-14 top-2">
                        <Image
                        src="/icons/common/book.svg"
                        alt="book"
                        width={150}
                        height={150}
                        />
                    </div>

                    <div className="absolute -bottom-1 left-28">
                        <Image
                        src="/icons/common/target.svg"
                        alt="book"
                        width={80}
                        height={80}
                        />
                    </div>
                </div>
            </div>

            {/* STAR */}
            <div className="absolute right-24 -bottom-9">
                <Image
                    className="blur-[8px] rotate-[15deg]"
                    src="/icons/common/star.svg"
                    alt="star"
                    width={212}
                    height={212}
                />
            </div>


            <div className="w-full flex flex-col justify-center items-center py-14 gap-y-8">

                {/* TITLE */}
                <div className="w-full flex justify-center items-center flex-col text-[60px] leading-[1.4]">

                    <div className="relative text-white text-center font-headline-1 font-bold">
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

                        <div className="absolute -right-16 top-[1.35rem]">
                        <Image
                            src="/icons/common/star.svg"
                            alt="star"
                            width={40}
                            height={40}
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

                        <div className="absolute -bottom-8 -left-40">
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