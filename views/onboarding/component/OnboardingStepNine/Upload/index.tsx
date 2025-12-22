"use client"

import Typography from "@/components/base/Typography"
import { Upload as UploadIcon} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import type { DocumentTypeApi } from "@/views/onboarding/types/document.types"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]

interface UploadProps {
  documentType: DocumentTypeApi
  selectedFile?: File | null
  onFileChange: (file: File | null, error: string | null) => void
  error?: string | null
  existingImageUrl?: string | null
  isUploading?: boolean
}

export default function Upload({
  documentType,
  selectedFile,
  onFileChange,
  error: externalError,
  existingImageUrl,
  isUploading = false
}: UploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const isBlobUrl = (value: unknown): value is string => typeof value === "string" && value.startsWith("blob:")
  const revokeBlobUrl = (url: string | null) => {
    if (isBlobUrl(url)) {
      URL.revokeObjectURL(url)
    }
  }

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      revokeBlobUrl(previewUrl)
    }
  }, [previewUrl])

  // Update preview when selectedFile or existingImageUrl changes
  useEffect(() => {
    if (selectedFile) {
      revokeBlobUrl(previewUrl)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else if (existingImageUrl) {
      revokeBlobUrl(previewUrl)
      setPreviewUrl(existingImageUrl)
    } else {
      revokeBlobUrl(previewUrl)
      setPreviewUrl(null)
    }
  }, [selectedFile, existingImageUrl])

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
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
      ["jpg", "jpeg", "png", "pdf"].includes(fileExtension || "")

    if (!isValidType) {
      const errorMessage = "Invalid file type. Please upload JPG, PNG, or PDF files only."
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

  const displayName = documentType === "ID_CARD" ? "ID card" : "passport"

  return (
    <div className="bg-white w-full flex flex-col items-start gap-5 pt-4 pb-5 px-4 lg:py-5 lg:px-8 lg:gap-4">
      <Typography variant={{ base: "title-2", lg: "title-1" }}>
        Upload the image of your {displayName}
      </Typography>

      <div className="w-full flex justify-center items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        
        <button 
          onClick={handleButtonClick}
          disabled={isUploading}
          className="w-[343px] h-[215px] lg:w-[420px] lg:h-[295px] flex flex-col justify-center items-center rounded-2xl p-4 gap-[10px] border border-dashed border-deep-royal-indigo-100 hover:border-deep-royal-indigo-200 transition-colors relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`${displayName} preview`}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <>
              <UploadIcon className="w-10 h-10 text-deep-royal-indigo-50" />
              <div className="flex flex-col gap-1"> 
                <Typography variant={{ base: "title-2" }} color="neutral-700">
                  {displayName.charAt(0).toUpperCase() + displayName.slice(1)} upload
                </Typography>

                <Typography variant={{ base: "body-3" }} color="neutral-400">
                  File types: JPG, PDF, PNG. Max 5 MB
                </Typography>
              </div>
            </>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
              <Typography variant="body-3" color="white">
                Uploading...
              </Typography>
            </div>
          )}
        </button>
      </div>

      {externalError && (
        <div className="w-full flex justify-center">
          <Typography variant="body-3" color="red-500">
            {externalError}
          </Typography>
        </div>
      )}
    </div>
  )
}