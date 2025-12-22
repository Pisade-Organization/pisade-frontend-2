"use client"

import Typography from "@/components/base/Typography"
import ThumbnailGuidelines from "./ThumbnailGuidelines"
import ThumbnailUpload from "./ThumbnailUpload"
import Caution from "./Caution"

interface AddThumbnailProps {
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  error?: string | null
  existingImageUrl?: string
  videoSource?: Blob | string | null
}

export default function AddThumbnail({ 
  selectedFile, 
  onFileChange, 
  error, 
  existingImageUrl,
  videoSource
}: AddThumbnailProps) {
  return (
    <div className="bg-white w-full flex flex-col gap-5 rounded-b-[20px] pt-4 pb-5 px-5 ">
      <Typography variant={{ base: "title-2", lg: "title-1"}} color="neutral-800">
        Add a thumbnail (optional)
      </Typography>
      
      <div className="hidden lg:block w-screen relative -left-4 lg:-left-8 border-t border-electric-violet-50"/>
      
      <ThumbnailGuidelines />
      <ThumbnailUpload 
        selectedFile={selectedFile}
        onFileChange={onFileChange}
        error={error}
        existingImageUrl={existingImageUrl}
        videoSource={videoSource}
      />
      <Caution />
    </div>
  )
}