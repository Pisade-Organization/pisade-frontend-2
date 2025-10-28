"use client"
import { AUTH_TYPES } from "../types/auth.enum"
import { useRouter } from "next/navigation"

export default function AuthHeader({
    type = AUTH_TYPES.SIGNIN
}: {
    type?: AUTH_TYPES
}) {
    const router = useRouter()
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-2">       
            <div className="text-headline-2 text-deep-royal-indigo-900">
                { type === AUTH_TYPES.SIGNIN && "Log In" }
                { type === AUTH_TYPES.TUTOR_SIGNUP && "Sign up as a tutor"}
            </div>


            <div className="flex gap-x-2 text-neutral-400 text-body-2">
                { type === AUTH_TYPES.SIGNIN && (
                    <>
                        <span className="">
                            Sign up as a student here
                        </span>
                        <span>or</span>
                        <span className="underline cursor-pointer" onClick={() => router.push('tutor/signup')}>
                            Sign up as a tutor
                        </span>
                    </>
                )}

                { type === AUTH_TYPES.TUTOR_SIGNUP && (
                    <>
                        <span>
                            Already have an account?
                        </span>
                        <span className="underline cursor-pointer" onClick={() => router.push('/signin')}>
                            Log in
                        </span>
                    </>
                )}
            </div>

        </div>

    )
}