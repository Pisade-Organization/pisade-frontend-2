import BaseButton from "@/components/base/BaseButton";
import AuthRequiredModal from "@/components/dialogs/AuthRequiredModal";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface SendMessageBtnProps {
    tutorUserId?: string
    tutorFullName?: string
    tutorAvatarUrl?: string
}

export default function SendMessageBtn({
    tutorUserId,
    tutorFullName,
    tutorAvatarUrl,
}: SendMessageBtnProps) {
    const router = useRouter()
    const pathname = usePathname()
    const locale = pathname.split("/")[1] || "en"
    const { status } = useSession()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    const handleClick = () => {
        if (status !== "authenticated") {
            setIsAuthModalOpen(true)
            return
        }

        if (!tutorUserId) {
            return
        }

        const query = new URLSearchParams({
            peerUserId: tutorUserId,
            ...(tutorFullName ? { peerName: tutorFullName } : {}),
            ...(tutorAvatarUrl ? { peerAvatarUrl: tutorAvatarUrl } : {}),
        })

        router.push(`/${locale}/messages?${query.toString()}`)
    }

    return (
        <>
            <BaseButton variant="secondary" typeStyle="outline" className="w-full" onClick={handleClick}>
                Send Message
            </BaseButton>

            <AuthRequiredModal
                open={isAuthModalOpen}
                onOpenChange={setIsAuthModalOpen}
                tutorAvatarUrl={tutorAvatarUrl}
            />
        </>
    )
}
