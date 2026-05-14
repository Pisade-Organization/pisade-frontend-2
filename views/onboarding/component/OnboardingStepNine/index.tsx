"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useStepNine } from "@/hooks/tutors/onboarding/queries/useStepNine"
import { useSaveStepNine } from "@/hooks/tutors/onboarding/mutations/useUpdateStepNine"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"
import { TutorService } from "@/services/tutor/private"
import { DocumentType } from "../../types/document.types"
import type { DocumentTypeApi } from "../../types/document.types"
import { DocumentType as ApiDocumentType } from "@/services/tutor/onboarding/types"
import Typography from "@/components/base/Typography"
import WhyDoWeNeed from "./WhyDoWeNeed"
import SelectDocumentType from "./SelectDocumentType"
import Upload from "./Upload"
import Tips from "./Tips"

// Mapping functions between display and API values
const displayToApi: Record<DocumentType, DocumentTypeApi> = {
  "ID Card": "ID_CARD",
  "Passport": "PASSPORT"
}

const apiToDisplay: Record<DocumentTypeApi, DocumentType> = {
  "ID_CARD": "ID Card",
  "PASSPORT": "Passport"
}

const DEFAULT_DOCUMENT_TYPE: DocumentType = "ID Card"

type SubmitMissingStep = {
  step: number
  fields: string[]
}

function getSubmitErrorMessage(error: unknown): string {
  const responseError = (error as any)?.response?.data?.error
  const details = responseError?.details

  if (details?.code === "ONBOARDING_INCOMPLETE" && Array.isArray(details?.missingSteps)) {
    const missing = details.missingSteps as SubmitMissingStep[]
    const missingText = missing
      .map((step) => `Step ${step.step}: ${step.fields.join(", ")}`)
      .join(" | ")

    return `Please complete required fields before submitting. ${missingText}`
  }

  if (typeof responseError?.message === "string" && responseError.message.trim()) {
    return responseError.message
  }

  return "Failed to submit onboarding. Please try again."
}

