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
  const { data: session } = useSession()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  const saveStepTwo = useSaveStepTwo()
  const { data: stepTwoData, isLoading } = useStepTwo()
  
  // Use refs to access latest values without including them in dependencies
  const selectedFileRef = useRef<File | null>(null)
  const sessionRef = useRef(session)
  const saveStepTwoRef = useRef(saveStepTwo)
  const stepTwoDataRef = useRef(stepTwoData)
  
  // Keep refs in sync
  useEffect(() => {
    selectedFileRef.current = selectedFile
    sessionRef.current = session
    saveStepTwoRef.current = saveStepTwo
    stepTwoDataRef.current = stepTwoData
  })

  useEffect(() => {
    const validate = async () => {
      // Pass validation if there's either a new file selected or an existing image
      if (!selectedFileRef.current && !stepTwoDataRef.current) {
        setFileError("Please upload a photo before continuing")
        return false
      }
      setFileError(null)
      return true
    }

    const save = async () => {
      const currentFile = selectedFileRef.current
      
      // If no new file is selected but there's an existing image, skip save
      if (!currentFile) {
        // If there's an existing image, validation already passed, so we can skip
        if (stepTwoDataRef.current) {
          return
        }
        throw new Error("No file selected")
      }

      const userId = sessionRef.current?.user?.id
      if (!userId) {
        throw new Error("User ID not found in session")
      }

      // Step 1: Get presigned URL
      const fileName = currentFile.name
      const fileType = currentFile.type || "image/jpeg"
      const folder = `tutor/${userId}/avatar`
      
      const presignedResponse = await getPresignedUrl(fileName, fileType, folder)
      
      if (!presignedResponse) {
        throw new Error("Failed to get presigned URL")
      }

      // Step 2: Upload file to presigned URL
      const uploadSuccess = await uploadFileToPresignedUrl(
        presignedResponse.uploadUrl,
        currentFile
      )

      if (!uploadSuccess) {
        throw new Error("Failed to upload file")
      }

      // Step 3: Save the key using useSaveStepTwo
      await saveStepTwoRef.current.mutateAsync({ key: presignedResponse.key })
    }

    registerStepActions(2, { validate, save })
    return () => {
      unregisterStepActions(2)
    }
  }, [registerStepActions, unregisterStepActions])

  const handleFileChange = (file: File | null, error: string | null) => {
    setSelectedFile(file)
    setFileError(error)
  }

  return (
    <div className="bg-white rounded-[15px] w-full flex flex-col justify-center items-center lg:items-start gap-4 py-4 px-5 lg:py-0 lg:pt-8 lg:pb-12 lg:px-8 lg:gap-8">
      <UploadYourPhoto 
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        error={fileError}
        existingImageUrl={stepTwoData}
      />

      <div className="w-full flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-6 ">
        <PhotoGuidelines />
        <PhotoExamples />
      </div>
    </div>
  )
}