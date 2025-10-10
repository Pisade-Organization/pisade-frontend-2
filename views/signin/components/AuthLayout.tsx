import AuthLeft from "./AuthLeft"
import AuthRight from "./AuthRight"

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            
            <div className="w-1/2 h-full hidden lg:block">
                <AuthLeft />
            </div>

            <div className="w-full lg:w-1/2 h-full">
                <AuthRight />
            </div>
        </div>
    )
}