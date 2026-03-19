"use client"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"

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
export default function Thumbnail({
    videoThumbnailUrl,
    videoUrl,
    fullName // for SEO Optimization in thumbnail
}: {
    videoThumbnailUrl: string
    videoUrl: string
    fullName: string
}) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const safeThumbnail = videoThumbnailUrl || "/default_avatar.png"
    const embedUrl = useMemo(
        () => getYouTubeEmbedUrl(videoUrl) || getVimeoEmbedUrl(videoUrl),
        [videoUrl],
    )
    const hasVideo = Boolean(videoUrl)
    const canPlayDirectVideo = isDirectVideoUrl(videoUrl)

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                aria-label={`Watch introduction video of ${fullName}`}
                onClick={() => {
                    if (!hasVideo) {
                        return
                    }

                    setIsVideoModalOpen(true)
                }}
                onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && hasVideo) {
                        e.preventDefault()
                        setIsVideoModalOpen(true)
                    }
                }}
                className={`relative w-full aspect-video rounded-t-[8px] ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
            >
                <Image 
                    src={safeThumbnail}
                    alt={`Introduction video of ${fullName}`}
                    fill
                    className="object-cover w-full h-full rounded-t-[8px]"
                    sizes="(min-width: 1024px) 567px, 100vw"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="shadow-md w-11 h-11 rounded-full bg-[#0B002B] bg-opacity-50 flex items-center justify-center">
                        <Play size={18} fill="white" color="white"/>
                    </div>
                </div>
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
                    <DialogTitle className="sr-only">{`${fullName} introduction video`}</DialogTitle>

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
        </>
    )
}
