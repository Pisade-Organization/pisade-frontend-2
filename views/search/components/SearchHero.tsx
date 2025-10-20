"use client"

import SearchNavbar from "../../../components/Navbar"
import SearchInput from "./SearchInput"
import Image from "next/image"
import { motion } from "framer-motion"
import Navbar from "../../../components/Navbar"
import { PeopleIcon, ChartGrowthIcon, EclipseIcon, Eclipse2Icon, FolderIcon, BookIcon, TargetIcon, StarIcon } from "@/components/icons"


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
        <div className="py-14 w-full h-[350px] lg:h-[632px] relative overflow-hidden wallpaper-hero">
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
                <PeopleIcon
                    width={80}
                    height={80}
                    alt="people"
                />
            </div>

            {/* CHART */}
            <div className="hidden lg:absolute -left-[50px] -bottom-8">
                <ChartGrowthIcon
                    className="blur-sm"
                    width={140}
                    height={140}
                    alt="chart growth"
                />
            </div>

           {/* ELLIPSE */}
            <div className="absolute -left-[20rem] -bottom-20 lg:-left-[45rem] lg:-bottom-28">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <EclipseIcon
                    width={1007}
                    height={381}
                    className="w-[460px] h-[174px] lg:w-[1007px] lg:h-[381px]"
                    alt="ellipse"
                    />

                    {/* Folder relative to ellipse */}
                    <div className="absolute -right-4 top-2">
                    <FolderIcon
                        width={164}
                        height={164}
                        className="w-[85px] h-[85px] lg:w-[164px] lg:h-[164px]"
                        alt="folder"
                    />
                    </div>
                </div>
            </div>

            {/* RIGHT */}

            {/* ECLIPSE */}
            <div className="absolute top-20 lg:top-28 -right-[20rem] lg:-right-[50rem]">
                {/* Make this relative + shrink-wrap to image size */}
                <div className="relative inline-block">
                    <Eclipse2Icon
                    width={1007}
                    height={229}
                    className="w-[443px] h-[101px] lg:w-[1007px] lg:h-[229px]"
                    alt="ellipse"
                    />

                    <div className="absolute -left-8 -top-2 lg:-left-14 lg:top-2">
                        <BookIcon
                        width={150}
                        height={150}
                        className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]"
                        alt="book"
                        />
                    </div>

                    <div className="absolute -bottom-1 left-12 lg:left-28">
                        <TargetIcon
                        width={80}
                        height={80}
                        className="w-10 h-10 lg:w-20 lg:h-20"
                        alt="target"
                        />
                    </div>
                </div>
            </div>

            {/* STAR */}
            <div className="absolute -bottom-8 right-5 lg:right-24 lg:-bottom-9">
                <StarIcon
                    width={212}
                    height={212}
                    className="w-[112.36px] h-[112.36px] lg:w-[212px] lg:h-[212px] blur-[8px] rotate-[15deg]"
                    alt="star"
                />
            </div>

            {/* MOBILE STAR 1 */}
            <div className="lg:hidden absolute top-32 left-1/2 translate-x-1/4">
                <StarIcon
                    width={20}
                    height={20}
                    alt="star"
                />
            </div>

            {/* MOBILE STAR 2 */}
            <div className="lg:hidden absolute top-24 left-1/3">
                <StarIcon
                    width={15}
                    height={15}
                    alt="star"
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
                            <StarIcon
                                width={40}
                                height={40}
                                alt="star"
                            />
                        </div>
                        
                        {/* MOBILE PEOPLE */}
                        <div className="lg:hidden absolute -left-14 -top-8">
                            <PeopleIcon
                                width={60}
                                height={60}
                                alt="people"
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
                        <StarIcon
                            width={20}
                            height={20}
                            alt="star"
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