"use client"
import { useTranslations } from "next-intl"
import { AUTH_TYPES } from "../types/auth.enum"
import { usePathname, useRouter } from "next/navigation"

export default function AuthHeader({
    type = AUTH_TYPES.SIGNIN
}: {
    type?: AUTH_TYPES
}) {
    const t = useTranslations("auth.signIn")
    const router = useRouter()
    const pathname = usePathname()
    const locale = pathname?.split("/")[1] || "en"

    const signinPath = `/${locale}/signin`
    const tutorSignupPath = `/${locale}/tutor/signup`

    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-2">
            <div className="text-headline-2 text-deep-royal-indigo-900">
                { type === AUTH_TYPES.SIGNIN && t("title") }
                { type === AUTH_TYPES.TUTOR_SIGNUP && t("tutorSignupTitle")}
            </div>


            <div className="flex gap-x-2 text-neutral-400 text-body-2">
                { type === AUTH_TYPES.SIGNIN && (
                    <>
                        <span className="">
                            {t("wantToTeach")}
                        </span>
                        <span className="underline cursor-pointer" onClick={() => router.push(tutorSignupPath)}>
                            {t("signUpAsTutor")}
                        </span>
                    </>
                )}

                { type === AUTH_TYPES.TUTOR_SIGNUP && (
                    <>
                        <span>
                            {t("alreadyHaveAccount")}
                        </span>
                        <span className="underline cursor-pointer" onClick={() => router.push(signinPath)}>
                            {t("logIn")}
                        </span>
                    </>
                )}
            </div>

        </div>

    )
}
