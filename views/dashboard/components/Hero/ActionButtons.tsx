import BaseButton from "@/components/base/BaseButton"
import { useRouter } from "next/navigation"

interface ActionButtonsProps {
    meetingUrl?: string | null
    canJoin?: boolean
    joinAvailableAt?: Date | null
    secondaryActionHref?: string | null
    actionLabel?: string
}

function getJoinLabel(actionLabel: string, joinAvailableAt?: Date | null) {
    if (!joinAvailableAt) {
        return actionLabel
    }

    return `Available ${joinAvailableAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`
}

export default function ActionButtons({
    meetingUrl,
    canJoin = false,
    joinAvailableAt,
    secondaryActionHref,
    actionLabel = "Join class link",
}: ActionButtonsProps) {
    const router = useRouter()

    const handleJoin = () => {
        if (!canJoin || !meetingUrl) {
            return
        }

        window.open(meetingUrl, "_blank", "noopener,noreferrer")
    }

    const handleSecondaryAction = () => {
        if (!secondaryActionHref) {
            return
        }

        router.push(secondaryActionHref)
    }

    const joinDisabled = !canJoin || !meetingUrl

    return (
        <div className="flex flex-col justify-center items-center gap-[10px] w-full">
            <BaseButton className="w-full" onClick={handleJoin} disabled={joinDisabled}>
                {joinDisabled ? getJoinLabel(actionLabel, joinAvailableAt) : actionLabel}
            </BaseButton>
            <BaseButton
                variant="secondary"
                typeStyle="outline"
                borderColor="white"
                textColor="white"
                className="w-full"
                onClick={handleSecondaryAction}
                disabled={!secondaryActionHref}
            >
                Reschedule
            </BaseButton>
        </div>

    )
}
