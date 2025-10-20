import BaseButton from "@/components/base/BaseButton"
import { Heart } from "lucide-react"

export default function LikeBtn() {
    return (
        <BaseButton variant="secondary" typeStyle="outline">
            <Heart size={24} />
        </BaseButton>
    )
}