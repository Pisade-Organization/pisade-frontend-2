import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import UserAvatar from "@/components/Navbar/UserAvatar"
import { getTutorRankingBadgeSrc, getTutorRankingLabel } from "@/lib/tutorRanking"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { Star } from "lucide-react"

interface StudentInfoCardProps {
  fullName: string
  avatarUrl?: string | null
  timezone: string
  tutorRanking?: "STARTER" | "PRO" | "MASTER" | null
  avgRating?: number | null
  studentsCount?: number | null
  hoursTaught?: number | null
  summaryLabel?: string
  summaryValue?: string
  actionLabel?: string
  actionHref?: string
}

export default function StudentInfoCard({
  fullName,
  avatarUrl,
  timezone,
  tutorRanking,
  avgRating,
  studentsCount,
  hoursTaught,
  summaryLabel,
  summaryValue,
  actionLabel,
  actionHref,
}: StudentInfoCardProps) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string | undefined) ?? "en"
  const rankingBadgeSrc = getTutorRankingBadgeSrc(tutorRanking)
  const rankingLabel = getTutorRankingLabel(tutorRanking)
  const formattedRating = Number.isFinite(avgRating) ? Number(avgRating).toFixed(1) : "0.0"

  return (
    <div
      className="border border-neutral-50 bg-white p-4 gap-3 flex flex-col rounded-xl lg:rounded-t-xl lg:rounded-b-none shadow-[0px_1px_4px_0px_#0000001A] lg:shadow-none"
    >


      {/* PROFILE PIC + NAME + TIMEZONE */}
      <div className="flex gap-4 lg:gap-[10px]">
        <UserAvatar
          avatarUrl={avatarUrl ?? undefined}
          fullName={fullName}
          size={46}
          className="h-[46px] w-[46px] object-cover"
        />

        <div className="flex flex-col gap-1 lg:gap-0">
          <Typography variant="title-2" color="neutral-800">{fullName}</Typography>
          <Typography variant="body-3" color="neutral-300">{timezone}</Typography>
        </div>
      </div>

      {tutorRanking || hoursTaught !== undefined ? (
        <div className="border-t border-neutral-50 pt-3 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-white">
            <div className="flex flex-1 gap-1">
              {rankingBadgeSrc ? (
                <Image
                  src={rankingBadgeSrc}
                  alt={`${rankingLabel} badge`}
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0"
                />
              ) : null}
              <div className="flex flex-col">
                <Typography variant="title-2" color="neutral-900">{rankingLabel}</Typography>
                <Typography variant="body-3" color="neutral-600">Ranking level</Typography>
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-50" />
            <div className="flex flex-1 flex-col">
              <Typography variant="title-2" color="neutral-900">{hoursTaught ?? 0}</Typography>
              <Typography variant="body-3" color="neutral-600">Lessons taught</Typography>
            </div>
          </div>

          <div className="border-t border-neutral-50 pt-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col">
                <div className="flex gap-[2px] items-center">
                  <Typography variant="title-2" color="neutral-900">{formattedRating}/5</Typography>
                  <Star className="h-5 w-5 fill-yellow-normal text-yellow-normal" />
                </div>
                <Typography variant="body-3" color="neutral-600">Rating</Typography>
              </div>

              <div className="h-8 border-l border-neutral-50" />

              <div className="flex flex-col">
                <Typography variant="title-2" color="neutral-900">{studentsCount ?? 0}</Typography>
                <Typography variant="body-3" color="neutral-600">Students</Typography>
              </div>

              <div className="h-8 border-l border-neutral-50" />

              <div className="flex flex-col">
                <Typography variant="title-2" color="neutral-900">{hoursTaught ?? 0}</Typography>
                <Typography variant="body-3" color="neutral-600">Lessons</Typography>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {summaryLabel && summaryValue ? (
        <div className="w-full flex justify-between items-center">
          <Typography variant="body-3" color="neutral-500">{summaryLabel}</Typography>
          <Typography variant="title-2" color="deep-royal-indigo-500">{summaryValue}</Typography>
        </div>
      ) : null}

      {/* TOP UP WALLET BUTTON */}
      {actionLabel && actionHref ? (
        <BaseButton onClick={() => router.push(`/${locale}${actionHref}`)}>
          {actionLabel}
        </BaseButton>
      ) : null}
    </div>
  )
}
