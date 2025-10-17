import Image from "next/image"
export default function RankingLevel({
    tutorRanking
}: {
    tutorRanking: 'STARTER' | 'PRO' | 'MASTER'
}) {
    const tutorRankingBadgeSrc = `icons/tutor-ranking/${tutorRanking}.svg`
    return (
        <div className="flex justify-center items-center gap-y-2 px-5">
            
            <Image 
                src={tutorRankingBadgeSrc}
                alt={`${tutorRanking} Badge`}
                width={40}
                height={40}
            />


            <div className="flex flex-col justify-center items-start">
                <div className="text-body-3 text-neutral-600">Ranking Level</div>
                <div className="text-headline-5 text-electic-violet-600">
                    {tutorRanking.charAt(0) + tutorRanking.slice(1).toLowerCase()}
                </div>
            </div>


        </div>
    )
}