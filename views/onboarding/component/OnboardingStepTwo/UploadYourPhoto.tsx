"use client"

import Typography from "@/components/base/Typography"
import { ImagePlus } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"]

interface UploadYourPhotoProps {
  selectedFile?: File | null
  onFileChange: (file: File | null, error: string | null) => void
  error?: string | null
  existingImageUrl?: string
}

export default function UploadYourPhoto({ selectedFile, onFileChange, error: externalError, existingImageUrl }: UploadYourPhotoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Clean up preview URL when component unmounts (only blob URLs need cleanup)
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Update preview when selectedFile changes (new file takes precedence)
  useEffect(() => {
    if (selectedFile) {
      // Clean up previous preview URL (only if it was a blob URL)
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
      // Create preview URL for new file
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else if (existingImageUrl) {
      // If no new file selected, show existing image
      // Clean up blob URL if it exists
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
      setPreviewUrl(existingImageUrl)
    } else {
      // Clean up preview URL if no file and no existing image
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
      setPreviewUrl(null)
    }
  }, [selectedFile, existingImageUrl])

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      onFileChange(null, null)
      return
    }

    // Validate file type
    const fileType = file.type.toLowerCase()
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const isValidType = 
      ALLOWED_FILE_TYPES.includes(fileType) || 
      ["jpg", "jpeg", "png", "heic", "heif"].includes(fileExtension || "")

    if (!isValidType) {
      const errorMessage = "Invalid file type. Please upload JPG, HEIC, or PNG files only."
      onFileChange(null, errorMessage)
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const errorMessage = "File size exceeds 5MB. Please upload a smaller file."
      onFileChange(null, errorMessage)
      return
    }

    // File is valid
    onFileChange(file, null)
  }

  return (
    <div className="flex flex-col lg:flex-row justify-start items-center py-2 lg:py-0 gap-5 lg:gap-8">
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleButtonClick}
        className="w-32 h-32 rounded-full border border-deep-royal-indigo-100  border-dashed flex justify-center items-center hover:border-deep-royal-indigo-200 transition-colors overflow-hidden relative"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile photo preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <ImagePlus size={40} className="text-deep-royal-indigo-50" />
        )}
      </button>

      <div className="flex flex-col justify-center items-start gap-[2px]">
        <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-700">Upload your Photo</Typography>
        <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-400">File types: JPG, HEIC, PNG. Max 5 MB</Typography>
        {externalError && (
          <Typography variant={{ base: "body-4", lg: "body-3" }} color="red-500" className="mt-1">
            {externalError}
          </Typography>
        )}
      </div>
    </div>
  )
}