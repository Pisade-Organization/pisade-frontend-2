import AuthLeft from "./AuthLeft"
import AuthRight from "./AuthRight"
import AuthNavbar from "./AuthNavbar"

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            
            <div className="w-1/2 h-screen hidden lg:block">
                <AuthLeft />
            </div>

            <div className="relative w-full lg:w-1/2 h-screen">
                {/* MOBILE NAVBAR */}
                <div className="lg:hidden w-full absolute top-0">
                    <AuthNavbar />
                </div>

                <AuthRight />
            </div>
        </div>
    )
}