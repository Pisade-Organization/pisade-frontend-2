"use client"
import { useState } from "react"
import { z } from "zod";
import { AuthService } from "@/services/auth";
import AuthTermsNotice from "./AuthTermsNotice";
import GoogleButton from "./GoogleButton";
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import { usePathname } from "next/navigation";
interface AuthFormProps {
    setEmailTo: (email: string) => void;
    setIsEmailSent: (value: boolean) => void;
}

export default function AuthForm({ setEmailTo, setIsEmailSent }: AuthFormProps) {
    const pathname = usePathname();
    const [isLoginActive, setisLoginActive] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const isTutorSignup = pathname === "/en/tutor/signup" || pathname === "/th/tutor/signup"
    
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            
            if(isTutorSignup) {
                await AuthService.sendMagicLink({ email, intent: "TUTOR_SIGNUP" })
            } else {
                await AuthService.sendMagicLink({ email });
            }
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

            <BaseInput
                id="email"
                type="text"
                name="email"
                title="Email"
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
                errorMessage={error}
            />
            
            {/* BUTTONS + TERMS */}
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <BaseButton 
                    type="submit"
                    disabled={!isLoginActive || loading}
                    className="w-full"
                    variant="secondary"
                >
                    {loading ? 'Sending...' : 'Log In'}
                </BaseButton>

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
