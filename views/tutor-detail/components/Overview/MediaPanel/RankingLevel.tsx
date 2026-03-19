import Typography from "@/components/base/Typography"
import Image from "next/image"
import { getTutorRankingBadgeSrc, getTutorRankingLabel } from "@/lib/tutorRanking"
export default function RankingLevel({
    tutorRanking
}: {
    tutorRanking: 'STARTER' | 'PRO' | 'MASTER'
}) {
    const tutorRankingBadgeSrc = getTutorRankingBadgeSrc(tutorRanking)
    const tutorRankingLabel = getTutorRankingLabel(tutorRanking)
    return (
        <div className="w-full flex justify-center items-center gap-2 px-0">
            {tutorRankingBadgeSrc ? (
                <Image 
                    src={tutorRankingBadgeSrc}
                    alt={`${tutorRankingLabel} Badge`}
                    width={40}
                    height={40}
                />
            ) : null}
            <div className="flex flex-col justify-center items-start">
                <Typography variant="body-3" color="neutral-600">Ranking Level</Typography>
                <Typography variant="headline-5" color="electric-violet-600">
                    {tutorRankingLabel}
                </Typography>
            </div>


        </div>
    )
}
