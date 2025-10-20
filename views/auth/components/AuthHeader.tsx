import { AUTH_TYPES } from "../types/auth.enum"

export default function AuthHeader({
    type = AUTH_TYPES.SIGNIN
}: {
    type?: AUTH_TYPES
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-2">       
            <div className="text-headline-2 text-deep-royal-indigo-900">
                { type === AUTH_TYPES.SIGNIN && "Log In" }
                { type === AUTH_TYPES.TUTOR_SIGNUP && "Sign up as a tutor"}
            </div>


            <div className="flex gap-x-2 text-neutral-400 text-body-2">
                { type === AUTH_TYPES.SIGNIN && (
                    <>
                        <span className="underline cursor-pointer">
                            Sign up as a student
                        </span>
                        <span>or</span>
                        <span className="underline cursor-pointer">
                            Sign up as a tutor
                        </span>
                    </>
                )}

                { type === AUTH_TYPES.TUTOR_SIGNUP && (
                    <>
                        <span>
                            Already have an account?
                        </span>
                        <span className="underline cursor-pointer">
                            Log in
                        </span>
                    </>
                )}
            </div>

        </div>

    )
}