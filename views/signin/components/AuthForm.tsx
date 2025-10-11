"use client"
import { useState } from "react"
import Image from "next/image";
import { z } from "zod";
import { AuthService } from "@/services/auth";
import AuthTermsNotice from "./AuthTermsNotice";
import GoogleButton from "./GoogleButton";

interface AuthFormProps {
    setEmailTo: (email: string) => void;
    setIsEmailSent: (value: boolean) => void;
}

export default function AuthForm({ setEmailTo, setIsEmailSent }: AuthFormProps) {
    const [isLoginActive, setisLoginActive] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await AuthService.sendMagicLink({ email });
            setEmailTo(email);
            setIsEmailSent(true);
        } catch (err: any) {
            console.error(err);
            setError("Failed to send magic link.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="px-5 lg:px-0 max-w-[422px] w-full flex flex-col justify-start items-center gap-y-4">

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

            {/* ERROR MESSAGE */}
            {error && (
                <div className="w-full text-center text-red-500 text-body-3">
                    {error}
                </div>
            )}
            
            {/* BUTTONS + TERMS */}
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <button 
                    type="submit"
                    disabled={!isLoginActive || loading}
                    className={`w-full py-3 px-5 rounded-lg text-center text-label-2 text-white bg-deep-royal-indigo-700 transition-all duration-200 ${isLoginActive && !loading ? 'opacity-100' : 'opacity-50'}`}
                >
                    {loading ? 'Sending...' : 'Log In'}
                </button>

                <div className="text-neutral-700 text-body-2" >
                    or
                </div>

                <GoogleButton />

                <div className="w-full hidden lg:block">
                    <AuthTermsNotice />
                </div>
            </div>
            


        </form>
    )
}
