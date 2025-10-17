import Thumbnail from "./Thumbnail"
import RankingLevel from "./RankingLevel"
import HoursTaught from "./HoursTaught"
export default function MediaPanel({
    videoThumbnailUrl,
    videoUrl,
    fullName,
    tutorRanking,
    hoursTaught,
}: {
    videoThumbnailUrl: string
    videoUrl: string
    fullName: string
    tutorRanking: 'STARTER' | 'PRO' | 'MASTER'
    hoursTaught: number
}) {
    return (
        <div className="w-full flex flex-col rounded-[15px]">
            <Thumbnail 
                videoThumbnailUrl={videoThumbnailUrl}
                videoUrl={videoUrl}
                fullName={fullName}
            />

            <div className="rounded-b-[15px] border border-neutral-100 flex justify-between items-center gap-4 py-4 px-[13px]">

                <RankingLevel tutorRanking={tutorRanking} />

                <div className="h-[47px] w-px bg-neutral-100"></div>

                <HoursTaught hoursTaught={hoursTaught} />

            </div>
        </div>
    )
}