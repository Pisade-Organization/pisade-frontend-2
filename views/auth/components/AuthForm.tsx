"use client"
import { useState } from "react"
import { z } from "zod";
import { AuthService } from "@/services/auth";
import type { AxiosError } from "axios";
import AuthTermsNotice from "./AuthTermsNotice";
import GoogleButton from "./GoogleButton";
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import { AUTH_TYPES } from "../types/auth.enum";
interface AuthFormProps {
    setEmailTo: (email: string) => void;
    setIsEmailSent: (value: boolean) => void;
    type?: AUTH_TYPES;
}

export default function AuthForm({ setEmailTo, setIsEmailSent, type = AUTH_TYPES.SIGNIN }: AuthFormProps) {
    const [isLoginActive, setisLoginActive] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const isTutorSignup = type === AUTH_TYPES.TUTOR_SIGNUP

    const getMagicLinkErrorMessage = (err: unknown): string => {
        const axiosError = err as AxiosError<{ message?: string | string[] }>;
        const status = axiosError.response?.status;

        if (status === 429) {
            return "Too many attempts, please try again shortly.";
        }

        if (status === 400) {
            return "Invalid email.";
        }

        if (!status || status >= 500) {
            return "Something went wrong, please try again.";
        }

        const message = axiosError.response?.data?.message;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
        if (Array.isArray(message) && message.length > 0) {
            return message[0];
        }

        return "Failed to send magic link.";
    }

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
        } catch (err: unknown) {
            console.error(err);
            setError(getMagicLinkErrorMessage(err));
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
                    {loading ? 'Sending...' : isTutorSignup ? 'Sign up as a tutor' : 'Log In'}
                </BaseButton>

                <div className="text-neutral-700 text-body-2" >
                    or
                </div>

                <GoogleButton authType={type} />

                <div className="w-full hidden lg:block">
                    <AuthTermsNotice />
                </div>
            </div>
            


        </form>
    )
}
