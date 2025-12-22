"use client"

import { useState, useEffect, useRef } from "react"
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
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepSixRef = useRef(saveStepSix)
  const sessionRef = useRef(session)
  const stepSixDataRef = useRef(stepSixData)
  const videoKeyRef = useRef(videoKey)
  const thumbnailKeyRef = useRef(thumbnailKey)
  const recordedVideoBlobRef = useRef(recordedVideoBlob)
  const videoLinkRef = useRef(videoLink)
  const selectedSourceRef = useRef(selectedSource)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepSixRef.current = saveStepSix
    sessionRef.current = session
    stepSixDataRef.current = stepSixData
    videoKeyRef.current = videoKey
    thumbnailKeyRef.current = thumbnailKey
    recordedVideoBlobRef.current = recordedVideoBlob
    videoLinkRef.current = videoLink
    selectedSourceRef.current = selectedSource
  })

  // Helper function to extract key from S3 URL
  const extractKeyFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/').filter(Boolean)
      const tutorIndex = pathParts.indexOf('tutor')
      if (tutorIndex !== -1 && tutorIndex < pathParts.length - 1) {
        return pathParts.slice(tutorIndex).join('/')
      }
      return null
    } catch {
      return null
    }
  }

  // Load existing data
  useEffect(() => {
    if (stepSixData) {
      // Extract video key from existing video URL if it exists
      if (stepSixData.videoUrl) {
        const extractedKey = extractKeyFromUrl(stepSixData.videoUrl)
        if (extractedKey) {
          setVideoKey(extractedKey)
        }
        // If there's a video URL, assume it's a recorded video (not a link)
        // Set this regardless of whether key extraction succeeded
        setSelectedSource("recorded")
      }
      // Extract thumbnail key from existing thumbnail URL if it exists
      if (stepSixData.thumbnailUrl) {
        const extractedKey = extractKeyFromUrl(stepSixData.thumbnailUrl)
        if (extractedKey) {
          setThumbnailKey(extractedKey)
        }
      }
    }
  }, [stepSixData])

  // Handle video upload (when blob is recorded)
  const handleVideoUpload = async (blob: Blob) => {
    const userId = sessionRef.current?.user?.id
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

      // Step 3: Store the key in state and ref immediately
      setVideoKey(presignedResponse.key)
      videoKeyRef.current = presignedResponse.key
      setVideoUploadError(null)
    } catch (err) {
      setVideoUploadError(err instanceof Error ? err.message : "Failed to upload video")
      setVideoKey(null)
      videoKeyRef.current = null
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
      thumbnailKeyRef.current = null
      return
    }

    const userId = sessionRef.current?.user?.id
    if (!userId) {
      setThumbnailError("User ID not found in session")
      setThumbnailKey(null)
      thumbnailKeyRef.current = null
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

      // Step 3: Store the key in state and ref immediately
      console.log('Thumbnail upload successful, storing key:', presignedResponse.key)
      setThumbnailKey(presignedResponse.key)
      // Update ref immediately to ensure it's available for save function
      thumbnailKeyRef.current = presignedResponse.key
      setThumbnailError(null)
    } catch (err) {
      setThumbnailError(err instanceof Error ? err.message : "Failed to upload thumbnail")
      setThumbnailKey(null)
      thumbnailKeyRef.current = null
    } finally {
      setIsUploadingThumbnail(false)
    }
  }

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // Both video and thumbnail are optional - user can continue anytime
      return true
    }

    // Disabled save function - API call disabled for now
    const save = async () => {
      // const payload: {
      //   videoKey?: string
      //   thumbnailKey?: string | null
      // } = {}

      // // Only include videoKey if source is "recorded" and key exists
      // // If upload is still in progress, skip it (user can continue without waiting)
      // if (selectedSourceRef.current === "recorded" && videoKeyRef.current) {
      //   payload.videoKey = videoKeyRef.current
      // }
      // // If source is "link", we don't send videoKey (the link is handled separately if needed)

      // // Include thumbnailKey if it exists, otherwise send null
      // payload.thumbnailKey = thumbnailKeyRef.current || null
      
      // console.log('Saving step 6 with payload:', {
      //   videoKey: payload.videoKey,
      //   thumbnailKey: payload.thumbnailKey,
      //   thumbnailKeyRef: thumbnailKeyRef.current,
      //   thumbnailKeyState: thumbnailKey
      // })

      // await saveStepSixRef.current.mutateAsync(payload)
      
      // No-op: saving disabled
      console.log('Step 6 save disabled')
    }

    registerStepActions(6, { validate, save })
    return () => {
      unregisterStepActions(6)
    }
  }, [registerStepActions, unregisterStepActions])

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
        existingVideoUrl={stepSixData?.videoUrl}
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
        existingImageUrl={stepSixData?.thumbnailUrl}
        videoSource={selectedSource === "recorded" && recordedVideoBlob ? recordedVideoBlob : selectedSource === "recorded" && stepSixData?.videoUrl ? stepSixData.videoUrl : null}
      />
    </div>
  )
}