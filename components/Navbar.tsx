"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import MobileMenu from "./MobileMenu/MobileMenu"
import BaseButton from "./base/BaseButton"
import { MessageCircle } from "lucide-react"
import { Bell } from "lucide-react"

type NavbarProps = {
    variant?: "search" | "default" | "student_dashboard" | "tutor_dashboard"
}

export default function Navbar({ variant = "default" }: NavbarProps) {
    const router = useRouter();

    const onLogoClick = () => {
        router.push('/')
    }
    const onSigninClick = () => {
        router.push('/signin')
    }
    const isSearch = variant === "search";

    if (isSearch) {
        return (
            <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-transparent absolute top-0 left-0 right-0 z-50 ">

                <div className="flex justify-between items-center gap-x-12">
                    <Image
                        onClick={onLogoClick}
                        src={"/logos/pisade.svg"}
                        alt="Pisade Logo"
                        width={109}
                        height={36}
                        priority
                        className="cursor-pointer"
                    />
                </div>

                <div className="hidden lg:flex justify-between items-center text-white gap-x-2 text-label-3">

                    {/* Languages */}
                    <button
                        className="rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
                        style={{
                            background: "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.534754) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.595) 100%)",
                        }}
                    >
                        <div className="bg-black rounded-[8px]  px-4 py-3.5 bg-gradient-to-r from-white/5 to-white/25">
                            <span>EN</span>
                            <ChevronDown size={20} className="inline ml-1" />
                        </div>
                    </button>

                    <BaseButton variant="secondary" typeStyle="outline" className="text-white border-white border-opacity-50 hover:bg-transparent">
                        Become a tutor
                    </BaseButton>

                    {/* Sign in */}
                    <BaseButton 
                        onClick={onSigninClick}>
                        Sign In
                    </BaseButton>


                </div>


                {/* MOBILE NAVBAR */}
                <div className="lg:hidden flex justify-center items-center ">
                    
                    {/* SEARCH */}
                    <button className="w-11 h-11  rounded-lg cursor-pointer flex justify-center items-center p-[1px]">
                        <Search width={20} height={20} color={'white'} />
                    </button>
                    
                    {/* MENU */}
                    <MobileMenu variant={variant}/>
                </div>

            </nav>
        )
    }

    // Default variant placeholder for you to customize
    return (
        <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 border-b border-[#E5E7EB] bg-white">
            <div className="flex items-center gap-x-20">
                <Image
                    onClick={onLogoClick}
                    src="/logos/pisade-dark.svg"
                    alt="Pisade Logo"
                    width={109}
                    height={36}
                    priority
                    className="cursor-pointer"
                />

                {variant === "student_dashboard" && (
                    <>
                        <div className="flex justify-center items-center gap-7">
                            <div>Class</div>
                            <div>Schedule</div>
                        </div>
                    </>
                )}

            </div>

            <div className="hidden lg:flex items-center gap-x-3">
                <BaseButton variant="secondary" typeStyle="outline">
                    <span>EN</span>
                    <ChevronDown size={20} className="inline ml-1" />
                </BaseButton>

                {/* NOT SIGNED IN */}
                {variant === "default" && (
                    <>
                        {/* Replace with your default variant actions/links */}
                        <BaseButton variant="secondary" typeStyle="borderless">Sign Up</BaseButton>
                        <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
                    </>
                )}

                {/* MOCK STUDENT DASHBOARD */}
                {/* MOCK SIGNIN */}
                {variant === "student_dashboard" && (
                    <>
                        <div className="flex justify-center items-center">
                            <button className="w-11 h-11">
                                <MessageCircle size={22} className="text-neutral-700"/>
                            </button>

                            <button>
                                <Bell size={22} className="text-neutral-700" />
                            </button>
                        </div>

                        <Image 
                            src="/logos/pisade.svg"
                            alt="Profile picture"
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full"
                        />
                    </>
                )}

            </div>

            
            <div className="lg:hidden flex items-center">
                <MobileMenu variant={variant}/>
            </div>
        </nav>
    )
}