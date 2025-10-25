import Typography from "@/components/base/Typography"
import Image from "next/image"
export default function RankingLevel({
    tutorRanking
}: {
    tutorRanking: 'STARTER' | 'PRO' | 'MASTER'
}) {
    const tutorRankingBadgeSrc = `/icons/tutor-ranking/${tutorRanking}.svg`
    return (
        <div className="w-full flex justify-center items-center gap-2 px-5">
            <Image 
                src={tutorRankingBadgeSrc}
                alt={`${tutorRanking} Badge`}
                width={40}
                height={40}
            />
            <div className="flex flex-col justify-center items-start">
                <Typography variant="body-3" color="neutral-600">Ranking Level</Typography>
                <Typography variant="headline-5" color="electric-violet-600">
                    {tutorRanking.charAt(0) + tutorRanking.slice(1).toLowerCase()}
                </Typography>
            </div>


        </div>
    )
}