

export default function AuthHeader() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-2">       
            <div className="text-headline-2 text-deep-royal-indigo-900">
                Log In 
            </div>

            <div>
            <div className="flex gap-x-2 text-neutral-400 text-body-2">
                <span className="underline cursor-pointer">
                    Sign up as a student
                </span>
                <span>or</span>
                <span className="underline cursor-pointer">
                    Sign up as a tutor
                </span>
            </div>
            </div>
        </div>

    )
}