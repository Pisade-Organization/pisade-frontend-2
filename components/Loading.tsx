import Lottie from "lottie-react"
import pisadeLoaderLight from "@/public/animation/pisade-loader-light.json"
import pisadeLoaderDark from "@/public/animation/pisade-loader-dark.json"

export default function Loading() {
    return (
        <div className="w-64 h-64">
            <Lottie
                animationData={pisadeLoaderDark}
                loop={true}
            />
        </div>
    )
}