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
        <div className="flex flex-col rounded-[15px]">
            <Thumbnail 
                videoThumbnailUrl={videoThumbnailUrl}
                videoUrl={videoUrl}
                fullName={fullName}
            />

            <div className="rounded-b-[15px] border border-neutral-100 flex justify-center items-center gap-x-4 p-3">

                <RankingLevel tutorRanking={tutorRanking} />

                <div className="h-full border border-neutral-100"></div>

                <HoursTaught hoursTaught={hoursTaught} />

            </div>
        </div>
    )
}