"use client"

import { useState, useEffect, useRef } from "react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VideoSource } from "../index"

interface VideoUploadPlaceholderProps {
  recordedVideoBlob: Blob | null
  videoLink: string
  selectedSource: VideoSource
  showChoiceDialog: boolean
  recordingStream: MediaStream | null
  isRecording: boolean
  onSelectSource: (source: "recorded" | "link") => void
  onCloseDialog: () => void
  existingVideoUrl?: string
}

export default function VideoUploadPlaceholder({
  recordedVideoBlob,
  videoLink,
  selectedSource,
  showChoiceDialog,
  recordingStream,
  isRecording,
  onSelectSource,
  onCloseDialog,
  existingVideoUrl
}: VideoUploadPlaceholderProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewVideoRef = useRef<HTMLVideoElement>(null)

  // Handle recording stream preview
  useEffect(() => {
    if (previewVideoRef.current && recordingStream) {
      previewVideoRef.current.srcObject = recordingStream
    } else if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null
    }
  }, [recordingStream])

  // Add error handlers and debug logging for video element
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const video = videoRef.current
      
      // Add error handler to debug issues
      const handleError = (e: Event) => {
        const videoElement = e.target as HTMLVideoElement
        const error = videoElement.error
        if (error) {
          let errorMessage = 'Unknown error'
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMessage = 'Video loading aborted'
              break
            case error.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error while loading video'
              break
            case error.MEDIA_ERR_DECODE:
              errorMessage = 'Video decoding error'
              break
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Video format not supported or source not found'
              break
          }
          console.error('Video playback error:', errorMessage, {
            code: error.code,
            message: error.message,
            videoUrl: videoUrl
          })
        } else {
          console.error('Video playback error (no error code):', e, { videoUrl: videoUrl })
        }
      }
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded successfully:', videoUrl)
      }
      
      const handleCanPlay = () => {
        console.log('Video can play:', videoUrl)
      }
      
      video.addEventListener('error', handleError)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('canplay', handleCanPlay)
      
      return () => {
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [videoUrl])

  useEffect(() => {
    console.log('VideoUploadPlaceholder - useEffect triggered:', {
      selectedSource,
      hasRecordedBlob: !!recordedVideoBlob,
      existingVideoUrl,
      videoLink
    })
    
    // Priority 1: Show new recorded blob if it exists
    if (selectedSource === "recorded" && recordedVideoBlob) {
      const url = URL.createObjectURL(recordedVideoBlob)
      console.log('Setting videoUrl from recorded blob:', url)
      setVideoUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    // Priority 2: Show existing video URL if no new blob is recorded
    // Always show existingVideoUrl unless user explicitly selected "link"
    else if (existingVideoUrl && !recordedVideoBlob) {
      // Only clear if user explicitly selected link, otherwise show the existing video
      if (selectedSource === "link") {
        console.log('Clearing videoUrl because link is selected')
        setVideoUrl(null)
      } else {
        console.log('Setting videoUrl from existingVideoUrl:', existingVideoUrl)
        setVideoUrl(existingVideoUrl)
      }
    }
    // Priority 3: Clear video URL if nothing exists
    else if (!existingVideoUrl && !recordedVideoBlob) {
      console.log('Clearing videoUrl - no video available')
      setVideoUrl(null)
    }
  }, [selectedSource, recordedVideoBlob, videoLink, existingVideoUrl])

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }
    return null
  }

  const getVimeoEmbedUrl = (url: string): string | null => {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/video\/(\d+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}`
      }
    }
    return null
  }

  const getEmbedUrl = (url: string): string | null => {
    const youtubeUrl = getYouTubeEmbedUrl(url)
    if (youtubeUrl) return youtubeUrl
    
    const vimeoUrl = getVimeoEmbedUrl(url)
    if (vimeoUrl) return vimeoUrl
    
    return null
  }

  const embedUrl = videoLink ? getEmbedUrl(videoLink) : null
  const hasRecorded = !!recordedVideoBlob
  const hasLink = !!videoLink && !!embedUrl
  const hasExistingVideo = !!existingVideoUrl && !recordedVideoBlob
  // Show placeholder only if there's no video content at all
  const showPlaceholder = !isRecording && !hasRecorded && !hasLink && !hasExistingVideo && !videoUrl

  return (
    <div className="w-full bg-white flex justify-center items-center pt-4 py-5 px-4 gap-3 relative">
      {showPlaceholder ? (
        <div className="w-[343px] h-[164.42px] lg:w-[417px] lg:h-[200px] flex flex-col justify-center items-center py-3 px-4 border border-neutral-100 rounded-xl">
          <Typography variant={{ base: "title-3" }} color="neutral-700">
            Add a horizontal video of up to 2 minutes
          </Typography>
          <Typography variant={{ base: "body-3" }} color="neutral-300">
            Your video will appear here
          </Typography>
        </div>
      ) : (
        <div className="w-[343px] h-[164.42px] lg:w-[417px] lg:h-[200px] relative rounded-xl overflow-hidden border border-neutral-100 bg-black">
          {isRecording && recordingStream ? (
            <video
              ref={previewVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
              style={{ transform: 'scaleX(-1)' }}
            />
          ) : videoUrl ? (
            <video
              ref={videoRef}
              key={videoUrl}
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            />
          ) : selectedSource === "link" && embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      )}

      {/* Choice Dialog */}
      <Dialog open={showChoiceDialog && hasRecorded && hasLink} onOpenChange={(open) => {
        if (!open) {
          onCloseDialog()
        }
      }}>
        <DialogContent 
          hideOverlay={true}
          hideClose={true}
          className="bg-white rounded-xl p-6 max-w-md w-full flex flex-col gap-4 sm:rounded-xl"
        >
          <DialogHeader className="text-left">
            <DialogTitle className="text-title-2 text-neutral-900 font-bold leading-[150%]">
              Choose Video Source
            </DialogTitle>
          </DialogHeader>
          
          <Typography variant="body-3" color="neutral-700">
            You have both a recorded video and a video link. Which one would you like to use?
          </Typography>

          <div className="flex flex-col gap-3">
            <BaseButton
              variant="secondary"
              onClick={() => onSelectSource("recorded")}
              className="w-full"
            >
              Use Recorded Video
            </BaseButton>
            <BaseButton
              variant="primary"
              onClick={() => onSelectSource("link")}
              className="w-full"
            >
              Use Video Link
            </BaseButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}