export default function OnboardingStepNine() {
  const [documentType, setDocumentType] = useState<DocumentType>(DEFAULT_DOCUMENT_TYPE)
  const [idCardFile, setIdCardFile] = useState<File | null>(null)
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [idCardError, setIdCardError] = useState<string | null>(null)
  const [passportError, setPassportError] = useState<string | null>(null)
  const [idCardKey, setIdCardKey] = useState<string | null>(null)
  const [passportKey, setPassportKey] = useState<string | null>(null)
  const [isUploadingIdCard, setIsUploadingIdCard] = useState(false)
  const [isUploadingPassport, setIsUploadingPassport] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const { data: session, update } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")?.[1]
  const safeLocale = locale === "en" || locale === "th" ? locale : "en"
  const { data: stepNineData, isLoading } = useStepNine()
  const saveStepNine = useSaveStepNine()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Load existing data
  useEffect(() => {
    if (stepNineData) {
      // Set document type
      if (stepNineData.documentType) {
        const apiType = stepNineData.documentType as DocumentTypeApi
        const displayType = apiToDisplay[apiType]
        if (displayType) {
          setDocumentType(displayType)
        }
      }
    }
  }, [stepNineData])

  // Handle ID card file upload
  const handleIdCardFileChange = async (file: File | null, error: string | null) => {
    setIdCardFile(file)
    setIdCardError(error)
    
    if (error || !file) {
      setIdCardKey(null)
      return
    }

    const userId = session?.user?.id
    if (!userId) {
      setIdCardError("User ID not found in session")
      setIdCardKey(null)
      return
    }

    setIsUploadingIdCard(true)
    setIdCardError(null)

    try {
      const fileName = file.name
      const fileType = file.type || "image/jpeg"
      const folder = `tutor/${userId}/documents/idCard/temp`
      
      const presignedResponse = await getPresignedUrl(fileName, fileType, folder)
      
      if (!presignedResponse) {
        throw new Error("Failed to get presigned URL")
      }

      const uploadSuccess = await uploadFileToPresignedUrl(
        presignedResponse.uploadUrl,
        file
      )

      if (!uploadSuccess) {
        throw new Error("Failed to upload ID card")
      }

      setIdCardKey(presignedResponse.key)
      setIdCardError(null)
    } catch (err) {
      setIdCardError(err instanceof Error ? err.message : "Failed to upload ID card")
      setIdCardKey(null)
    } finally {
      setIsUploadingIdCard(false)
    }
  }

  // Handle passport file upload
  const handlePassportFileChange = async (file: File | null, error: string | null) => {
    setPassportFile(file)
    setPassportError(error)
    
    if (error || !file) {
      setPassportKey(null)
      return
    }

    const userId = session?.user?.id
    if (!userId) {
      setPassportError("User ID not found in session")
      setPassportKey(null)
      return
    }

    setIsUploadingPassport(true)
    setPassportError(null)

    try {
      const fileName = file.name
      const fileType = file.type || "image/jpeg"
      const folder = `tutor/${userId}/documents/passport/temp`
      
      const presignedResponse = await getPresignedUrl(fileName, fileType, folder)
      
      if (!presignedResponse) {
        throw new Error("Failed to get presigned URL")
      }

      const uploadSuccess = await uploadFileToPresignedUrl(
        presignedResponse.uploadUrl,
        file
      )

      if (!uploadSuccess) {
        throw new Error("Failed to upload passport")
      }

      setPassportKey(presignedResponse.key)
      setPassportError(null)
    } catch (err) {
      setPassportError(err instanceof Error ? err.message : "Failed to upload passport")
      setPassportKey(null)
    } finally {
      setIsUploadingPassport(false)
    }
  }

  // Register step actions
  // Register with live closure dependencies to avoid stale refs.
  useEffect(() => {
    const validate = async () => {
      setSubmitError(null)

      // Check if document type is selected
      if (!documentType) {
        return false
      }

      const hasIdCardDocument = Boolean(idCardKey || stepNineData?.idCardUrl)
      const hasPassportDocument = Boolean(passportKey || stepNineData?.passportUrl)
      
      // Check if the selected document type has a file uploaded
      if (documentType === "ID Card") {
        if (!hasIdCardDocument) {
          return false
        }
      } else if (documentType === "Passport") {
        if (!hasPassportDocument) {
          return false
        }
      }
      
      return true
    }

    const save = async () => {
      const apiDocumentType = displayToApi[documentType] as ApiDocumentType
      
      const payload: any = {
        documentType: apiDocumentType,
      }
      
      // Add document keys based on what's uploaded
      if (idCardKey) {
        payload.idCardKey = idCardKey
      }
      if (passportKey) {
        payload.passportKey = passportKey
      }

      const existingDocumentType = stepNineData?.documentType as DocumentTypeApi | undefined
      const hasNewDocumentUpload = Boolean(idCardKey || passportKey)

      if (!hasNewDocumentUpload && existingDocumentType === apiDocumentType) {
        return
      }

      await saveStepNine.mutateAsync(payload)
    }

    const submit = async () => {
      await save()
      setSubmitError(null)

      try {
        await TutorService.submitOnboarding()
        await update({
          user: {
            onboardingStatus: "REVIEWING",
          },
        } as any)
        router.replace(`/${safeLocale}/tutor/onboarding/success`)
      } catch (error) {
        const message = getSubmitErrorMessage(error)
        setSubmitError(message)
        throw error
      }
    }

    registerStepActions(9, { validate, save, submit })
    return () => {
      unregisterStepActions(9)
    }
  }, [
    registerStepActions,
    unregisterStepActions,
    router,
    safeLocale,
    update,
    documentType,
    idCardKey,
    passportKey,
    stepNineData,
    saveStepNine,
  ])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <WhyDoWeNeed />
      <SelectDocumentType 
        documentType={documentType}
        setDocumentType={setDocumentType}
      />
      <Upload 
        documentType={documentType === "ID Card" ? "ID_CARD" : "PASSPORT"}
        selectedFile={documentType === "ID Card" ? idCardFile : passportFile}
        onFileChange={documentType === "ID Card" ? handleIdCardFileChange : handlePassportFileChange}
        error={documentType === "ID Card" ? idCardError : passportError}
        existingImageUrl={documentType === "ID Card" ? stepNineData?.idCardUrl : stepNineData?.passportUrl}
        isUploading={documentType === "ID Card" ? isUploadingIdCard : isUploadingPassport}
      />
      {submitError ? (
        <Typography variant="body-3" color="red-normal">
          {submitError}
        </Typography>
      ) : null}
      <Tips />
    </div>
  )
}
