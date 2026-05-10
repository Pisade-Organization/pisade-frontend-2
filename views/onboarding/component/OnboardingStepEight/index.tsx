"use client"

import { useState, useEffect } from "react"
import { useStepEight } from "@/hooks/tutors/onboarding/queries/useStepEight"
import { useSaveStepEight } from "@/hooks/tutors/onboarding/mutations/useUpdateStepEight"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import SetPrice from "./SetPrice"
import Commission from "./Commission"
import WithdrawalMethodComponent from "./WithdrawalMethod"
import { WithdrawalMethod } from "../../types/withdrawalMethod.types"
import { WithdrawalMethod as ApiWithdrawalMethod } from "@/services/tutor/onboarding/types"

// Mapping functions between display and API values
const displayToApi: Record<WithdrawalMethod, ApiWithdrawalMethod> = {
  "Prompt Pay": ApiWithdrawalMethod.PROMPTPAY,
  "Bank transfer": ApiWithdrawalMethod.BANK_TRANSFER
}

const apiToDisplay: Record<ApiWithdrawalMethod, WithdrawalMethod> = {
  [ApiWithdrawalMethod.PROMPTPAY]: "Prompt Pay",
  [ApiWithdrawalMethod.BANK_TRANSFER]: "Bank transfer"
}

function normalizeStepEightPayload(payload: {
  lessonPrice?: number
  withdrawalMethod?: ApiWithdrawalMethod
  withdrawalPhoneNumber?: string
  bankName?: string
  bankAccountNumber?: string
}) {
  if (payload.withdrawalMethod === ApiWithdrawalMethod.PROMPTPAY) {
    return {
      lessonPrice: payload.lessonPrice,
      withdrawalMethod: payload.withdrawalMethod,
      withdrawalPhoneNumber: payload.withdrawalPhoneNumber || undefined,
    }
  }

  if (payload.withdrawalMethod === ApiWithdrawalMethod.BANK_TRANSFER) {
    return {
      lessonPrice: payload.lessonPrice,
      withdrawalMethod: payload.withdrawalMethod,
      bankName: payload.bankName || undefined,
      bankAccountNumber: payload.bankAccountNumber || undefined,
    }
  }

  return {
    lessonPrice: payload.lessonPrice,
    withdrawalMethod: payload.withdrawalMethod,
  }
}

export default function OnboardingStepEight() {
  const [lessonPrice, setLessonPrice] = useState<string>('')
  const [withdrawalMethod, setWithdrawalMethod] = useState<WithdrawalMethod>('Prompt Pay')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  
  const { data: stepEightData, isLoading } = useStepEight()
  const saveStepEight = useSaveStepEight()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Load existing data
  useEffect(() => {
    if (stepEightData) {
      // Set lesson price
      if (stepEightData.lessonPrice !== null && stepEightData.lessonPrice !== undefined) {
        setLessonPrice(stepEightData.lessonPrice.toString())
      }
      
      // Set withdrawal method
      if (stepEightData.withdrawalMethod) {
        const apiMethod = stepEightData.withdrawalMethod as ApiWithdrawalMethod
        const displayMethod = apiToDisplay[apiMethod as ApiWithdrawalMethod]
        if (displayMethod) {
          setWithdrawalMethod(displayMethod)
        }
      }
      
      // Set phone number
      if (stepEightData.withdrawalPhoneNumber) {
        setPhoneNumber(stepEightData.withdrawalPhoneNumber)
      }
      
      // Set bank name
      if (stepEightData.bankName) {
        setBankName(stepEightData.bankName)
      }
      
      // Set account number
      if (stepEightData.bankAccountNumber) {
        setAccountNumber(stepEightData.bankAccountNumber)
      }
    }
  }, [stepEightData])

  // Register step actions
  // Register with live closure dependencies so callbacks always use current step state.
  useEffect(() => {
    const validate = async () => {
      // Validate lesson price is provided
      if (!lessonPrice || lessonPrice.trim() === '') {
        return false
      }
      
      // Validate withdrawal method specific fields
      if (withdrawalMethod === "Prompt Pay") {
        // Phone number should be provided and valid (non-empty after removing leading 0)
        const phone = phoneNumber.trim()
        if (!phone || phone.length === 0) {
          return false
        }
      } else if (withdrawalMethod === "Bank transfer") {
        // Bank name and account number should be provided
        if (!bankName || bankName.trim() === '') {
          return false
        }
        if (!accountNumber || accountNumber.trim() === '') {
          return false
        }
      }
      
      return true
    }

    const save = async () => {
      const apiWithdrawalMethod = displayToApi[withdrawalMethod]
      
      const payload = normalizeStepEightPayload({
        lessonPrice: lessonPrice ? parseInt(lessonPrice, 10) : undefined,
        withdrawalMethod: apiWithdrawalMethod,
        withdrawalPhoneNumber: phoneNumber || undefined,
        bankName: bankName || undefined,
        bankAccountNumber: accountNumber || undefined,
      })

      const existingPayload = normalizeStepEightPayload({
        lessonPrice: stepEightData?.lessonPrice ?? undefined,
        withdrawalMethod: stepEightData?.withdrawalMethod as ApiWithdrawalMethod | undefined,
        withdrawalPhoneNumber: stepEightData?.withdrawalPhoneNumber ?? undefined,
        bankName: stepEightData?.bankName ?? undefined,
        bankAccountNumber: stepEightData?.bankAccountNumber ?? undefined,
      })

      if (JSON.stringify(payload) === JSON.stringify(existingPayload)) {
        return
      }

      await saveStepEight.mutateAsync(payload)
    }

    registerStepActions(8, { validate, save })
    return () => {
      unregisterStepActions(8)
    }
  }, [
    registerStepActions,
    unregisterStepActions,
    lessonPrice,
    withdrawalMethod,
    phoneNumber,
    bankName,
    accountNumber,
    stepEightData,
    saveStepEight,
  ])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <SetPrice 
        lessonPrice={lessonPrice}
        setLessonPrice={setLessonPrice}
      />
      <WithdrawalMethodComponent 
        withdrawalMethod={withdrawalMethod} 
        setWithdrawalMethod={setWithdrawalMethod}
        phoneNumber={phoneNumber} 
        setPhoneNumber={setPhoneNumber}
        bankName={bankName} 
        setBankName={setBankName}
        accountNumber={accountNumber} 
        setAccountNumber={setAccountNumber}
      />
      <Commission />
    </div>
  )
}
