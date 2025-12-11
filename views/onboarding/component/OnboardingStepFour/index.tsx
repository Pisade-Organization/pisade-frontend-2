"use client"
import { useState, useEffect, useRef } from "react"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { Degree, EducationDto } from "@/services/tutor/onboarding/types"
import { useStepFour } from "@/hooks/tutors/onboarding/queries/useStepFour"
import { useSaveStepFour } from "@/hooks/tutors/onboarding/mutations/useUpdateStepFour"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { useSession } from "next-auth/react"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"

import NoHigherEducationCheckbox from "./NoHigherEducationCheckbox"
import DiplomaItem from "./DiplomaItem"
import AddAnotherDiploma from "./AddAnotherDiploma"

// Form state uses strings for year inputs, but will convert to numbers for DTO
interface EducationFormData {
  universityName: string
  degree: Degree | ""
  fieldOfStudy: string
  specialization: string
  yearStart: string
  yearEnd: string
  currentlyStudying: boolean
  fileUrl?: string
}

interface OnboardingStepFourForm {
  educations: EducationFormData[]
}

export default function OnboardingStepFour() {
  const { data: stepFourData, isLoading } = useStepFour()
  const saveStepFour = useSaveStepFour()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // When true, it means "I don't have a higher education degree" (checkbox is checked)
  // So hasDiploma = !noHigherEducationDegree
  const [noHigherEducationDegree, setNoHigherEducationDegree] = useState<boolean>(false)
  
  // File upload state for each diploma (index -> { file, key, error, isUploading })
  const [diplomaFiles, setDiplomaFiles] = useState<Record<number, {
    file: File | null
    key: string | null
    error: string | null
    isUploading: boolean
    originalFileUrl?: string | null // Store original file URL for existing diplomas
  }>>({})
  
  const { data: session } = useSession()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepFourRef = useRef(saveStepFour)
  const stepFourDataRef = useRef(stepFourData)
  const noHigherEducationDegreeRef = useRef(noHigherEducationDegree)
  const sessionRef = useRef(session)
  const diplomaFilesRef = useRef(diplomaFiles)
  
  // Helper function to extract key from S3 URL
  const extractKeyFromUrl = (url: string): string | null => {
    try {
      // Extract the key from URL pattern like: https://...amazonaws.com/tutor/userId/diplomas/key
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/').filter(Boolean)
      // Find 'tutor' and get the rest of the path
      const tutorIndex = pathParts.indexOf('tutor')
      if (tutorIndex !== -1 && tutorIndex < pathParts.length - 1) {
        return pathParts.slice(tutorIndex).join('/')
      }
      return null
    } catch {
      return null
    }
  }
  
  // Keep refs in sync
  useEffect(() => {
    saveStepFourRef.current = saveStepFour
    stepFourDataRef.current = stepFourData
    noHigherEducationDegreeRef.current = noHigherEducationDegree
    sessionRef.current = session
    diplomaFilesRef.current = diplomaFiles
  })
  
  const methods = useForm<OnboardingStepFourForm>({
    defaultValues: {
      educations: [
        {
          universityName: "",
          degree: "" as Degree | "",
          fieldOfStudy: "",
          specialization: "",
          yearStart: "",
          yearEnd: "",
          currentlyStudying: false,
          fileUrl: undefined,
        }
      ],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "educations",
  })

  // Load step four data into form when available
  useEffect(() => {
    if (stepFourData) {
      // Set hasDiploma state (inverse of noHigherEducationDegree)
      const hasDiploma = stepFourData.hasDiploma ?? true
      setNoHigherEducationDegree(!hasDiploma)
      
      // Load educations into form (GET response uses "diplomas")
      if (stepFourData.diplomas && stepFourData.diplomas.length > 0) {
        const formEducations = stepFourData.diplomas.map(edu => ({
          universityName: edu.universityName || "",
          degree: edu.degree || ("" as Degree | ""),
          fieldOfStudy: edu.fieldOfStudy || "",
          specialization: edu.specialization || "",
          yearStart: edu.yearStart?.toString() || "",
          yearEnd: edu.yearEnd?.toString() || "",
          currentlyStudying: edu.currentlyStudying || false,
          fileUrl: edu.fileUrl,
        }))
        methods.reset({
          educations: formEducations
        })
        
        // Initialize file state for existing diplomas with file URLs
        const initialFiles: Record<number, { file: File | null; key: string | null; error: string | null; isUploading: boolean; originalFileUrl?: string | null }> = {}
        stepFourData.diplomas.forEach((edu, index) => {
          if (edu.fileUrl) {
            // Try to extract the key from the URL
            const extractedKey = extractKeyFromUrl(edu.fileUrl)
            initialFiles[index] = {
              file: null,
              key: extractedKey || "existing", // Use extracted key or mark as existing
              error: null,
              isUploading: false,
              originalFileUrl: edu.fileUrl, // Store original URL
            }
          }
        })
        if (Object.keys(initialFiles).length > 0) {
          setDiplomaFiles(initialFiles)
        }
      } else {
        // If no educations, ensure at least one empty education exists
        methods.reset({
          educations: [{
            universityName: "",
            degree: "" as Degree | "",
            fieldOfStudy: "",
            specialization: "",
            yearStart: "",
            yearEnd: "",
            currentlyStudying: false,
            fileUrl: undefined,
          }]
        })
      }
    }
  }, [stepFourData, methods])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // If user checked "I don't have a higher education degree", validation passes
      if (noHigherEducationDegreeRef.current) {
        return true
      }
      
      // Otherwise, validate that at least one education is filled
      const values = methods.getValues()
      const hasValidEducation = values.educations?.some(edu => 
        edu.universityName && edu.degree && edu.yearStart
      )
      
      if (!hasValidEducation) {
        return false
      }
      
      return await methods.trigger()
    }

    const save = async () => {
      const values = methods.getValues()
      
      // Convert form data to DTO format
      const educations: EducationDto[] = values.educations
        .filter((edu) => edu.universityName && edu.degree && edu.yearStart)
        .map((edu, index) => {
          const fileData = diplomaFilesRef.current[index]
          // Use the key if it exists and is not the "existing" placeholder
          // If it's "existing", try to extract from original URL or check if diploma originally had a file
          let fileKey: string | undefined = undefined
          
          if (fileData?.key && fileData.key !== "existing") {
            fileKey = fileData.key
          } else if (fileData?.key === "existing" && fileData?.originalFileUrl) {
            // Try to extract key from original URL
            const extractedKey = extractKeyFromUrl(fileData.originalFileUrl)
            if (extractedKey) {
              fileKey = extractedKey
            }
          }
          
          return {
            universityName: edu.universityName,
            degree: edu.degree as Degree,
            fieldOfStudy: edu.fieldOfStudy || "",
            specialization: edu.specialization || "",
            yearStart: parseInt(edu.yearStart, 10),
            yearEnd: edu.yearEnd ? parseInt(edu.yearEnd, 10) : undefined,
            currentlyStudying: edu.currentlyStudying || false,
            fileUrl: edu.fileUrl,
            ...(fileKey && { diplomaFileKey: fileKey }),
          }
        })

      const payload = {
        hasDiploma: !noHigherEducationDegreeRef.current,
        educations: educations.length > 0 ? educations : undefined,
      }

      await saveStepFourRef.current.mutateAsync(payload)
    }

    registerStepActions(4, { validate, save })
    return () => {
      unregisterStepActions(4)
    }
  }, [registerStepActions, unregisterStepActions, methods])

  // Handle file upload for a specific diploma
  const handleDiplomaFileChange = async (index: number, file: File | null, error: string | null) => {
    setDiplomaFiles(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        file,
        error,
        key: error || !file ? (prev[index]?.key === "existing" ? "existing" : null) : null,
        // Preserve originalFileUrl unless we're uploading a new file
        originalFileUrl: file ? undefined : prev[index]?.originalFileUrl,
      }
    }))
    
    if (error || !file) {
      return
    }

    const userId = sessionRef.current?.user?.id
    if (!userId) {
      setDiplomaFiles(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          error: "User ID not found in session",
          file: null,
          key: prev[index]?.key === "existing" ? "existing" : null,
          originalFileUrl: prev[index]?.originalFileUrl,
        }
      }))
      return
    }

    setDiplomaFiles(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        isUploading: true,
        error: null,
      }
    }))

    try {
      // Step 1: Get presigned URL for temp folder
      const fileName = file.name
      const fileType = file.type || "image/jpeg"
      const folder = `tutor/${userId}/diplomas/temp`
      
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
      setDiplomaFiles(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          key: presignedResponse.key,
          error: null,
          isUploading: false,
          originalFileUrl: undefined, // Clear original URL when new file is uploaded
        }
      }))
    } catch (err) {
      setDiplomaFiles(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          error: err instanceof Error ? err.message : "Failed to upload file",
          key: prev[index]?.key === "existing" ? "existing" : null,
          isUploading: false,
          originalFileUrl: prev[index]?.originalFileUrl,
        }
      }))
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <FormProvider {...methods}>
      <div className="w-full flex flex-col justify-start items-center gap-1">
        <NoHigherEducationCheckbox 
          hasHigherEducationDegree={noHigherEducationDegree} 
          setHasHigherEducationDegree={setNoHigherEducationDegree} 
        />
        {!noHigherEducationDegree && (
          <>
            {fields.map((field, index) => {
              const fileData = diplomaFiles[index]
              const existingFileUrl = stepFourData?.diplomas?.[index]?.fileUrl
              
              return (
                <DiplomaItem 
                  key={field.id}
                  index={index}
                  onRemove={fields.length > 1 ? () => {
                    // Clean up file state when removing
                    setDiplomaFiles(prev => {
                      const newFiles = { ...prev }
                      delete newFiles[index]
                      // Reindex remaining files
                      const reindexed: Record<number, typeof fileData> = {}
                      Object.keys(newFiles).forEach(key => {
                        const oldIndex = parseInt(key)
                        if (oldIndex > index) {
                          reindexed[oldIndex - 1] = newFiles[oldIndex]
                        } else if (oldIndex < index) {
                          reindexed[oldIndex] = newFiles[oldIndex]
                        }
                      })
                      return reindexed
                    })
                    remove(index)
                  } : undefined}
                  selectedFile={fileData?.file || null}
                  onFileChange={(file, error) => handleDiplomaFileChange(index, file, error)}
                  fileError={fileData?.error || null}
                  existingImageUrl={existingFileUrl}
                  isUploading={fileData?.isUploading || false}
                />
              )
            })}
            <AddAnotherDiploma onAdd={() => append({
              universityName: "",
              degree: "" as Degree | "",
              fieldOfStudy: "",
              specialization: "",
              yearStart: "",
              yearEnd: "",
              currentlyStudying: false,
              fileUrl: undefined,
            })} />
          </>
        )}
      </div>
    </FormProvider>
  )
}