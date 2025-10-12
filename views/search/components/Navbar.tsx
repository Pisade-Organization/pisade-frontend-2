"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import MobileMenu from "./MobileMenu/MobileMenu"

export default function SearchNavbar() {
    const router = useRouter();

    const onSigninClick = () => {
        router.push('/signin')
    }
    return (
        <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 border-b border-[#F5F5F533] ">

            <div className="flex justify-between items-center gap-x-12">
                <Image
                    src="/logos/pisade.svg"
                    alt="Pisade Logo"
                    width={109}
                    height={36}
                    priority
                />

                <div className="hidden lg:flex justify-between gap-x-9 text-white text-body-2 items-center">
                    <div className="cursor-pointer">
                        Home
                    </div>

                    <div className="cursor-pointer opacity-80">
                        Find tutors
                    </div>

                    <div className="cursor-pointer opacity-80">
                        Become a tutor
                    </div>
                    
                    <div className="cursor-pointer opacity-80">
                        Plans
                    </div>
                </div>

            </div>

            <div className="hidden lg:flex justify-between items-center text-white gap-x-2 text-label-3">

                {/* Languages */}
                <button
                    className="w-[76px] h-[45px] rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
                    style={{
                        background: "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.534754) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.595) 100%)",
                    }}
                >
                    <div className="bg-black rounded-lg py-[10px] h-full w-full px-3 bg-gradient-to-r from-white/5 to-white/25">
                        <span>EN</span>
                        <ChevronDown size={20} className="inline ml-1" />
                    </div>
                    {/* </div> */}
                </button>

                {/* Sign up */}
                <div className="cursor-pointer py-3 px-4 bg-black rounded-lg">
                    Sign Up
                </div>

                {/* Sign in */}
                <div onClick={onSigninClick} className="cursor-pointer bg-electric-violet-500 py-3 px-4 rounded-lg">
                    Sign In
                </div>


            </div>


            {/* MOBILE NAVBAR */}
            <div className="lg:hidden flex justify-center items-center ">
                
                {/* SEARCH */}
                <button className="w-11 h-11  rounded-lg cursor-pointer flex justify-center items-center p-[1px]">
                    <Search width={20} height={20} color={'white'} />
                </button>
                
                {/* MENU */}
                <MobileMenu />
            </div>

        </nav>
    )
}