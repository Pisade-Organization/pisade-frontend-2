"use client"
import { useRouter } from "next/navigation"
import { TutorCardProps } from "../../types"
import TutorAvatar from "./TutorAvatar"
import TutorHeader from "./TutorHeader"
import TutorActionButtons from "./TutorActionButtons"
import TutorRateStatus from "./TutorRateStatus"
import TutorStats from "./TutorStats"
import SpecialtyBadges from "./SpecialtyBadges"
import TutorBio from "./TutorBio"
import TutorLanguages from "./TutorLanguages"
import { MouseEvent, useMemo, useState } from "react"
import Image from "next/image"
import BaseButton from "@/components/base/BaseButton"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Play, X } from "lucide-react"

function getYouTubeEmbedUrl(url: string): string | null {
    try {
        const parsedUrl = new URL(url)
        const host = parsedUrl.hostname.replace("www.", "").toLowerCase()

        if (host === "youtu.be") {
            const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0]
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        if (host === "youtube.com" || host === "m.youtube.com") {
            if (parsedUrl.pathname === "/watch") {
                const videoId = parsedUrl.searchParams.get("v")
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null
            }

            if (parsedUrl.pathname.startsWith("/embed/")) {
                const videoId = parsedUrl.pathname.split("/embed/")[1]
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null
            }

            if (parsedUrl.pathname.startsWith("/shorts/")) {
                const videoId = parsedUrl.pathname.split("/shorts/")[1]
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null
            }
        }
    } catch {
        return null
    }

    return null
}

function getVimeoEmbedUrl(url: string): string | null {
    try {
        const parsedUrl = new URL(url)
        const host = parsedUrl.hostname.replace("www.", "").toLowerCase()

        if (host !== "vimeo.com" && host !== "player.vimeo.com") {
            return null
        }

        const match = parsedUrl.pathname.match(/\/(?:video\/)?(\d+)/)
        if (!match?.[1]) {
            return null
        }

        return `https://player.vimeo.com/video/${match[1]}`
    } catch {
        return null
    }
}

function isDirectVideoUrl(url: string): boolean {
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)
}

