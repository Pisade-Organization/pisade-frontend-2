import AvailableNowBadge from "./AvailableNowBadge"

export default function TutorRateStatus({
    baseRate,
    isActive,
}: {
    baseRate: number
    isActive: boolean
}) {
    return (
        <div className="flex justify-center items-center gap-3">

            <div className="flex justify-center items-center gap-1">

                <div className="text-title-1 lg:text-headline-4 text-neutral-900">
                    ฿{baseRate}
                </div>

                <div className="text-body-3 lg:text-body-2 text-neutral-600">
                    /50m
                </div>

            </div>

            <AvailableNowBadge isActive={isActive} />

        </div>
    )
}