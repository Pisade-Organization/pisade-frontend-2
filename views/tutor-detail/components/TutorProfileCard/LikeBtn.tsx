import BaseButton from "@/components/base/BaseButton"
import AuthRequiredModal from "@/components/dialogs/AuthRequiredModal"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

interface LikeBtnProps {
    tutorAvatarUrl?: string
}

export default function LikeBtn({ tutorAvatarUrl }: LikeBtnProps) {
    const { status } = useSession()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    const handleClick = () => {
        if (status !== "authenticated") {
            setIsAuthModalOpen(true)
        }
    }

    return (
        <>
            <BaseButton variant="secondary" typeStyle="outline" onClick={handleClick}>
                <Heart size={24} />
            </BaseButton>

            <AuthRequiredModal
                open={isAuthModalOpen}
                onOpenChange={setIsAuthModalOpen}
                tutorAvatarUrl={tutorAvatarUrl}
            />
        </>
    )
}
