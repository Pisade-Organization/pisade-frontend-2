"use client"
import { MailCheck } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { AuthService } from "@/services/auth"

interface AuthVerifyEmailProps {
    emailTo: string;
    onBack: () => void;
}

export default function AuthVerifyEmail({ emailTo, onBack }: AuthVerifyEmailProps) {
    const [countdown, setCountdown] = useState(30);
    const [isResendActive, setIsResendActive] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendActive(true);
        }
    }, [countdown]);

    const handleResend = async () => {
        if (isResendActive) {
            try {
                // Reset countdown and disable resend
                setCountdown(30);
                setIsResendActive(false);
                
                // Call your backend to resend the email
                await AuthService.sendMagicLink({ email: emailTo });
                console.log("Magic link resent successfully to:", emailTo);
            } catch (error) {
                console.error("Failed to resend magic link:", error);
                // Re-enable the button on error
                setIsResendActive(true);
                setCountdown(0);
            }
        }
    };

    return (
        <div className="px-5 w-full h-screen flex flex-col justify-center items-center gap-y-10 relative">

            <div className="w-full flex flex-col justify-center items-center gap-y-4">
                <MailCheck width={80} height={80} className="text-electric-violet-100"/>

                <div className="max-w-[504px] w-full flex flex-col justify-center items-center gap-y-3 ">
                    <div className="text-headline-4 lg:text-headline-2 text-deep-royal-indigo-900">
                        Verify your email
                    </div>

                    <div className="text-body-3 lg:text-body-2 text-neutral-500 text-center">
                        We have sent you an email to <span className="text-neutral-900">{emailTo}</span> that
                        contains a link to continue.
                    </div>
                </div>
            </div>

            <div className="max-w-[503px] w-full text-center">
                <span className="text-body-3 lg:text-body-2 text-neutral-500">
                    Don't receive the email? Please check your spam or{' '}
                </span>
                <button 
                    onClick={handleResend}
                    disabled={!isResendActive}
                    className={`text-label-3 lg:text-label-2 transition-all inline ${
                        isResendActive 
                            ? 'text-neutral-900 underline hover:opacity-80 cursor-pointer' 
                            : 'text-neutral-500 opacity-50 cursor-not-allowed'
                    }`}
                >
                    Resend link {isResendActive ? '' : `(${countdown}s)`}
                </button>
            </div>

            {/* Back to Sign In button - positioned differently on mobile vs desktop */}
            <div className="w-full flex justify-center absolute bottom-8 lg:static lg:bottom-auto mt-10">
                <button 
                    onClick={onBack}
                    className="cursor-pointer flex items-center gap-2 text-label-2 text-deep-royal-indigo-700 hover:opacity-80 transition-all duration-200"
                >
                    <ArrowLeft width={20} height={20} className="text-neutral-700" />
                    Back to Sign In
                </button>
            </div>
        </div>
    )
}