export default function TutorListCard({
    id,
    fullName,
    avatarUrl,
    flagUrl,
    isActive,
    bio,
    baseRate,
    specialties,
    subject,
    languages,
    avgRating,
    studentsCount,
    lessonsCount,
    tutorRanking,
    videoThumbnailUrl,
    videoUrl,
  }: TutorCardProps) { 
    const router = useRouter()
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const firstName = fullName.trim().split(/\s+/)[0] || "Tutor"
    const thumbnailSrc = videoThumbnailUrl || avatarUrl
    const embedUrl = useMemo(
        () => getYouTubeEmbedUrl(videoUrl) || getVimeoEmbedUrl(videoUrl),
        [videoUrl],
    )
    const hasVideo = Boolean(videoUrl)
    const canPlayDirectVideo = isDirectVideoUrl(videoUrl)

    const onCardClick = () => {
        router.push(`/tutor/${id}`)
    }

    const handleVideoThumbnailClick = (e: MouseEvent) => {
        e.stopPropagation()

        if (!hasVideo) {
            return
        }

        setIsVideoModalOpen(true)
    }

    const handleVideoThumbnailOpen = () => {
        if (!hasVideo) {
            return
        }

        setIsVideoModalOpen(true)
    }

    const handleSeeProfileClick = (e: MouseEvent) => {
        e.stopPropagation()
        router.push(`/tutor/${id}`)
    }

    return (
        <div 
        onClick={onCardClick}
        className="
        cursor-pointer w-full bg-white border border-neutral-50 lg:border-none p-4 lg:p-0
        flex flex-col lg:flex-row lg:gap-x-5 gap-y-4 lg:gap-y-0 rounded-[15px] lg:rounded-none
        px-
        ">
            
            {/* DESKTOP */}

            {/* AVATAR */}
            <TutorAvatar
                fullName={fullName}
                avatarUrl={avatarUrl}
                isActive={isActive}
                tutorRanking={tutorRanking}
                className={"hidden lg:block"}
            />

            {/* RIGHT OF AVATAR */}
            <div className="hidden lg:flex w-full flex-col justify-start items-center gap-y-3">

                {/* TOP 1/4 */}
                <div className="w-full flex flex-col justify-start items-center gap-y-2">
                    <div className="w-full flex justify-between items-start">
                        <TutorHeader fullName={fullName} flagUrl={flagUrl} subject={subject}/>
                        <TutorActionButtons tutorId={id} />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <TutorRateStatus baseRate={baseRate} isActive={isActive}/>

                        <TutorStats avgRating={avgRating} studentsCount={studentsCount} lessonsCount={lessonsCount}/>
                    </div>
                </div>

                {/* TOP 2/4 */}
                <div className="w-full">
                    <SpecialtyBadges specialties={specialties} />
                </div>

                {/* TOP 3/4 */}
                <div className="w-full">
                    <TutorBio bio={bio} />
                </div>

                {/* TOP 4/4 */}
                <div className="w-full">
                    <TutorLanguages languages={languages} />
                </div>

            </div>

            <div className="hidden lg:block w-px self-stretch bg-neutral-50" />

            <div className="hidden lg:flex flex-col gap-6">
                <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Watch ${fullName}'s intro video`}
                    onClick={handleVideoThumbnailClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            e.stopPropagation()
                            handleVideoThumbnailOpen()
                        }
                    }}
                    className={`relative w-[311px] overflow-hidden rounded-[8px] ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
                >
                    <Image
                        src={thumbnailSrc}
                        alt={`${fullName} video thumbnail`}
                        width={311}
                        height={175}
                        className="h-[175px] w-[311px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-11 w-11 rounded-full bg-[#0B002B]/60 flex items-center justify-center">
                                <Play size={18} fill="white" color="white" />
                            </div>
                        </div>
                    )}
                </div>

                <BaseButton typeStyle="outline" onClick={handleSeeProfileClick}>
                    {`See ${firstName}'s Profile`}
                </BaseButton>
            </div>

            <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                {isVideoModalOpen && (
                    <DialogClose
                        aria-label="Close video"
                        className="fixed right-4 top-4 z-[80] rounded-full bg-black/70 p-2 text-white hover:bg-black/90 lg:right-6 lg:top-6"
                    >
                        <X size={18} />
                    </DialogClose>
                )}

                <DialogContent hideClose className="w-[92vw] max-w-none border-0 bg-black p-0 lg:w-[min(70vw,calc(70vh*16/9))]">
                    <DialogTitle className="sr-only">Tutor introduction video</DialogTitle>

                    <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
                        {canPlayDirectVideo ? (
                            <video
                                src={videoUrl}
                                controls
                                autoPlay
                                playsInline
                                preload="metadata"
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        ) : embedUrl ? (
                            <iframe
                                src={embedUrl}
                                className="absolute inset-0 h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
            

            {/* MOBILE */}

            {/* TUTOR AVATAR + HEADER */}
            <div className="lg:hidden w-full flex justify-start items-center gap-x-4">
                <TutorAvatar
                    fullName={fullName}
                    avatarUrl={avatarUrl}
                    isActive={isActive}
                    tutorRanking={tutorRanking}
                />

                <div className="flex flex-col justify-center items-start gap-y-1">
                    <TutorHeader fullName={fullName} flagUrl={flagUrl} subject={subject}/>
                    <TutorRateStatus 
                        baseRate={baseRate}
                        isActive={isActive}
                    />
                </div>
            </div>

            {/* DIVIDER */}
            <div className="lg:hidden w-full border border-neutral-50"></div>

            {/* STATS + SPECIALTIES + BIO + LANGUAGES */}
            <div className="lg:hidden w-full flex flex-col justify-center items-start gap-y-2">
                <TutorStats 
                    avgRating={avgRating}
                    studentsCount={studentsCount}
                    lessonsCount={lessonsCount}
                />

                <SpecialtyBadges specialties={specialties} />

                <TutorBio bio={bio} />

                <TutorLanguages languages={languages} />
            
            </div>

            {/* DIVIDER */}
            <div className="lg:hidden w-full border border-neutral-50"></div>

            {/* ACTION BUTTONS */}
            <TutorActionButtons className={'lg:hidden'} tutorId={id} />


        </div>
    )
  }
