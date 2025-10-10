"use client"
import { useState } from "react"
import Image from "next/image";
import { z } from "zod";
import AuthTermsNotice from "./AuthTermsNotice";

export default function AuthForm() {
    const [isLoginActive, setisLoginActive] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    return (
        <form className="px-5 lg:px-0 max-w-[422px] w-full flex flex-col justify-start items-center gap-y-4">

            <div className="w-full flex flex-col gap-y-1 ">
                {/* EMAIL */}
                <div className="w-full flex flex-col gap-y-2 mb-4">
                    <label htmlFor="email" className="text-label-2 text-neutral-800">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                        <input
                            id="email"
                            type="text"
                            name="email"
                            className="w-full outline-none border border-neutral-100 fill-white px-4 py-3 rounded-xl"
                            placeholder="Enter your email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                                const value = e.target.value;
                                setEmail(value);
                                const isValid = z.string().email().safeParse(value).success;
                                setisLoginActive(isValid);
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* BUTTONS + TERMS */}
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <button className={`w-full py-3 px-5 rounded-lg text-center text-label-2 text-white bg-deep-royal-indigo-700 transition-all duration-200 ${isLoginActive ? 'opacity-100' : 'opacity-50'}`}>
                    Log In
                </button>

                <div className="text-neutral-700 text-body-2" >
                    or
                </div>

                <button
                    className="flex items-center justify-center gap-x-2 border w-full py-3 px-5 rounded-lg text-center text-label-2 border-deep-royal-indigo-700 transition-all duration-200 hover:bg-deep-royal-indigo-700 hover:text-white group"
                >
                    <Image
                        src="/icons/common/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                    />
                    <span className="text-deep-royal-indigo-700 font-medium transition-colors duration-200 group-hover:text-white">
                        Continue with Google
                    </span>
                </button>

                <div className="w-full hidden lg:block">
                    <AuthTermsNotice />
                </div>
            </div>
            


        </form>
    )
}
