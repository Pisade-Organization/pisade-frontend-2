"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useStepNine } from "@/hooks/tutors/onboarding/queries/useStepNine"
import { useSaveStepNine } from "@/hooks/tutors/onboarding/mutations/useUpdateStepNine"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"
import { DocumentType } from "../../types/document.types"
import type { DocumentTypeApi } from "../../types/document.types"
import { DocumentType as ApiDocumentType } from "@/services/tutor/onboarding/types"
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
  
  const { data: session } = useSession()
  const { data: stepNineData, isLoading } = useStepNine()
  const saveStepNine = useSaveStepNine()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepNineRef = useRef(saveStepNine)
  const sessionRef = useRef(session)
  const documentTypeRef = useRef(documentType)
  const idCardKeyRef = useRef(idCardKey)
  const passportKeyRef = useRef(passportKey)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepNineRef.current = saveStepNine
    sessionRef.current = session
    documentTypeRef.current = documentType
    idCardKeyRef.current = idCardKey
    passportKeyRef.current = passportKey
  })

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
      idCardKeyRef.current = null
      return
    }

    const userId = sessionRef.current?.user?.id
    if (!userId) {
      setIdCardError("User ID not found in session")
      setIdCardKey(null)
      idCardKeyRef.current = null
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
      idCardKeyRef.current = presignedResponse.key
      setIdCardError(null)
    } catch (err) {
      setIdCardError(err instanceof Error ? err.message : "Failed to upload ID card")
      setIdCardKey(null)
      idCardKeyRef.current = null
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
      passportKeyRef.current = null
      return
    }

    const userId = sessionRef.current?.user?.id
    if (!userId) {
      setPassportError("User ID not found in session")
      setPassportKey(null)
      passportKeyRef.current = null
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
      passportKeyRef.current = presignedResponse.key
      setPassportError(null)
    } catch (err) {
      setPassportError(err instanceof Error ? err.message : "Failed to upload passport")
      setPassportKey(null)
      passportKeyRef.current = null
    } finally {
      setIsUploadingPassport(false)
    }
  }

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // Check if document type is selected
      if (!documentTypeRef.current) {
        return false
      }
      
      // Check if the selected document type has a file uploaded
      if (documentTypeRef.current === "ID Card") {
        if (!idCardKeyRef.current) {
          return false
        }
      } else if (documentTypeRef.current === "Passport") {
        if (!passportKeyRef.current) {
          return false
        }
      }
      
      return true
    }

    const save = async () => {
      const apiDocumentType = displayToApi[documentTypeRef.current] as ApiDocumentType
      
      const payload: any = {
        documentType: apiDocumentType,
      }
      
      // Add document keys based on what's uploaded
      if (idCardKeyRef.current) {
        payload.idCardKey = idCardKeyRef.current
      }
      if (passportKeyRef.current) {
        payload.passportKey = passportKeyRef.current
      }

      await saveStepNineRef.current.mutateAsync(payload)
    }

    registerStepActions(9, { validate, save })
    return () => {
      unregisterStepActions(9)
    }
  }, [registerStepActions, unregisterStepActions])

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
      <Tips />
    </div>
  )
}