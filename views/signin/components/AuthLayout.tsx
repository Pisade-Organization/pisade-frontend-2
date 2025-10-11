"use client"
import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"
import AuthLeft from "./AuthLeft"
import AuthRight from "./AuthRight"
import AuthNavbar from "./AuthNavbar"
import AuthVerifyEmail from "./AuthVerifyEmail"

export default function AuthLayout() {
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [emailTo, setEmailTo] = useState<string>('');

    return (
        <div className="min-h-screen flex justify-center items-center overflow-x-hidden">
            
            <div className="w-1/2 h-screen hidden lg:block">
                <AuthLeft />
            </div>

            <div className="relative w-full lg:w-1/2 h-screen">
                {/* MOBILE NAVBAR */}
                <div className="lg:hidden w-full absolute top-0">
                    <AuthNavbar />
                </div>

                <AnimatePresence mode="wait">
                    {isEmailSent ? (
                        <motion.div
                        key="verify"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0"
                        >
                        <AuthVerifyEmail
                            emailTo={emailTo}
                            onBack={() => setIsEmailSent(false)}
                        />
                        </motion.div>
                    ) : (
                        <motion.div
                        key="signin"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0"
                        >
                        <AuthRight
                            setIsEmailSent={setIsEmailSent}
                            setEmailTo={setEmailTo}
                        />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}