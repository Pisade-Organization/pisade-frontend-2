"use client"
import { useState, useEffect, useRef } from "react"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { useStepOne } from "@/hooks/tutors/onboarding/queries/useStepOne"
import { useStepThree } from "@/hooks/tutors/onboarding/queries/useStepThree"
import { useSaveStepThree } from "@/hooks/tutors/onboarding/mutations/useUpdateStepThree"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { CertificationDto } from "@/services/tutor/onboarding/types"
import { useSession } from "next-auth/react"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"

import NoCertificateCheckbox from "./NoCertificateCheckbox"
import SubjectLockedField from "./SubjectLockedField"
import CertificationItem from "./CertificationItem"
import AddAnotherCertification from "./AddAnotherCertification"

// Form state uses strings for year inputs, but will convert to numbers for DTO
interface CertificationFormData {
  certificationName: string
  description: string
  issuedBy: string
  startYear: string
  endYear: string
  certificateFileKey?: string
}

interface OnboardingStepThreeForm {
  certificates: CertificationFormData[]
}

export default function OnboardingStepThree() {
  const { data: stepOneData } = useStepOne()
  const { data: stepThreeData, isLoading } = useStepThree()
  const saveStepThree = useSaveStepThree()
  const { registerStepActions, unregisterStepActions, setCanContinue } = useOnboardingNavigation()
  const { data: session } = useSession()
  
  const subjectName = stepOneData?.subject || stepThreeData?.subject || null
  
  // When true, it means "I don't have a teaching certificate" (checkbox is checked)
  // So hasTeachingCertificate = !noTeachingCertificate
  const [noTeachingCertificate, setNoTeachingCertificate] = useState<boolean>(false)
  
  // File upload state for each certificate (index -> { file, key, error, isUploading })
  const [certificateFiles, setCertificateFiles] = useState<Record<number, {
    file: File | null
    key: string | null
    error: string | null
    isUploading: boolean
    originalFileUrl?: string | null // Store original file URL for existing certificates
  }>>({})
  
  // Use refs to access latest values without including them in dependencies
  const saveStepThreeRef = useRef(saveStepThree)
  const stepThreeDataRef = useRef(stepThreeData)
  const noTeachingCertificateRef = useRef(noTeachingCertificate)
  const sessionRef = useRef(session)
  const certificateFilesRef = useRef(certificateFiles)
  
  // Helper function to extract key from S3 URL
  const extractKeyFromUrl = (url: string): string | null => {
    try {
      // Extract the key from URL pattern like: https://...amazonaws.com/tutor/userId/certificates/key
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/').filter(Boolean)
      // Skip 'tutor' and find the rest of the path
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
    saveStepThreeRef.current = saveStepThree
    stepThreeDataRef.current = stepThreeData
    noTeachingCertificateRef.current = noTeachingCertificate
    sessionRef.current = session
    certificateFilesRef.current = certificateFiles
  })
  
  // Update canContinue based on subjectName
  useEffect(() => {
    setCanContinue(subjectName !== null)
  }, [subjectName, setCanContinue])
  
  const methods = useForm<OnboardingStepThreeForm>({
    defaultValues: {
      certificates: [
        {
          certificationName: "",
          description: "",
          issuedBy: "",
          startYear: "",
          endYear: "",
        }
      ],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "certificates",
  })

  // Load step three data into form when available
  useEffect(() => {
    if (stepThreeData) {
      // Set hasTeachingCertificate state (inverse of noTeachingCertificate)
      const hasTeachingCert = stepThreeData.hasTeachingCertificate ?? true
      setNoTeachingCertificate(!hasTeachingCert)
      
      // Load certificates into form
      if (stepThreeData.certifications && stepThreeData.certifications.length > 0) {
        const formCertificates = stepThreeData.certifications.map((cert) => ({
          certificationName: cert.certificationName || "",
          description: cert.description || "",
          issuedBy: cert.issuedBy || "",
          startYear: cert.startYear?.toString() || "",
          endYear: cert.endYear?.toString() || "",
          certificateFileKey: cert.certificateFileUrl ? "existing" : undefined, // Mark existing files
        }))
        
        // Reset form with loaded data - this will update all form fields and trigger re-render
        methods.reset({
          certificates: formCertificates
        }, {
          keepDefaultValues: false,
          keepDirty: false,
          keepErrors: false,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false
        })
        
        // Initialize file state for existing certificates with file URLs
        const initialFiles: Record<number, { file: File | null; key: string | null; error: string | null; isUploading: boolean; originalFileUrl?: string | null }> = {}
        stepThreeData.certifications.forEach((cert, index) => {
          if (cert.certificateFileUrl) {
            // Try to extract the key from the URL
            const extractedKey = extractKeyFromUrl(cert.certificateFileUrl)
            initialFiles[index] = {
              file: null,
              key: extractedKey || "existing", // Use extracted key or mark as existing
              error: null,
              isUploading: false,
              originalFileUrl: cert.certificateFileUrl, // Store original URL
            }
          }
        })
        if (Object.keys(initialFiles).length > 0) {
          setCertificateFiles(initialFiles)
        }
      } else {
        // If no certificates, ensure at least one empty certificate exists
        const currentValues = methods.getValues()
        if (!currentValues.certificates || currentValues.certificates.length === 0) {
          methods.reset({
            certificates: [{
              certificationName: "",
              description: "",
              issuedBy: "",
              startYear: "",
              endYear: "",
            }]
          }, {
            keepDefaultValues: false
          })
        }
      }
    }
  }, [stepThreeData, methods])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // If user checked "I don't have a teaching certificate", validation passes
      if (noTeachingCertificateRef.current) {
        return true
      }
      
      // Otherwise, validate that at least one certificate is filled
      const values = methods.getValues()
      const hasValidCertificate = values.certificates?.some(cert => 
        cert.certificationName && cert.issuedBy && cert.startYear
      )
      
      if (!hasValidCertificate) {
        return false
      }
      
      return await methods.trigger()
    }

    const save = async () => {
      const values = methods.getValues()
      
      // Convert form data to DTO format
      const certificates: CertificationDto[] = values.certificates
        .map((cert, index) => {
          // Skip empty certificates
          if (!cert.certificationName || !cert.issuedBy || !cert.startYear) {
            return null
          }
          
          const fileData = certificateFilesRef.current[index]
          // Use the key if it exists and is not the "existing" placeholder
          // If it's "existing", try to extract from original URL or check if certificate originally had a file
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
          
          const dto: CertificationDto = {
            certificationName: cert.certificationName,
            description: cert.description || "",
            issuedBy: cert.issuedBy,
            startYear: parseInt(cert.startYear, 10),
            endYear: cert.endYear ? parseInt(cert.endYear, 10) : parseInt(cert.startYear, 10),
          }
          
          if (fileKey) {
            dto.certificateFileKey = fileKey
          }
          
          return dto
        })
        .filter((cert): cert is CertificationDto => cert !== null)

      const payload = {
        hasTeachingCertificate: !noTeachingCertificateRef.current,
        certifications: certificates.length > 0 ? certificates : undefined,
      }

      await saveStepThreeRef.current.mutateAsync(payload)
    }

    registerStepActions(3, { validate, save })
    return () => {
      unregisterStepActions(3)
    }
  }, [registerStepActions, unregisterStepActions, methods])

  // Handle save for a specific certificate
  const handleSaveCertification = async (index: number) => {
    const values = methods.getValues()
    const allCertificates = values.certificates
    
    // Validate the certificate at this index
    const certificate = allCertificates[index]
    if (!certificate.certificationName || !certificate.issuedBy || !certificate.startYear) {
      throw new Error("Please fill in all required fields")
    }
    
    // Get file key for this certificate
    const fileData = certificateFilesRef.current[index]
    const fileKey = fileData?.key && fileData.key !== "existing" ? fileData.key : undefined
    
    // Convert all certificates to DTO format
    const certificatesDto: CertificationDto[] = allCertificates
      .map((cert, idx) => {
        // Skip empty certificates
        if (!cert.certificationName || !cert.issuedBy || !cert.startYear) {
          return null
        }
        
        const certFileData = certificateFilesRef.current[idx]
        // Use the key if it exists and is not the "existing" placeholder
        let certFileKey: string | undefined = undefined
        
        if (certFileData?.key && certFileData.key !== "existing") {
          certFileKey = certFileData.key
        } else if (certFileData?.key === "existing" && certFileData?.originalFileUrl) {
          // Try to extract key from original URL
          const extractedKey = extractKeyFromUrl(certFileData.originalFileUrl)
          if (extractedKey) {
            certFileKey = extractedKey
          }
        }
        
        const dto: CertificationDto = {
          certificationName: cert.certificationName,
          description: cert.description || "",
          issuedBy: cert.issuedBy,
          startYear: parseInt(cert.startYear, 10),
          endYear: cert.endYear ? parseInt(cert.endYear, 10) : parseInt(cert.startYear, 10),
        }
        
        if (certFileKey) {
          dto.certificateFileKey = certFileKey
        }
        
        return dto
      })
      .filter((cert): cert is CertificationDto => cert !== null)
    
    // Save with all certificates
    const payload = {
      hasTeachingCertificate: !noTeachingCertificateRef.current,
      certifications: certificatesDto.length > 0 ? certificatesDto : undefined,
    }
    
    await saveStepThreeRef.current.mutateAsync(payload)
  }

  // Handle file upload for a specific certificate
  const handleCertificateFileChange = async (index: number, file: File | null, error: string | null) => {
    setCertificateFiles(prev => ({
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
      setCertificateFiles(prev => ({
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

    setCertificateFiles(prev => ({
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
      const folder = `tutor/${userId}/certificates/temp`
      
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
      setCertificateFiles(prev => ({
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
      setCertificateFiles(prev => ({
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
        <NoCertificateCheckbox 
          hasTeachingCertificate={noTeachingCertificate} 
          setHasTeachingCertificate={setNoTeachingCertificate} 
        />
        <SubjectLockedField subjectName={subjectName} />
        
        {!noTeachingCertificate && subjectName !== null && (
          <>
            {fields.map((field, index) => {
              const fileData = certificateFiles[index]
              const existingFileUrl = stepThreeData?.certifications?.[index]?.certificateFileUrl
              
              return (
                <CertificationItem 
                  key={field.id}
                  index={index}
                  onRemove={fields.length > 1 ? () => {
                    // Clean up file state when removing
                    setCertificateFiles(prev => {
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
                  onFileChange={(file, error) => handleCertificateFileChange(index, file, error)}
                  fileError={fileData?.error || null}
                  existingImageUrl={existingFileUrl}
                  isUploading={fileData?.isUploading || false}
                />
              )
            })}
            <AddAnotherCertification onAdd={() => append({
              certificationName: "",
              description: "",
              issuedBy: "",
              startYear: "",
              endYear: "",
            })} />
          </>
        )}
      </div>
    </FormProvider>
  )
}