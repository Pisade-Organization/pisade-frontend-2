import AvailableNowBadge from "./AvailableNowBadge"
import Typography from "@/components/base/Typography"

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

                <Typography
                    variant={{ base: "title-1", lg: "headline-4" }}
                    color="neutral-900"
                >
                    ฿{baseRate}
                </Typography>

                <Typography
                    variant={{ base: "body-3", lg: "body-2" }}
                    color="neutral-600"
                >
                    /50m
                </Typography>

            </div>

            <AvailableNowBadge isActive={isActive} />

        </div>
    )
}