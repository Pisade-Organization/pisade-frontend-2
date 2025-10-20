import AuthHeader from "./AuthHeader"
import AuthForm from "./AuthForm"
import AuthTermsNotice from "./AuthTermsNotice"
import { AUTH_TYPES } from "../types/auth.enum"

interface AuthRightProps {
    setIsEmailSent: (value: boolean) => void;
    setEmailTo: (email: string) => void;
    type?: AUTH_TYPES

}

export default function AuthRight({ setIsEmailSent, setEmailTo, type = AUTH_TYPES.SIGNIN }: AuthRightProps) {
    return (
        <div className="border py-8 lg:py-0 w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-full flex flex-col justify-center items-center gap-y-10 flex-1">


                {/* LOGIN HEADER */}
                <AuthHeader type={type} />

                {/* LOGIN FORM */}
                <AuthForm setEmailTo={setEmailTo} setIsEmailSent={setIsEmailSent}  />
                
            </div>
            <div className="w-full flex justify-center pb-6 lg:hidden">
                <AuthTermsNotice />
            </div>
        </div>
    )
}