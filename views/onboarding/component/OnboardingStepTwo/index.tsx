"use client"

import { useEffect, useState, useRef } from "react"
import { useSession } from "next-auth/react"
import PhotoGuidelines from "./PhotoGuidelines"
import UploadYourPhoto from "./UploadYourPhoto"
import PhotoExamples from "./PhotoExamples"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { useSaveStepTwo } from "@/hooks/tutors/onboarding/mutations/useUpdateStepTwo"
import { useStepTwo } from "@/hooks/tutors/onboarding/queries/useStepTwo"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"

export default function OnboardingStepTwo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [currentKey, setCurrentKey] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { data: session } = useSession()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  const saveStepTwo = useSaveStepTwo()
  const { data: stepTwoData, isLoading } = useStepTwo()
  
  // Use refs to access latest values without including them in dependencies
  const selectedFileRef = useRef<File | null>(null)
  const sessionRef = useRef(session)
  const saveStepTwoRef = useRef(saveStepTwo)
  const stepTwoDataRef = useRef(stepTwoData)
  const currentKeyRef = useRef<string | null>(null)
  
  // Keep refs in sync
  useEffect(() => {
    selectedFileRef.current = selectedFile
    sessionRef.current = session
    saveStepTwoRef.current = saveStepTwo
    stepTwoDataRef.current = stepTwoData
    currentKeyRef.current = currentKey
  })

  useEffect(() => {
    const validate = async () => {
      // Pass validation if there's either a new file uploaded (with key) or an existing image
      if (!currentKeyRef.current && !stepTwoDataRef.current) {
        setFileError("Please upload a photo before continuing")
        return false
      }
      setFileError(null)
      return true
    }

    const save = async () => {
      const key = currentKeyRef.current
      
      // If no new file is uploaded but there's an existing image, skip save
      if (!key) {
        // If there's an existing image, validation already passed, so we can skip
        if (stepTwoDataRef.current) {
          return
        }
        throw new Error("No file uploaded")
      }

      // Save the key using useSaveStepTwo (this will move from temp to final location)
      await saveStepTwoRef.current.mutateAsync({ key })
    }

    registerStepActions(2, { validate, save })
    return () => {
      unregisterStepActions(2)
    }
  }, [registerStepActions, unregisterStepActions])

  const handleFileChange = async (file: File | null, error: string | null) => {
    setSelectedFile(file)
    setFileError(error)
    
    // If there's an error or no file, clear the current key
    if (error || !file) {
      setCurrentKey(null)
      return
    }

    // Upload immediately when file is selected
    const userId = sessionRef.current?.user?.id
    if (!userId) {
      setFileError("User ID not found in session")
      return
    }

    setIsUploading(true)
    try {
      // Step 1: Get presigned URL for temp folder
      const fileName = file.name
      const fileType = file.type || "image/jpeg"
      const folder = `tutor/${userId}/avatar/temp`
      
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
        throw new Error("Failed to upload file")
      }

      // Step 3: Store the key in state
      setCurrentKey(presignedResponse.key)
      setFileError(null)
    } catch (err) {
      setFileError(err instanceof Error ? err.message : "Failed to upload file")
      setCurrentKey(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-[15px] w-full flex flex-col justify-center items-center lg:items-start gap-4 py-4 px-5 lg:py-0 lg:pt-8 lg:pb-12 lg:px-8 lg:gap-8">
      <UploadYourPhoto 
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        error={fileError}
        existingImageUrl={stepTwoData?.avatarUrl}
      />

      <div className="w-full flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-6 ">
        <PhotoGuidelines />
        <PhotoExamples />
      </div>
    </div>
  )
}