"use client"

import Typography from "@/components/base/Typography"
import { ImagePlus } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

interface ThumbnailUploadProps {
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  error?: string | null
  existingImageUrl?: string
  videoSource?: Blob | string | null
}

export default function ThumbnailUpload({ 
  selectedFile, 
  onFileChange, 
  error: externalError, 
  existingImageUrl,
  videoSource
}: ThumbnailUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [extractedThumbnailUrl, setExtractedThumbnailUrl] = useState<string | null>(null)
  const [videoUrlForExtraction, setVideoUrlForExtraction] = useState<string | null>(null)

  const isBlobUrl = (value: unknown): value is string => typeof value === "string" && value.startsWith("blob:")
  const revokeBlobUrl = (url: string | null) => {
    if (isBlobUrl(url)) {
      URL.revokeObjectURL(url)
    }
  }

  // Clean up preview URL when component unmounts (only blob URLs need cleanup)
  useEffect(() => {
    return () => {
      revokeBlobUrl(previewUrl)
    }
  }, [previewUrl])

  // Extract thumbnail from video
  const extractThumbnailFromVideo = async (videoElement: HTMLVideoElement): Promise<string | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth || 640
      canvas.height = videoElement.videoHeight || 360
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        resolve(null)
        return
      }

      // Draw current video frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to blob and create URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          resolve(url)
        } else {
          resolve(null)
        }
      }, 'image/jpeg', 0.9)
    })
  }

  // Handle video source for thumbnail extraction
  useEffect(() => {
    if (!selectedFile && !existingImageUrl && videoUrlForExtraction && videoRef.current) {
      const video = videoRef.current
      let isMounted = true
      
      const handleVideoLoaded = () => {
        // Seek to 1 second or middle of video
        if (video.duration) {
          video.currentTime = Math.min(1, video.duration / 2)
        } else {
          video.currentTime = 1
        }
      }

      const handleVideoSeeked = async () => {
        if (!isMounted) return
        const thumbnailUrl = await extractThumbnailFromVideo(video)
        if (thumbnailUrl && isMounted) {
          setExtractedThumbnailUrl((prev) => {
            if (prev) revokeBlobUrl(prev)
            return thumbnailUrl
          })
        }
      }

      // Only set up listeners if video is not already loaded
      if (video.readyState >= 2) {
        // Video metadata already loaded
        handleVideoLoaded()
      } else {
        video.addEventListener('loadedmetadata', handleVideoLoaded)
      }
      
      video.addEventListener('seeked', handleVideoSeeked)

      return () => {
        isMounted = false
        video.removeEventListener('loadedmetadata', handleVideoLoaded)
        video.removeEventListener('seeked', handleVideoSeeked)
      }
    }
  }, [videoUrlForExtraction, selectedFile, existingImageUrl])

  // Clean up extracted thumbnail when conditions change
  useEffect(() => {
    if ((!videoUrlForExtraction || selectedFile || existingImageUrl) && extractedThumbnailUrl) {
      revokeBlobUrl(extractedThumbnailUrl)
      setExtractedThumbnailUrl(null)
    }
  }, [videoUrlForExtraction, selectedFile, existingImageUrl, extractedThumbnailUrl])

  // Update preview when selectedFile changes (new file takes precedence)
  useEffect(() => {
    if (selectedFile) {
      // Clean up previous preview URL (only if it was a blob URL)
      revokeBlobUrl(previewUrl)
      // Create preview URL for new file
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else if (existingImageUrl) {
      // If no new file selected, show existing image
      // Clean up blob URL if it exists
      revokeBlobUrl(previewUrl)
      setPreviewUrl(existingImageUrl)
    } else if (extractedThumbnailUrl) {
      // Show extracted thumbnail from video if no file or existing image
      revokeBlobUrl(previewUrl)
      setPreviewUrl(extractedThumbnailUrl)
    } else {
      // Clean up preview URL if no file and no existing image
      revokeBlobUrl(previewUrl)
      setPreviewUrl(null)
    }
  }, [selectedFile, existingImageUrl, extractedThumbnailUrl])

  // Clean up extracted thumbnail URL
  useEffect(() => {
    return () => {
      revokeBlobUrl(extractedThumbnailUrl)
    }
  }, [extractedThumbnailUrl])

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      onFileChange?.(null, null)
      return
    }

    // Validate file type
    const fileType = file.type.toLowerCase()
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const isValidType = 
      ALLOWED_FILE_TYPES.includes(fileType) || 
      ["jpg", "jpeg", "png"].includes(fileExtension || "")

    if (!isValidType) {
      const errorMessage = "Invalid file type. Please upload JPEG or PNG files only."
      onFileChange?.(null, errorMessage)
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const errorMessage = "File size exceeds 20MB. Please upload a smaller file."
      onFileChange?.(null, errorMessage)
      return
    }

    // File is valid
    onFileChange?.(file, null)
  }

  // Create video URL from videoSource
  useEffect(() => {
    if (videoSource instanceof Blob) {
      const url = URL.createObjectURL(videoSource)
      setVideoUrlForExtraction(url)
      return () => URL.revokeObjectURL(url)
    } else if (typeof videoSource === 'string') {
      setVideoUrlForExtraction(videoSource)
    } else {
      setVideoUrlForExtraction(null)
    }
  }, [videoSource])

  return (
    <div className="flex lg:flex-row flex-col items-center gap-3 lg:gap-6 lg:p-4 lg:rounded-3xl lg:border lg:border-deep-royal-indigo-50">
      
      {/* DIVIDER */}
      <div className="lg:hidden w-full border-t border-deep-royal-indigo-50"/>
      
      {/* Hidden video element for thumbnail extraction */}
      {videoUrlForExtraction && !selectedFile && !existingImageUrl && (
        <video
          ref={videoRef}
          src={videoUrlForExtraction}
          className="hidden"
          preload="metadata"
          crossOrigin="anonymous"
        />
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* UPLOAD */}
      <button 
        onClick={handleButtonClick}
        className="w-[239px] h-[130px] p-4 flex justify-center items-center border border-dashed border-deep-royal-indigo-100 rounded-2xl hover:border-deep-royal-indigo-200 transition-colors overflow-hidden relative"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Thumbnail preview"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <ImagePlus className="w-10 h-10 text-deep-royal-indigo-50"/>
        )}
      </button>

      {/* RULES */}
      <div className="flex flex-col justify-center items-center lg:items-start gap-1">

        <Typography variant={{ base: "title-3" }} color="neutral-700">
          Add a thumbnail
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-400">
          File Types: JPEG or PNG formats only, size of 20MB max
        </Typography>

        {externalError && (
          <Typography variant={{ base: "body-3" }} color="red-500" className="mt-1">
            {externalError}
          </Typography>
        )}

      </div>

      {/* DIVIDER */}
      <div className="lg:hidden w-full border-t border-deep-royal-indigo-50"/>
    </div>
  )
}