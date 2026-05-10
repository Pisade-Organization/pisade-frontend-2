"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import VideoGuidelines from "./VideoGuidelines"
import VideoRequirements from "./VideoRequirements"
import RecordYourVideo from "./RecordYourVideo"
import AddThumbnail from "./AddThumbnail"
import VideoUploadPlaceholder from "./VideoUploadPlaceholder"
import { useStepSix } from "@/hooks/tutors/onboarding/queries/useStepSix"
import { useSaveStepSix } from "@/hooks/tutors/onboarding/mutations/useUpdateStepSix"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"

export type VideoSource = "recorded" | "link" | null

export default function OnboardingStepSix() {
  const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null)
  const [videoLink, setVideoLink] = useState<string>("")
  const [selectedSource, setSelectedSource] = useState<VideoSource>(null)
  const [showChoiceDialog, setShowChoiceDialog] = useState(false)
  const [recordingStream, setRecordingStream] = useState<MediaStream | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailError, setThumbnailError] = useState<string | null>(null)
  
  // Upload state
  const [videoKey, setVideoKey] = useState<string | null>(null)
  const [thumbnailKey, setThumbnailKey] = useState<string | null>(null)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null)
  
  const { data: session } = useSession()
  const { data: stepSixData, isLoading } = useStepSix()
  const saveStepSix = useSaveStepSix()
  const { registerStepActions, unregisterStepActions, setCanContinue } = useOnboardingNavigation()

  // Defensive cleanup: ensure dialog lifecycle never leaves the page non-interactive.
  useEffect(() => {
    if (!showChoiceDialog && document.body.style.pointerEvents === "none") {
      document.body.style.pointerEvents = ""
    }

    return () => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = ""
      }
    }
  }, [showChoiceDialog])
  
  // Load existing data
  useEffect(() => {
    if (stepSixData) {
      if (stepSixData.videoUrl) {
        // Existing video is shown from URL; keep key empty until user uploads a new file.
        setSelectedSource("recorded")
      }

      if (stepSixData.videoLink) {
        setVideoLink(stepSixData.videoLink)
        setSelectedSource("link")
      }
    }
  }, [stepSixData])

  const isValidYouTubeUrl = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/,
      /^https?:\/\/youtube\.com\/watch\?v=.+/,
      /^https?:\/\/youtu\.be\/.+/
    ]
    return patterns.some(pattern => pattern.test(url))
  }

  const isValidVimeoUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?vimeo\.com\/.+/.test(url)
  }

  const isValidVideoLink = (url: string): boolean => {
    return isValidYouTubeUrl(url) || isValidVimeoUrl(url)
  }

  useEffect(() => {
    setCanContinue(!isUploadingVideo && !isUploadingThumbnail)

    return () => {
      setCanContinue(true)
    }
  }, [isUploadingVideo, isUploadingThumbnail, setCanContinue])

  // Handle video upload (when blob is recorded)
  const handleVideoUpload = async (blob: Blob) => {
    const userId = session?.user?.id
    if (!userId) {
      setVideoUploadError("User ID not found in session")
      return
    }

    setIsUploadingVideo(true)
    setVideoUploadError(null)

    try {
      // Convert Blob to File
      const videoFile = new File([blob], "intro-video.webm", { type: blob.type || "video/webm" })
      
      // Step 1: Get presigned URL for temp folder
      const fileName = videoFile.name
      const fileType = videoFile.type || "video/webm"
      const folder = `tutor/${userId}/introVideo/video/temp`
      
      const presignedResponse = await getPresignedUrl(fileName, fileType, folder)
      
      if (!presignedResponse) {
        throw new Error("Failed to get presigned URL")
      }

      // Step 2: Upload file to presigned URL
      const uploadSuccess = await uploadFileToPresignedUrl(
        presignedResponse.uploadUrl,
        videoFile
      )

      if (!uploadSuccess) {
        throw new Error("Failed to upload video")
      }

      // Step 3: Store the key in state
      setVideoKey(presignedResponse.key)
      setVideoUploadError(null)
    } catch (err) {
      setVideoUploadError(err instanceof Error ? err.message : "Failed to upload video")
      setVideoKey(null)
    } finally {
      setIsUploadingVideo(false)
    }
  }

  // Handle thumbnail upload
  const handleThumbnailUpload = async (file: File | null, error: string | null) => {
    setThumbnailFile(file)
    setThumbnailError(error)
    
    if (error || !file) {
      setThumbnailKey(null)
      return
    }

    const userId = session?.user?.id
    if (!userId) {
      setThumbnailError("User ID not found in session")
      setThumbnailKey(null)
      return
    }

    setIsUploadingThumbnail(true)
    setThumbnailError(null)

    try {
      // Step 1: Get presigned URL for temp folder
      const fileName = file.name
      const fileType = file.type || "image/jpeg"
      const folder = `tutor/${userId}/introVideo/thumbnail/temp`
      
      const presignedResponse = await getPresignedUrl(fileName, fileType, folder)
      
      if (!presignedResponse) {
        throw new Error("Failed to get presigned URL")
      }

      // Step 2: Upload file to presigned URL
      const uploadSuccess = await uploadFileToPresignedUrl(
        presignedResponse.uploadUrl,
        file
      )

      if (!uploadSuccess) {
        throw new Error("Failed to upload thumbnail")
      }

      // Step 3: Store the key in state
      setThumbnailKey(presignedResponse.key)
      setThumbnailError(null)
    } catch (err) {
      setThumbnailError(err instanceof Error ? err.message : "Failed to upload thumbnail")
      setThumbnailKey(null)
    } finally {
      setIsUploadingThumbnail(false)
    }
  }

  // Register using live closures so callbacks always use current state.
  useEffect(() => {
    const validate = async () => {
      if (isUploadingVideo || isUploadingThumbnail) {
        return false
      }

      if (videoUploadError || thumbnailError) {
        return false
      }

      const hasExistingVideoLink = Boolean(stepSixData?.videoLink)

      if (selectedSource === "link") {
        const trimmedVideoLink = videoLink.trim()

        if (!trimmedVideoLink && !hasExistingVideoLink) {
          return false
        }

        if (trimmedVideoLink && !isValidVideoLink(trimmedVideoLink)) {
          return false
        }
      }

      // Both video and thumbnail are optional when there is no upload error.
      return true
    }

    const save = async () => {
      const payload: {
        videoKey?: string
        videoLink?: string | null
        thumbnailKey?: string | null
      } = {}

      const hasExistingRecordedVideo = Boolean(stepSixData?.videoUrl)
      const existingVideoLink = stepSixData?.videoLink?.trim() || ""
      const trimmedVideoLink = videoLink.trim()
      const hasNewVideoUpload =
        Boolean(videoKey && videoKey.includes("/temp/"))
      const hasNewThumbnailUpload =
        Boolean(thumbnailKey && thumbnailKey.includes("/temp/"))

      // Save only newly uploaded temp files.
      if (
        selectedSource === "recorded" &&
        hasNewVideoUpload
      ) {
        payload.videoKey = videoKey ?? undefined
      }

      if (
        selectedSource === "recorded" &&
        existingVideoLink &&
        (hasExistingRecordedVideo || hasNewVideoUpload)
      ) {
        payload.videoLink = null
      }

      if (selectedSource === "link" && trimmedVideoLink && isValidVideoLink(trimmedVideoLink)) {
        payload.videoLink = trimmedVideoLink
      }

      if (hasNewThumbnailUpload) {
        payload.thumbnailKey = thumbnailKey
      }

      if (
        selectedSource === "link" &&
        payload.videoLink === existingVideoLink &&
        !hasNewThumbnailUpload
      ) {
        return
      }

      // No data changes to persist.
      if (Object.keys(payload).length === 0) {
        return
      }

      await saveStepSix.mutateAsync(payload)
    }

    registerStepActions(6, { validate, save })
    return () => {
      unregisterStepActions(6)
    }
  }, [
    registerStepActions,
    unregisterStepActions,
    selectedSource,
    stepSixData,
    videoLink,
    videoKey,
    thumbnailKey,
    isUploadingVideo,
    isUploadingThumbnail,
    videoUploadError,
    thumbnailError,
    saveStepSix,
  ])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <VideoGuidelines />
      <VideoUploadPlaceholder 
        recordedVideoBlob={recordedVideoBlob}
        videoLink={videoLink}
        selectedSource={selectedSource}
        showChoiceDialog={showChoiceDialog}
        recordingStream={recordingStream}
        isRecording={isRecording}
        onSelectSource={(source) => {
          setSelectedSource(source)
          setShowChoiceDialog(false)
          // If switching to link, clear video key (since link doesn't need key)
          if (source === "link") {
            setVideoKey(null)
          }
        }}
        onCloseDialog={() => {
          setShowChoiceDialog(false)
          setSelectedSource("recorded")
        }}
        existingVideoUrl={stepSixData?.videoUrl ?? undefined}
      />
      <VideoRequirements />
      <RecordYourVideo 
        onRecordingComplete={(blob) => {
          setRecordedVideoBlob(blob)
          // Upload video immediately when recording is complete
          if (blob) {
            handleVideoUpload(blob)
          }
          // If user already had a link selected, show choice dialog
          // Otherwise, if they had a link but no selection, show choice
          if (videoLink && (selectedSource === "link" || !selectedSource)) {
            setShowChoiceDialog(true)
          } else {
            setSelectedSource("recorded")
          }
        }}
        onVideoLinkChange={(link) => {
          setVideoLink(link)
          // If user already had a recorded video, show choice dialog
          // Otherwise, if they had recorded but no selection, show choice
          if (recordedVideoBlob && (selectedSource === "recorded" || !selectedSource)) {
            setShowChoiceDialog(true)
          } else if (link) {
            setSelectedSource("link")
          }
        }}
        onRecordingStateChange={(stream, recording) => {
          setRecordingStream(stream)
          setIsRecording(recording)
          // When starting to record, clear the selected source temporarily to show live preview
          if (recording && stream) {
            // Keep the selectedSource but the preview will show live stream due to isRecording
          }
        }}
        recordedVideoBlob={recordedVideoBlob}
        videoLink={videoLink}
      />
      <AddThumbnail 
        selectedFile={thumbnailFile}
        onFileChange={handleThumbnailUpload}
        error={thumbnailError}
        existingImageUrl={stepSixData?.thumbnailUrl ?? undefined}
        videoSource={selectedSource === "recorded" && recordedVideoBlob ? recordedVideoBlob : selectedSource === "recorded" && stepSixData?.videoUrl ? stepSixData.videoUrl : null}
      />
    </div>
  )
}
