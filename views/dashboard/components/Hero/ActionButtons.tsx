import BaseButton from "@/components/base/BaseButton"
import { useRouter } from "next/navigation"
import { useNow } from "@/hooks/useNow"
import { getJoinButtonLabel, isLessonJoinableNow } from "@/lib/lessonTiming"

interface ActionButtonsProps {
    meetingUrl?: string | null
    canJoin?: boolean
    joinAvailableAt?: Date | null
    lessonEndTime: Date
    secondaryActionHref?: string | null
    actionLabel?: string
}

export default function ActionButtons({
    meetingUrl,
    canJoin = false,
    joinAvailableAt,
    lessonEndTime,
    secondaryActionHref,
    actionLabel = "Join class link",
}: ActionButtonsProps) {
    const router = useRouter()
    const now = useNow()
    const joinableNow =
        isLessonJoinableNow({
            meetingUrl,
            joinAvailableAt,
            endTime: lessonEndTime,
            now,
        }) || canJoin

    const handleJoin = () => {
        if (!meetingUrl || !joinableNow) {
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

    const joinDisabled = !joinableNow
    const joinLabel = getJoinButtonLabel({
        meetingUrl,
        joinAvailableAt,
        endTime: lessonEndTime,
        now,
        actionLabel,
    })

    return (
        <div className="flex flex-col justify-center items-center gap-[10px] w-full">
            <BaseButton className="w-full" onClick={handleJoin} disabled={joinDisabled}>
                {joinLabel}
            </BaseButton>
            {secondaryActionHref ? (
                <BaseButton
                    variant="secondary"
                    typeStyle="outline"
                    borderColor="white"
                    textColor="white"
                    className="w-full"
                    onClick={handleSecondaryAction}
                >
                    Reschedule
                </BaseButton>
            ) : null}
        </div>

    )
}
